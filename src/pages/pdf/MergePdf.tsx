import { useState, useCallback } from 'react';
import { mergePdfs, getPageCount } from '../../utils/pdfMerger';
import type { PdfFile, MergeProgress } from '../../utils/pdfMerger';
import './MergePdf.css';

const MergePdf = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [progress, setProgress] = useState<MergeProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === 'application/pdf'
    );

    if (pdfFiles.length === 0) {
      alert('PDF 파일만 선택할 수 있습니다.');
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
  }, []);

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
      alert('최소 2개의 PDF 파일이 필요합니다.');
      return;
    }

    setMerging(true);
    setProgress({ current: 0, total: files.length, status: '시작 중...' });

    try {
      await mergePdfs(files, setProgress);
      alert('PDF 병합이 완료되었습니다!');
    } catch (error) {
      console.error('병합 실패:', error);
      alert('병합 중 오류가 발생했습니다.');
    } finally {
      setMerging(false);
    }
  }, [files]);

  return (
    <div className="merge-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>🔗 Merge PDF</h1>
        <p>여러 PDF를 하나로 병합하세요</p>
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
        <p>PDF 파일을 드래그하거나 클릭하여 선택 (여러 파일 가능)</p>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn btn-primary">
          PDF 선택
        </label>
      </div>

      {/* PDF 목록 */}
      {files.length > 0 && (
        <div className="file-list">
          <h3>선택된 PDF ({files.length}개)</h3>
          <div className="files-container">
            {files.map((pdfFile, index) => (
              <div key={pdfFile.id} className="file-item">
                <span className="file-number">{index + 1}</span>
                <div className="file-details">
                  <span className="file-name">{pdfFile.file.name}</span>
                  <span className="file-info">
                    {pdfFile.pageCount !== undefined
                      ? `${pdfFile.pageCount} 페이지`
                      : '로딩 중...'}
                  </span>
                </div>
                <div className="file-actions">
                  <button
                    onClick={() => handleMoveFile(pdfFile.id, 'up')}
                    disabled={index === 0 || merging}
                    title="위로"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveFile(pdfFile.id, 'down')}
                    disabled={index === files.length - 1 || merging}
                    title="아래로"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleRemoveFile(pdfFile.id)}
                    className="btn-delete"
                    disabled={merging}
                    title="삭제"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="merge-summary">
            <p>
              총 {files.reduce((sum, f) => sum + (f.pageCount || 0), 0)} 페이지가 병합됩니다
            </p>
          </div>

          <button
            className="btn btn-convert"
            onClick={handleMerge}
            disabled={merging || files.length < 2}
          >
            {merging ? `병합 중... (${progress?.current}/${progress?.total})` : '🔗 PDF 병합'}
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

