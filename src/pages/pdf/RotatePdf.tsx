import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { rotatePdf } from '../../utils/pdfRotator';
import type { RotationAngle, RotateProgress } from '../../utils/pdfRotator';
import './RotatePdf.css';

const RotatePdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotating, setRotating] = useState(false);
  const [progress, setProgress] = useState<RotateProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 회전 옵션
  const [rotationAngle, setRotationAngle] = useState<RotationAngle>(90);
  const [applyToAll, setApplyToAll] = useState(true);
  const [selectedPages, setSelectedPages] = useState('');

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

  const handleRotate = useCallback(async () => {
    if (!file) return;

    setRotating(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });

    try {
      let pageIndices: number[] | 'all' = 'all';

      if (!applyToAll && selectedPages) {
        // 페이지 범위 파싱 (예: "1,3,5-7" → [0,2,4,5,6])
        const ranges = selectedPages.split(',').map((s) => s.trim());
        const indices = new Set<number>();

        for (const range of ranges) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map((n) => parseInt(n.trim()));
            if (isNaN(start) || isNaN(end)) continue;
            for (let i = start; i <= end; i++) {
              indices.add(i - 1); // 0-based
            }
          } else {
            const num = parseInt(range);
            if (!isNaN(num)) {
              indices.add(num - 1); // 0-based
            }
          }
        }

        pageIndices = Array.from(indices).sort((a, b) => a - b);

        if (pageIndices.length === 0) {
          alert(t('common.validation.validPagesSimple'));
          setRotating(false);
          return;
        }
      }

      await rotatePdf(file, rotationAngle, pageIndices, setProgress);
      alert(t('common.success.rotate'));
    } catch (error) {
      console.error('회전 실패:', error);
      alert(t('common.errors.rotate'));
    } finally {
      setRotating(false);
    }
  }, [file, rotationAngle, applyToAll, selectedPages, t]);

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
            <div className="rotation-buttons">
              <button
                className={`rotation-btn ${rotationAngle === 90 ? 'active' : ''}`}
                onClick={() => setRotationAngle(90)}
                disabled={rotating}
              >
                <span className="rotation-icon">↻</span>
                <span>{t('pages.pdf.rotate.options.angles.right')}</span>
              </button>
              <button
                className={`rotation-btn ${rotationAngle === 180 ? 'active' : ''}`}
                onClick={() => setRotationAngle(180)}
                disabled={rotating}
              >
                <span className="rotation-icon">↻</span>
                <span>{t('pages.pdf.rotate.options.angles.half')}</span>
              </button>
              <button
                className={`rotation-btn ${rotationAngle === 270 ? 'active' : ''}`}
                onClick={() => setRotationAngle(270)}
                disabled={rotating}
              >
                <span className="rotation-icon">↺</span>
                <span>{t('pages.pdf.rotate.options.angles.left')}</span>
              </button>
            </div>
          </div>

          <div className="option-group">
            <label>
              <input
                type="checkbox"
                checked={applyToAll}
                onChange={(e) => setApplyToAll(e.target.checked)}
                disabled={rotating}
              />
              {t('pages.pdf.rotate.options.applyAll')}
            </label>
            {!applyToAll && (
              <div className="page-selection">
                <input
                  type="text"
                  placeholder={t('pages.pdf.rotate.options.pageInputPlaceholder')}
                  value={selectedPages}
                  onChange={(e) => setSelectedPages(e.target.value)}
                  disabled={rotating}
                />
                <small>{t('pages.pdf.rotate.options.pageInputHint')}</small>
              </div>
            )}
          </div>

          <button className="btn btn-convert" onClick={handleRotate} disabled={rotating}>
            {rotating ? t('pages.pdf.rotate.actions.rotating') : t('pages.pdf.rotate.actions.rotate')}
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
          <p className="progress-text">
            {progress.current} / {progress.total}
          </p>
        </div>
      )}

    </div>
  );
};

export default RotatePdf;

