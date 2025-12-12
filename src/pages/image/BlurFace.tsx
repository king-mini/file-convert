
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FeatureHighlights from '../../components/FeatureHighlights';
import ToolBreadcrumb from '../../components/ToolBreadcrumb';
import { blurFace, formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import './BackgroundBlur.css'; // Re-use styles

const BlurFace = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [blurAmount, setBlurAmount] = useState(7);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (!modalImage) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setModalImage(null);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                if (result) {
                    setModalIndex(prev => prev === 0 ? 1 : 0);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalImage, result]);

    const handleFile = useCallback((selectedFile: File) => {
        if (!selectedFile.type.startsWith('image/')) {
            setError(t('common.validation.imageOnly'));
            return;
        }

        if (selectedFile.size > 25 * 1024 * 1024) {
            setError(t('common.validation.maxImageSize', { limit: 25 }));
            return;
        }

        setError(null);
        setFile(selectedFile);
        setResult(null);

        const url = URL.createObjectURL(selectedFile);
        setPreview(url);
    }, [t]);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) handleFile(droppedFile);
        },
        [handleFile]
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) handleFile(selectedFile);
        },
        [handleFile]
    );

    const handleProcess = useCallback(async () => {
        if (!file) return;

        setProcessing(true);
        setProgress(0);
        setError(null);

        try {
            const blob = await blurFace(file, blurAmount, setProgress);
            const url = URL.createObjectURL(blob);
            setResult(url);
            setResultBlob(blob);
            setCopied(false);
        } catch (err) {
            console.error('Processing error:', err);
            const errorMessage = err instanceof Error
                ? `[DEBUG] ${err.name}: ${err.message}`
                : `[DEBUG] Unknown error: ${String(err)}`;
            setError(errorMessage);
        } finally {
            setProcessing(false);
        }
    }, [file, blurAmount]);

    const handleDownload = useCallback(() => {
        if (!result || !file) return;
        const link = document.createElement('a');
        link.href = result;
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        link.download = `${baseName}_blur_face.jpg`;
        link.click();
    }, [result, file]);

    const handleNewImage = useCallback(() => {
        if (preview) URL.revokeObjectURL(preview);
        if (result) URL.revokeObjectURL(result);
        setFile(null);
        setPreview(null);
        setResult(null);
        setResultBlob(null);
        setProgress(0);
        setError(null);
        setCopied(false);
    }, [preview, result]);

    const handleCopyToClipboard = useCallback(async () => {
        if (!resultBlob) return;
        try {
            await copyImageToClipboard(resultBlob);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setError(t('common.errors.clipboard'));
        }
    }, [resultBlob, t]);

    const handleReapply = useCallback(async () => {
        if (!file) return;
        if (result) URL.revokeObjectURL(result);
        setResult(null);
        await handleProcess();
    }, [file, result, handleProcess]);

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Blur Face Tool",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": t('pages.image.blurFace.hero.description')
    };

    return (
        <div className="background-blur">
            <script type="application/ld+json">
                {JSON.stringify(schemaMarkup)}
            </script>
            <ToolBreadcrumb
                // Temporary label, ideally add to breadcrumbs
                currentLabel="Blur Face"
                guidePath="/guide/blur-background"
            />

            <div className="page-header">
                <h1>{t('pages.image.blurFace.hero.title')}</h1>
                <p>{t('pages.image.blurFace.hero.description')}</p>
            </div>

            {!file && (
                <div
                    className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="upload-content">
                        <div className="upload-icon">🖼️</div>
                        <p>{t('pages.image.blurFace.upload.hint')}</p>
                        <span className="upload-hint">{t('pages.image.blurFace.upload.support')}</span>
                    </label>
                </div>
            )}

            {error && (
                <div className="error-message" role="alert">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {file && (
                <div className="editor">
                    <div className="image-compare">
                        <div className="image-panel">
                            <h3>{t('pages.image.blurFace.panels.original')}</h3>
                            <div
                                className="image-container clickable"
                                onClick={() => {
                                    if (preview) {
                                        setModalIndex(0);
                                        setModalImage(preview);
                                    }
                                }}
                                title={t('common.hints.viewLarge')}
                            >
                                {preview && <img src={preview} alt="Original" />}
                                <button
                                    className="image-remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNewImage();
                                    }}
                                    title={t('common.hints.chooseAnother')}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="image-panel">
                            <h3>{t('pages.image.blurFace.panels.result')}</h3>
                            <div
                                className={`image-container ${result ? 'clickable' : ''}`}
                                onClick={() => {
                                    if (result) {
                                        setModalIndex(1);
                                        setModalImage(result);
                                    }
                                }}
                                title={result ? t('common.hints.viewLarge') : undefined}
                            >
                                {result ? (
                                    <img src={result} alt="Result" />
                                ) : (
                                    <div className="placeholder">
                                        {processing
                                            ? t('common.status.processing')
                                            : t('pages.image.blurFace.placeholders.result')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="options">
                        <div className="option-group">
                            <label>{t('pages.image.blurFace.options.blurStrength')} ({blurAmount})</label>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="0.1"
                                value={blurAmount}
                                onChange={(e) => setBlurAmount(Number(e.target.value))}
                                disabled={processing}
                            />
                            <div className="range-labels">
                                <span>{t('pages.image.blurFace.options.rangeSoft')}</span>
                                <span>{t('pages.image.blurFace.options.rangeStrong')}</span>
                            </div>
                        </div>

                        <div className="file-info">
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                    </div>

                    {processing && (
                        <div className="progress" aria-live="polite">
                            <p>{t('pages.image.blurFace.progress.label')}</p>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="progress-text">{progress}%</p>
                        </div>
                    )}

                    <div className="actions">
                        <button className="btn btn-secondary" onClick={handleNewImage}>
                            {t('common.buttons.otherImage')}
                        </button>
                        {result && (
                            <button
                                className="btn btn-primary"
                                onClick={handleReapply}
                                disabled={processing}
                            >
                                {t('common.buttons.retry')}
                            </button>
                        )}
                        {!result ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleProcess}
                                disabled={processing}
                            >
                                {processing ? t('common.status.processing') : t('pages.image.blurFace.actions.apply')}
                            </button>
                        ) : (
                            <>
                                <button
                                    className={`btn ${copied ? 'btn-copied' : 'btn-clipboard'}`}
                                    onClick={handleCopyToClipboard}
                                >
                                    {copied ? t('common.buttons.copied') : t('common.buttons.copy')}
                                </button>
                                <button className="btn btn-success" onClick={handleDownload}>
                                    {t('common.buttons.save')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {modalImage && (
                <div className="modal-overlay" onClick={() => setModalImage(null)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-image-wrapper">
                            <img src={modalIndex === 0 ? preview! : result!} alt={modalIndex === 0 ? 'Original' : 'Result'} />
                            <button className="modal-close" onClick={() => setModalImage(null)}>
                                ✕
                            </button>
                        </div>
                        {result && (
                            <div className="modal-toggle-group">
                                <button
                                    className={`modal-toggle-btn ${modalIndex === 0 ? 'active' : ''}`}
                                    onClick={() => setModalIndex(0)}
                                >
                                    {t('pages.image.portraitBlur.modal.original')}
                                </button>
                                <button
                                    className={`modal-toggle-btn ${modalIndex === 1 ? 'active' : ''}`}
                                    onClick={() => setModalIndex(1)}
                                >
                                    {t('pages.image.portraitBlur.modal.result')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <FeatureHighlights className="seo-highlights" />
        </div>
    );
};

export default BlurFace;
