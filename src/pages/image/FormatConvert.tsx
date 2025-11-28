import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import './FormatConvert.css';

type OutputFormat = 'jpeg' | 'png' | 'webp';

const formatInfo: Record<OutputFormat, { ext: string; mime: string }> = {
  jpeg: { ext: 'jpg', mime: 'image/jpeg' },
  png: { ext: 'png', mime: 'image/png' },
  webp: { ext: 'webp', mime: 'image/webp' },
};

const FormatConvert = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  // 변환 옵션
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('webp');
  const [quality, setQuality] = useState(90);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError(t('common.validation.imageOnly'));
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError(t('common.validation.maxImageSize', { limit: 50 }));
      return;
    }

    setError(null);
    setFile(selectedFile);
    setResult(null);
    setResultBlob(null);

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
    if (!file || !preview) return;

    setProcessing(true);
    setError(null);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = preview;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      
      // PNG 투명 배경 유지
      if (outputFormat === 'png') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);

      const info = formatInfo[outputFormat];
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('이미지 생성 실패'))),
          info.mime,
          outputFormat === 'png' ? undefined : quality / 100
        );
      });

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
  }, [file, preview, outputFormat, quality, t]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const link = document.createElement('a');
    link.href = result;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const info = formatInfo[outputFormat];
    link.download = `${baseName}.${info.ext}`;
    link.click();
  }, [result, file, outputFormat]);

  const handleNewImage = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
    setFile(null);
    setPreview(null);
    setResult(null);
    setResultBlob(null);
    setError(null);
    setCopied(false);
  }, [preview, result]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!resultBlob) return;

    try {
      await copyImageToClipboard(resultBlob);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(t('common.errors.clipboard'));
    }
  }, [resultBlob, t]);

  const getOriginalFormat = () => {
    if (!file) return '';
    const type = file.type;
    if (type.includes('jpeg') || type.includes('jpg')) return 'JPEG';
    if (type.includes('png')) return 'PNG';
    if (type.includes('webp')) return 'WebP';
    if (type.includes('gif')) return 'GIF';
    if (type.includes('bmp')) return 'BMP';
    return type.split('/')[1]?.toUpperCase() || t('pages.image.formatConvert.flow.unknown');
  };

  return (
    <div className="format-convert">
      <div className="page-header">
        <h1>{t('pages.image.formatConvert.hero.title')}</h1>
        <p>{t('pages.image.formatConvert.hero.description')}</p>
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
            <p>{t('pages.image.formatConvert.upload.hint')}</p>
            <span className="upload-hint">{t('pages.image.formatConvert.upload.support')}</span>
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
          <div className="conversion-flow">
            <div className="format-badge original">
              <span className="format-label">{t('pages.image.formatConvert.flow.original')}</span>
              <span className="format-name">{getOriginalFormat()}</span>
              <span className="format-size">{formatFileSize(file.size)}</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className="format-badge target">
              <span className="format-label">{t('pages.image.formatConvert.flow.target')}</span>
              <span className="format-name">
                {t(`pages.image.formatConvert.formatInfo.${outputFormat}.name`)}
              </span>
              {resultBlob && (
                <span className="format-size">{formatFileSize(resultBlob.size)}</span>
              )}
            </div>
          </div>

          <div className="image-preview">
            <div
              className="image-container clickable"
              onClick={() => (result || preview) && setModalImage(result || preview)}
            >
              {(result || preview) && (
                <img src={result || preview || ''} alt="이미지 미리보기" />
              )}
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

          <div className="options">
            <div className="option-group">
              <label>{t('pages.image.formatConvert.options.title')}</label>
              <div className="format-buttons">
                {(Object.keys(formatInfo) as OutputFormat[]).map((format) => (
                  <button
                    key={format}
                    className={`format-btn ${outputFormat === format ? 'active' : ''}`}
                    onClick={() => setOutputFormat(format)}
                  >
                    <span className="format-btn-name">
                      {t(`pages.image.formatConvert.formatInfo.${format}.name`)}
                    </span>
                    <span className="format-btn-desc">
                      {t(`pages.image.formatConvert.formatInfo.${format}.desc`)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {outputFormat !== 'png' && (
              <div className="option-group">
                <label>{t('pages.image.formatConvert.options.qualityLabel', { value: quality })}</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>{t('pages.image.formatConvert.options.rangeLabels.min')}</span>
                  <span>{t('pages.image.formatConvert.options.rangeLabels.max')}</span>
                </div>
              </div>
            )}

            <div className="file-info">
              <span className="file-name">{file.name}</span>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-secondary" onClick={handleNewImage}>
              {t('common.buttons.otherImage')}
            </button>
            {result && (
              <button
                className="btn btn-primary"
                onClick={handleProcess}
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
                  : t('pages.image.formatConvert.actions.convert')}
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalImage(null)}>
              ✕
            </button>
            <img src={modalImage} alt="확대 이미지" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormatConvert;

