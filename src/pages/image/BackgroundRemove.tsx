import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FeatureHighlights from '../../components/FeatureHighlights';
import { removeBackground, formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import type { RemoveBackgroundOptions } from '../../utils/imageProcessor';
import './BackgroundRemove.css';

const BackgroundRemove = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState(0); // 0: 원본, 1: 결과

  // 옵션
  const [modelSelection, setModelSelection] = useState<0 | 1>(1);
  const [edgeBlur, setEdgeBlur] = useState(3);
  const [copied, setCopied] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const { t } = useTranslation();

  // 모달 키보드 단축키 (ESC: 닫기, 좌우 방향키: 토글)
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

    const options: RemoveBackgroundOptions = {
      modelSelection,
      edgeBlur,
    };

    try {
      const blob = await removeBackground(file, options, setProgress);
      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultBlob(blob);
      setCopied(false);
    } catch (err) {
      console.error('Processing error:', err);
      setError(t('common.errors.process'));
    } finally {
      setProcessing(false);
    }
  }, [file, modelSelection, edgeBlur, t]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const link = document.createElement('a');
    link.href = result;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}_nobg.png`;
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

  return (
    <div className="background-remove">
      <div className="page-header">
        <h1>{t('pages.image.backgroundRemove.hero.title')}</h1>
        <p>{t('pages.image.backgroundRemove.hero.description')}</p>
      </div>

      {/* 파일 업로드 영역 */}
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
            <p>{t('pages.image.backgroundRemove.upload.hint')}</p>
            <span className="upload-hint">{t('pages.image.backgroundRemove.upload.support')}</span>
          </label>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* 이미지 편집 영역 */}
      {file && (
        <div className="editor">
          {/* 이미지 비교 뷰 */}
          <div className="image-compare">
            <div className="image-panel">
              <h3>{t('pages.image.backgroundRemove.panels.original')}</h3>
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
                {preview && <img src={preview} alt="원본 이미지" />}
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
              <h3>{t('pages.image.backgroundRemove.panels.result')}</h3>
              <div
                className={`image-container transparent-bg ${result ? 'clickable' : ''}`}
                onClick={() => result && setModalImage(result)}
                title={result ? t('common.hints.viewLarge') : undefined}
              >
                {result ? (
                  <img src={result} alt="배경 제거된 이미지" />
                ) : (
                  <div className="placeholder">
                    {processing
                      ? t('common.status.processing')
                      : t('pages.image.backgroundRemove.placeholders.result')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 옵션 */}
          <div className="options">
            <div className="option-group">
              <label>{t('pages.image.backgroundRemove.options.model')}</label>
              <div className="radio-group">
                <label className={`radio-option ${modelSelection === 0 ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="model"
                    checked={modelSelection === 0}
                    onChange={() => setModelSelection(0)}
                    disabled={processing}
                  />
                  <span>{t('pages.image.backgroundRemove.options.fast')}</span>
                </label>
                <label className={`radio-option ${modelSelection === 1 ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="model"
                    checked={modelSelection === 1}
                    onChange={() => setModelSelection(1)}
                    disabled={processing}
                  />
                  <span>{t('pages.image.backgroundRemove.options.quality')}</span>
                </label>
              </div>
            </div>

            <div className="option-group">
              <label>{t('pages.image.backgroundRemove.options.edgeBlur', { value: edgeBlur })}</label>
              <input
                type="range"
                min="0"
                max="10"
                value={edgeBlur}
                onChange={(e) => setEdgeBlur(Number(e.target.value))}
                disabled={processing}
              />
              <div className="range-labels">
                <span>{t('pages.image.backgroundRemove.options.edgeLabels.sharp')}</span>
                <span>{t('pages.image.backgroundRemove.options.edgeLabels.smooth')}</span>
              </div>
            </div>

            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
            </div>
            <p className="output-info">{t('pages.image.backgroundRemove.info.output')}</p>
          </div>

          {/* 진행률 */}
          {processing && (
            <div className="progress" aria-live="polite">
              <p>{t('pages.image.backgroundRemove.progress.label')}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="progress-text">{progress}%</p>
            </div>
          )}

          {/* 액션 버튼 */}
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
                {processing
                  ? t('common.status.processing')
                  : t('pages.image.backgroundRemove.actions.apply')}
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
                  {t('pages.image.backgroundRemove.actions.savePng')}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 이미지 확대 모달 */}
      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-wrapper">
              <img src={modalIndex === 0 ? preview! : result!} alt={modalIndex === 0 ? '원본' : '결과'} />
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
                  {t('pages.image.backgroundRemove.panels.original')}
                </button>
                <button
                  className={`modal-toggle-btn ${modalIndex === 1 ? 'active' : ''}`}
                  onClick={() => setModalIndex(1)}
                >
                  {t('pages.image.backgroundRemove.panels.result')}
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

export default BackgroundRemove;

