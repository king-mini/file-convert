import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { compressPdf, formatFileSize } from '../../utils/pdfCompressor';
import type { CompressOptions, CompressProgress } from '../../utils/pdfCompressor';
import './CompressPdf.css';

type CompressionLevel = 'low' | 'medium' | 'high' | 'extreme';

const compressionPresets: Record<CompressionLevel, CompressOptions> = {
  low: { quality: 0.9, scale: 2 },
  medium: { quality: 0.7, scale: 1.5 },
  high: { quality: 0.5, scale: 1, maxWidth: 1600 },
  extreme: { quality: 0.3, scale: 0.8, maxWidth: 1200 },
};

const CompressPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState<CompressProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 압축 옵션
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setProgress(null);
    } else if (selectedFile) {
      alert(t('common.validation.pdfOnly'));
    }
  }, [t]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    },
    [handleFileSelect]
  );

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setCompressing(true);
    setProgress({
      current: 0,
      total: 1,
      status: t('common.status.starting'),
      originalSize: file.size,
    });

    const options = compressionPresets[compressionLevel];

    try {
      await compressPdf(file, options, setProgress);
      alert(t('common.success.compress'));
    } catch (error) {
      console.error('압축 실패:', error);
      alert(t('common.errors.compress'));
    } finally {
      setCompressing(false);
    }
  }, [file, compressionLevel, t]);

  return (
    <div className="compress-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.compress.hero.title')}</h1>
        <p>{t('pages.pdf.compress.hero.description')}</p>
      </div>

      {/* 경고 메시지 */}
      <div className="warning-box">
        <span className="warning-icon">⚠️</span>
        <div className="warning-content">
          <strong>{t('pages.pdf.compress.warning.title')}</strong>
          <p>{t('pages.pdf.compress.warning.description')}</p>
        </div>
      </div>

      {/* 파일 업로드 영역 */}
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        {!file ? (
          <>
            <div className="upload-icon">📁</div>
            <p>{t('common.dropzone.pdf')}</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="btn btn-primary">
              {t('common.buttons.selectFile')}
            </label>
          </>
        ) : (
          <>
            <div className="file-info">
              <span className="file-icon">📄</span>
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {t('pages.pdf.compress.fileInfo.original', { size: formatFileSize(file.size) })}
                </span>
              </div>
              <button className="btn-remove" onClick={() => setFile(null)}>
                ✕
              </button>
            </div>
          </>
        )}
      </div>

      {/* 압축 옵션 */}
      {file && (
        <div className="options">
          <h3>{t('pages.pdf.compress.options.title')}</h3>

          <div className="compression-levels">
            <button
              className={`level-btn ${compressionLevel === 'low' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('low')}
              disabled={compressing}
            >
              <span className="level-icon">🟢</span>
              <span className="level-title">
                {t('pages.pdf.compress.options.levels.low.title')}
              </span>
              <span className="level-desc">{t('pages.pdf.compress.options.levels.low.desc')}</span>
              <span className="level-info">
                {t('pages.pdf.compress.options.levels.low.info')}
              </span>
            </button>
            <button
              className={`level-btn ${compressionLevel === 'medium' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('medium')}
              disabled={compressing}
            >
              <span className="level-icon">🟡</span>
              <span className="level-title">
                {t('pages.pdf.compress.options.levels.medium.title')}
              </span>
              <span className="level-desc">
                {t('pages.pdf.compress.options.levels.medium.desc')}
              </span>
              <span className="level-info">
                {t('pages.pdf.compress.options.levels.medium.info')}
              </span>
            </button>
            <button
              className={`level-btn ${compressionLevel === 'high' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('high')}
              disabled={compressing}
            >
              <span className="level-icon">🟠</span>
              <span className="level-title">
                {t('pages.pdf.compress.options.levels.high.title')}
              </span>
              <span className="level-desc">{t('pages.pdf.compress.options.levels.high.desc')}</span>
              <span className="level-info">
                {t('pages.pdf.compress.options.levels.high.info')}
              </span>
            </button>
            <button
              className={`level-btn ${compressionLevel === 'extreme' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('extreme')}
              disabled={compressing}
            >
              <span className="level-icon">🔴</span>
              <span className="level-title">
                {t('pages.pdf.compress.options.levels.extreme.title')}
              </span>
              <span className="level-desc">
                {t('pages.pdf.compress.options.levels.extreme.desc')}
              </span>
              <span className="level-info">
                {t('pages.pdf.compress.options.levels.extreme.info')}
              </span>
            </button>
          </div>

          <button className="btn btn-convert" onClick={handleCompress} disabled={compressing}>
            {compressing
              ? t('pages.pdf.compress.actions.compressing')
              : t('pages.pdf.compress.actions.compress')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && (
        <div className="progress">
          <p>{progress.status}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <div className="progress-info">
          <p className="progress-text">
            {progress.current} / {progress.total} {t('common.units.page')}
          </p>
            {progress.originalSize && progress.currentSize && (
              <p className="size-info">
                {formatFileSize(progress.originalSize)} → {formatFileSize(progress.currentSize)}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CompressPdf;

