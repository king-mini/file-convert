import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { extractTextFromPdf, downloadAsTextFile } from '../../utils/textExtractor';
import type { ExtractProgress, ExtractedText } from '../../utils/textExtractor';
import PasswordModal from '../../components/PasswordModal';
import './PdfToText.css';

const PdfToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState<ExtractProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [extractedTexts, setExtractedTexts] = useState<ExtractedText[]>([]);
  const { t } = useTranslation();

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setProgress(null);
      setExtractedTexts([]);
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

  const handleExtract = useCallback(async (password?: string) => {
    if (!file) return;

    setExtracting(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });
    setExtractedTexts([]);

    try {
      const texts = await extractTextFromPdf(file, password || currentPassword, setProgress);
      setExtractedTexts(texts);
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setCurrentPassword(password || currentPassword);
    } catch (error: any) {
      console.error('추출 실패:', error);
      if (error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')) {
        setIsPasswordModalOpen(true);
        if (password) {
          setPasswordError(true);
        }
      } else {
        alert(t('common.errors.extract'));
      }
    } finally {
      setExtracting(false);
    }
  }, [file, t, currentPassword]);

  const handleDownload = useCallback(() => {
    if (!file || extractedTexts.length === 0) return;
    downloadAsTextFile(file.name, extractedTexts);
  }, [file, extractedTexts]);

  const handleCopyAll = useCallback(() => {
    const fullText = extractedTexts.map((page) => page.text).join('\n\n');
    navigator.clipboard.writeText(fullText);
    alert(t('common.success.copy'));
  }, [extractedTexts, t]);

  return (
    <div className="pdf-to-text">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.toText.hero.title')}</h1>
        <p>{t('pages.pdf.toText.hero.description')}</p>
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

      {/* 추출 버튼 */}
      {file && !extractedTexts.length && (
        <div className="options">
          <button className="btn btn-convert" onClick={() => handleExtract()} disabled={extracting}>
            {extracting ? t('pages.pdf.toText.actions.extracting') : t('pages.pdf.toText.actions.extract')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && extracting && (
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

      {/* 추출된 텍스트 미리보기 */}
      {extractedTexts.length > 0 && (
        <div className="text-result">
          <div className="result-header">
            <h3>{t('pages.pdf.toText.result.title', { count: extractedTexts.length })}</h3>
            <div className="result-actions">
              <button className="btn btn-secondary" onClick={handleCopyAll}>
                {t('pages.pdf.toText.result.copyAll')}
              </button>
              <button className="btn btn-primary" onClick={handleDownload}>
                {t('pages.pdf.toText.result.saveTxt')}
              </button>
            </div>
          </div>

          <div className="text-preview">
            {extractedTexts.map((page) => (
              <div key={page.pageNumber} className="text-page">
                <div className="page-number">
                  {t('pages.pdf.toText.result.pageLabel', { page: page.pageNumber })}
                </div>
                <pre className="page-text">{page.text}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      <PasswordModal
        isOpen={isPasswordModalOpen}
        isError={passwordError}
        onSubmit={(password) => handleExtract(password)}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          setPasswordError(false);
          setExtracting(false);
        }}
      />
    </div>
  );
};

export default PdfToText;
