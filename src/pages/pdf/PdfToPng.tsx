import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { convertPdfToPngImages } from '../../utils/pngConverter';
import type { ConvertOptions, ConvertProgress } from '../../utils/pngConverter';
import PasswordModal from '../../components/PasswordModal';
import './PdfToPng.css';

const PdfToPng = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<ConvertProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 변환 옵션
  const [scale, setScale] = useState(2);
  const [transparent, setTransparent] = useState(false);
  const [usePageRange, setUsePageRange] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

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

  const handleConvert = useCallback(async (password?: string) => {
    if (!file) return;

    setConverting(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });

    const options: ConvertOptions = {
      scale,
      backgroundColor: transparent ? undefined : '#FFFFFF',
      ...(usePageRange && { pageRange: { start: startPage, end: endPage } }),
      password: password || currentPassword,
    };

    try {
      await convertPdfToPngImages(file, options, setProgress);
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setCurrentPassword(options.password);
    } catch (error: any) {
      console.error('변환 실패:', error);
      if (error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')) {
        setIsPasswordModalOpen(true);
        if (password) {
          setPasswordError(true);
        }
      } else {
        alert(t('common.errors.convert'));
      }
    } finally {
      setConverting(false);
    }
  }, [file, scale, transparent, usePageRange, startPage, endPage, t, currentPassword]);

  return (
    <div className="pdf-to-png">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.toPng.hero.title')}</h1>
        <p>{t('pages.pdf.toPng.hero.description')}</p>
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
              <button className="btn-remove" onClick={() => setFile(null)}>
                ✕
              </button>
            </div>
          </>
        )}
      </div>

      {/* 변환 옵션 */}
      {file && (
        <div className="options">
          <h3>{t('pages.pdf.toPng.options.title')}</h3>

          <div className="option-group">
            <label>{t('pages.pdf.toPng.options.resolution')}</label>
            <div className="range-slider">
              <input
                type="range"
                min="1"
                max="3"
                step="0.5"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                disabled={converting}
              />
              <span>{Math.round(scale * 72)}dpi</span>
            </div>
          </div>

          <div className="option-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                disabled={converting}
              />
              {t('pages.pdf.toPng.options.transparent')}
            </label>
          </div>

          <div className="option-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={usePageRange}
                onChange={(e) => setUsePageRange(e.target.checked)}
                disabled={converting}
              />
              {t('pages.pdf.toPng.options.pageRange')}
            </label>

            {usePageRange && (
              <div className="page-range-inputs">
                <input
                  type="number"
                  min="1"
                  value={startPage}
                  onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                  disabled={converting}
                />
                <span>-</span>
                <input
                  type="number"
                  min="1"
                  value={endPage}
                  onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                  disabled={converting}
                />
              </div>
            )}
          </div>

          <button className="btn btn-convert" onClick={() => handleConvert()} disabled={converting}>
            {converting ? t('common.status.converting') : t('pages.pdf.toPng.actions.start')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && converting && (
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
        onSubmit={(password) => handleConvert(password)}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          setPasswordError(false);
          setConverting(false);
        }}
      />
    </div>
  );
};

export default PdfToPng;
