import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { compressPdf, formatFileSize } from '../../utils/pdfCompressor';
import type { CompressOptions, CompressProgress } from '../../utils/pdfCompressor';
import { trackConversionStart, trackConversionComplete, trackConversionError } from '../../utils/analytics';
import PasswordModal from '../../components/PasswordModal';
import './CompressPdf.css';

const CompressPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState<CompressProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 압축 옵션
  const [quality, setQuality] = useState(0.7);
  const [scale, setScale] = useState(1.0);

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);

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

  const handleCompress = useCallback(async (password?: string) => {
    if (!file) return;

    const startTime = Date.now();
    setCompressing(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });

    trackConversionStart('compress_pdf', file.size);

    const options: CompressOptions = {
      quality,
      scale,
      password: password || currentPassword,
    };

    try {
      await compressPdf(file, options, setProgress);
      alert(t('common.success.compress'));
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setCurrentPassword(options.password);

      const duration = Date.now() - startTime;
      trackConversionComplete('compress_pdf', file.size, duration);
    } catch (error: any) {
      console.error('압축 실패:', error);

      const errorType = error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')
        ? 'password_required'
        : 'compression_failed';
      trackConversionError('compress_pdf', errorType);

      if (error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')) {
        setIsPasswordModalOpen(true);
        if (password) {
          setPasswordError(true);
        }
      } else {
        alert(t('common.errors.compress'));
      }
    } finally {
      setCompressing(false);
    }
  }, [file, quality, scale, t, currentPassword]);

  return (
    <div className="compress-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.compress.hero.title')}</h1>
        <p>{t('pages.pdf.compress.hero.description')}</p>
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
              <span className="file-name">{file.name}</span>
              <span className="file-size">({formatFileSize(file.size)})</span>
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

          <div className="option-group">
            <label>{t('pages.pdf.compress.options.quality', { value: Math.round(quality * 100) })}</label>
            <div className="range-slider">
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                disabled={compressing}
              />
              <span>{Math.round(quality * 100)}%</span>
            </div>
          </div>

          <div className="option-group">
            <label>{t('pages.pdf.compress.options.resolution')}</label>
            <div className="range-slider">
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.25"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                disabled={compressing}
              />
              <span>{Math.round(scale * 100)}%</span>
            </div>
          </div>

          <button className="btn btn-convert" onClick={() => handleCompress()} disabled={compressing}>
            {compressing ? t('pages.pdf.compress.actions.compressing') : t('pages.pdf.compress.actions.compress')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && compressing && (
        <div className="progress">
          <p>{progress.status}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <p className="progress-text">
            {progress.current} / {progress.total}
          </p>
        </div>
      )}

      <PasswordModal
        isOpen={isPasswordModalOpen}
        isError={passwordError}
        onSubmit={(password) => handleCompress(password)}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          setPasswordError(false);
          setCompressing(false);
        }}
      />
    </div>
  );
};

export default CompressPdf;
