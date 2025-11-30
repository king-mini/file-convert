import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { rotatePdf } from '../../utils/pdfRotator';
import type { RotationAngle, RotateProgress } from '../../utils/pdfRotator';
import PasswordModal from '../../components/PasswordModal';
import './RotatePdf.css';

const RotatePdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotating, setRotating] = useState(false);
  const [progress, setProgress] = useState<RotateProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 회전 옵션
  const [angle, setAngle] = useState<RotationAngle>(90);
  const [selectedPages, setSelectedPages] = useState<'all' | string>('all');

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

  const parsePageIndices = (input: string): number[] => {
    const parts = input.split(',').map((s) => s.trim());
    const result = new Set<number>();

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            result.add(i);
          }
        }
      } else {
        const num = parseInt(part);
        if (!isNaN(num)) {
          result.add(num);
        }
      }
    }

    return Array.from(result).sort((a, b) => a - b);
  };

  const handleRotate = useCallback(async (password?: string) => {
    if (!file) return;

    let pageIndices: number[] | 'all' = 'all';
    if (selectedPages !== 'all') {
      const parsed = parsePageIndices(selectedPages);
      if (parsed.length === 0) {
        alert(t('common.validation.validPages', { example: '1,3,5-7' }));
        return;
      }
      pageIndices = parsed;
    }

    setRotating(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });

    try {
      await rotatePdf(file, angle, pageIndices, password || currentPassword, setProgress);
      alert(t('common.success.rotate'));
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setCurrentPassword(password || currentPassword);
    } catch (error: any) {
      console.error('회전 실패:', error);
      if (error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')) {
        setIsPasswordModalOpen(true);
        if (password) {
          setPasswordError(true);
        }
      } else {
        alert(t('common.errors.rotate'));
      }
    } finally {
      setRotating(false);
    }
  }, [file, angle, selectedPages, t, currentPassword]);

  return (
    <div className="rotate-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.rotate.hero.title')}</h1>
        <p>{t('pages.pdf.rotate.hero.description')}</p>
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

      {/* 회전 옵션 */}
      {file && (
        <div className="options">
          <h3>{t('pages.pdf.rotate.options.title')}</h3>

          <div className="option-group">
            <label>{t('pages.pdf.rotate.options.angle')}</label>
            <div className="angle-buttons">
              <button
                className={`angle-btn ${angle === 90 ? 'active' : ''}`}
                onClick={() => setAngle(90)}
                disabled={rotating}
              >
                ↻ 90°
              </button>
              <button
                className={`angle-btn ${angle === 180 ? 'active' : ''}`}
                onClick={() => setAngle(180)}
                disabled={rotating}
              >
                ↻ 180°
              </button>
              <button
                className={`angle-btn ${angle === 270 ? 'active' : ''}`}
                onClick={() => setAngle(270)}
                disabled={rotating}
              >
                ↻ 270°
              </button>
            </div>
          </div>

          <div className="option-group">
            <label>{t('pages.pdf.rotate.options.pages')}</label>
            <div className="page-selection">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={selectedPages === 'all'}
                  onChange={() => setSelectedPages('all')}
                  disabled={rotating}
                />
                {t('pages.pdf.rotate.options.allPages')}
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  checked={selectedPages !== 'all'}
                  onChange={() => setSelectedPages('')}
                  disabled={rotating}
                />
                {t('pages.pdf.rotate.options.specificPages')}
              </label>
            </div>

            {selectedPages !== 'all' && (
              <input
                type="text"
                className="page-input"
                placeholder={t('pages.pdf.rotate.options.pagePlaceholder')}
                value={selectedPages}
                onChange={(e) => setSelectedPages(e.target.value)}
                disabled={rotating}
              />
            )}
          </div>

          <button className="btn btn-convert" onClick={() => handleRotate()} disabled={rotating}>
            {rotating ? t('pages.pdf.rotate.actions.rotating') : t('pages.pdf.rotate.actions.rotate')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && rotating && (
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
        onSubmit={(password) => handleRotate(password)}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          setPasswordError(false);
          setRotating(false);
        }}
      />
    </div>
  );
};

export default RotatePdf;
