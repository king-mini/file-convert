import { useState, useCallback } from 'react';
import { convertPdfToPngImages } from '../../utils/pngConverter';
import type { ConvertOptions, ConvertProgress } from '../../utils/pngConverter';
import './PdfToJpg.css';

const PdfToPng = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<ConvertProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // 변환 옵션
  const [scale, setScale] = useState(2);
  const [transparentBg, setTransparentBg] = useState(false);
  const [usePageRange, setUsePageRange] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

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

  const handleConvert = useCallback(async () => {
    if (!file) return;

    setConverting(true);
    setProgress({ current: 0, total: 1, status: '시작 중...' });

    const options: ConvertOptions = {
      scale,
      backgroundColor: transparentBg ? undefined : '#FFFFFF',
      ...(usePageRange && { pageRange: { start: startPage, end: endPage } }),
    };

    try {
      await convertPdfToPngImages(file, options, setProgress);
    } catch (error) {
      console.error('변환 실패:', error);
      alert('변환 중 오류가 발생했습니다.');
    } finally {
      setConverting(false);
    }
  }, [file, scale, transparentBg, usePageRange, startPage, endPage]);

  return (
    <div className="pdf-to-jpg">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>🎨 PDF to PNG Converter</h1>
        <p>브라우저에서 안전하게 변환 · 투명 배경 지원</p>
      </div>

      {/* 광고 영역 - 상단 */}
      <div className="ad-placeholder">
        <p>[ AdSense 광고 영역 - 상단 ]</p>
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

      {/* 변환 옵션 */}
      {file && (
        <div className="options">
          <h3>변환 옵션</h3>

          <div className="option-group">
            <label>
              해상도: <strong>{scale === 1 ? '72dpi' : scale === 2 ? '144dpi' : '216dpi'}</strong>
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.5"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              disabled={converting}
            />
          </div>

          <div className="option-group">
            <label>
              <input
                type="checkbox"
                checked={transparentBg}
                onChange={(e) => setTransparentBg(e.target.checked)}
                disabled={converting}
              />
              투명 배경 (흰색 배경 제거)
            </label>
          </div>

          <div className="option-group">
            <label>
              <input
                type="checkbox"
                checked={usePageRange}
                onChange={(e) => setUsePageRange(e.target.checked)}
                disabled={converting}
              />
              페이지 범위 지정
            </label>
            {usePageRange && (
              <div className="page-range">
                <input
                  type="number"
                  min="1"
                  value={startPage}
                  onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                  disabled={converting}
                />
                <span>~</span>
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

          <button className="btn btn-convert" onClick={handleConvert} disabled={converting}>
            {converting ? '변환 중...' : '🚀 변환 시작'}
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

      {/* 광고 영역 - 하단 */}
      <div className="ad-placeholder">
        <p>[ AdSense 광고 영역 - 하단 ]</p>
      </div>
    </div>
  );
};

export default PdfToPng;

