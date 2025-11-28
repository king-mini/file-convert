import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { mergePdfs, getPageCount } from '../../utils/pdfMerger';
import type { PdfFile, MergeProgress } from '../../utils/pdfMerger';
import './MergePdf.css';

const MergePdf = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState<MergeProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === 'application/pdf'
    );

    if (pdfFiles.length === 0) {
      alert(t('common.validation.pdfOnlySelect'));
      return;
    }

    const newFiles: PdfFile[] = pdfFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      pageCount: undefined,
    }));

    // 페이지 수 비동기로 로드
    newFiles.forEach(async (pdfFile) => {
      const count = await getPageCount(pdfFile.file);
      setFiles((prev) =>
        prev.map((f) => (f.id === pdfFile.id ? { ...f, pageCount: count } : f))
      );
    });

    setFiles((prev) => [...prev, ...newFiles]);
  }, [t]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleMoveFile = useCallback((id: string, direction: 'up' | 'down') => {
    setFiles((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const newFiles = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      return newFiles;
    });
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) {
      alert(t('common.validation.minPdfFiles'));
      return;
    }

    setMerging(true);
    setProgress({ current: 0, total: files.length, status: t('common.status.starting') });

    try {
      await mergePdfs(files, setProgress);
      alert(t('common.success.merge'));
    } catch (error) {
      console.error('병합 실패:', error);
      alert(t('common.errors.merge'));
    } finally {
      setMerging(false);
    }
  }, [files, t]);

  return (
    <div className="merge-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.merge.hero.title')}</h1>
        <p>{t('pages.pdf.merge.hero.description')}</p>
      </div>

      {/* 파일 업로드 영역 */}
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="upload-icon">📁</div>
        <p>{t('pages.pdf.merge.upload.hint')}</p>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn btn-primary">
          {t('common.buttons.selectPdf')}
        </label>
      </div>

      {/* PDF 목록 */}
      {files.length > 0 && (
        <div className="file-list">
          <h3>{t('pages.pdf.merge.list.title', { count: files.length })}</h3>
          <div className="files-container">
            {files.map((pdfFile, index) => (
              <div key={pdfFile.id} className="file-item">
                <span className="file-number">{index + 1}</span>
                <div className="file-details">
                  <span className="file-name">{pdfFile.file.name}</span>
                  <span className="file-info">
                    {pdfFile.pageCount !== undefined
                      ? t('pages.pdf.merge.list.pageCount', { count: pdfFile.pageCount })
                      : t('common.loading')}
                  </span>
                </div>
                <div className="file-actions">
                  <button
                    onClick={() => handleMoveFile(pdfFile.id, 'up')}
                    disabled={index === 0 || merging}
                    title={t('pages.pdf.merge.list.moveUp')}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveFile(pdfFile.id, 'down')}
                    disabled={index === files.length - 1 || merging}
                    title={t('pages.pdf.merge.list.moveDown')}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleRemoveFile(pdfFile.id)}
                    className="btn-delete"
                    disabled={merging}
                    title={t('pages.pdf.merge.list.delete')}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="merge-summary">
            <p>
              {t('pages.pdf.merge.list.summary', {
                count: files.reduce((sum, f) => sum + (f.pageCount || 0), 0),
              })}
            </p>
          </div>

          <button
            className="btn btn-convert"
            onClick={handleMerge}
            disabled={merging || files.length < 2}
          >
            {merging
              ? t('pages.pdf.merge.actions.merging', {
                  current: progress?.current ?? 0,
                  total: progress?.total ?? files.length,
                })
              : t('pages.pdf.merge.actions.merge')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && merging && (
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

export default MergePdf;

