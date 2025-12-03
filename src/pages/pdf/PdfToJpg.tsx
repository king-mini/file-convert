import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { convertPdfToImages } from '../../utils/pdfConverter';
import type { ConvertOptions, ConvertProgress } from '../../utils/pdfConverter';
import { trackConversionStart, trackConversionComplete, trackConversionError } from '../../utils/analytics';
import PasswordModal from '../../components/PasswordModal';
import FeatureHighlights from '../../components/FeatureHighlights';
import ToolBreadcrumb from '../../components/ToolBreadcrumb';
import './PdfToJpg.css';

const PdfToJpg = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<ConvertProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 변환 옵션
  const [quality, setQuality] = useState(0.8);
  const [scale, setScale] = useState(2);
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

    const startTime = Date.now();
    setConverting(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });

    // Analytics: 변환 시작
    trackConversionStart('pdf_to_jpg', file.size);

    const options: ConvertOptions = {
      quality,
      scale,
      ...(usePageRange && { pageRange: { start: startPage, end: endPage } }),
      password: password || currentPassword,
    };

    try {
      await convertPdfToImages(file, options, setProgress);
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setCurrentPassword(options.password);

      // Analytics: 변환 완료
      const duration = Date.now() - startTime;
      trackConversionComplete('pdf_to_jpg', file.size, duration);
    } catch (error: any) {
      console.error('변환 실패:', error);

      // Analytics: 변환 에러
      const errorType = error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')
        ? 'password_required'
        : 'conversion_failed';
      trackConversionError('pdf_to_jpg', errorType);

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
  }, [file, quality, scale, usePageRange, startPage, endPage, t, currentPassword]);

  return (
    <div className="pdf-to-jpg">
      <ToolBreadcrumb
        currentLabel={t('breadcrumbs.pdfToJpg')}
        categoryPath="/pdf"
        categoryLabel={t('breadcrumbs.pdfTools')}
        guidePath="/guide/pdf-to-jpg"
      />
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.toJpg.hero.title')}</h1>
        <p>{t('pages.pdf.toJpg.hero.description')}</p>
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
          <h3>{t('pages.pdf.toJpg.options.title')}</h3>

          <div className="option-group">
            <label>{t('pages.pdf.toJpg.options.quality', { value: Math.round(quality * 100) })}</label>
            <div className="range-slider">
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                disabled={converting}
              />
              <span>{Math.round(quality * 100)}%</span>
            </div>
          </div>

          <div className="option-group">
            <label>{t('pages.pdf.toJpg.options.resolution')}</label>
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
                checked={usePageRange}
                onChange={(e) => setUsePageRange(e.target.checked)}
                disabled={converting}
              />
              {t('pages.pdf.toJpg.options.pageRange')}
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
            {converting ? t('common.status.converting') : t('pages.pdf.toJpg.actions.start')}
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
      <FeatureHighlights className="seo-highlights" />
    </div>
  );
};

export default PdfToJpg;
