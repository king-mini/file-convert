import { useState, useCallback } from 'react';
import { rotatePdf } from '../../utils/pdfRotator';
import type { RotationAngle, RotateProgress } from '../../utils/pdfRotator';
import './RotatePdf.css';

const RotatePdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotating, setRotating] = useState(false);
  const [progress, setProgress] = useState<RotateProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // 회전 옵션
  const [rotationAngle, setRotationAngle] = useState<RotationAngle>(90);
  const [applyToAll, setApplyToAll] = useState(true);
  const [selectedPages, setSelectedPages] = useState('');

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setProgress(null);
    } else if (selectedFile) {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  }, []);

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
    setProgress({ current: 0, total: 1, status: '시작 중...' });

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
          alert('유효한 페이지 번호를 입력하세요.');
          setRotating(false);
          return;
        }
      }

      await rotatePdf(file, rotationAngle, pageIndices, setProgress);
      alert('PDF 회전이 완료되었습니다!');
    } catch (error) {
      console.error('회전 실패:', error);
      alert('회전 중 오류가 발생했습니다.');
    } finally {
      setRotating(false);
    }
  }, [file, rotationAngle, applyToAll, selectedPages]);

  return (
    <div className="rotate-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>🔄 Rotate PDF</h1>
        <p>PDF 페이지를 회전하세요</p>
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
            <p>PDF 파일을 드래그하거나 클릭하여 선택</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="btn btn-primary">
              파일 선택
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
          <h3>회전 옵션</h3>

          <div className="option-group">
            <label>회전 각도</label>
            <div className="rotation-buttons">
              <button
                className={`rotation-btn ${rotationAngle === 90 ? 'active' : ''}`}
                onClick={() => setRotationAngle(90)}
                disabled={rotating}
              >
                <span className="rotation-icon">↻</span>
                <span>90° 오른쪽</span>
              </button>
              <button
                className={`rotation-btn ${rotationAngle === 180 ? 'active' : ''}`}
                onClick={() => setRotationAngle(180)}
                disabled={rotating}
              >
                <span className="rotation-icon">↻</span>
                <span>180°</span>
              </button>
              <button
                className={`rotation-btn ${rotationAngle === 270 ? 'active' : ''}`}
                onClick={() => setRotationAngle(270)}
                disabled={rotating}
              >
                <span className="rotation-icon">↺</span>
                <span>90° 왼쪽</span>
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
              모든 페이지에 적용
            </label>
            {!applyToAll && (
              <div className="page-selection">
                <input
                  type="text"
                  placeholder="예: 1,3,5-7"
                  value={selectedPages}
                  onChange={(e) => setSelectedPages(e.target.value)}
                  disabled={rotating}
                />
                <small>페이지 번호를 쉼표로 구분하세요. 범위는 하이픈으로 표시 (예: 1-5)</small>
              </div>
            )}
          </div>

          <button className="btn btn-convert" onClick={handleRotate} disabled={rotating}>
            {rotating ? '회전 중...' : '🔄 PDF 회전'}
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

