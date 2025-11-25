import { useState, useCallback } from 'react';
import { splitPdf } from '../utils/pdfSplitter';
import type { SplitMode, SplitOptions, SplitProgress } from '../utils/pdfSplitter';
import './SplitPdf.css';

const SplitPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitting, setSplitting] = useState(false);
  const [progress, setProgress] = useState<SplitProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // 분할 옵션
  const [splitMode, setSplitMode] = useState<SplitMode>('each');
  const [rangesInput, setRangesInput] = useState('');
  const [extractInput, setExtractInput] = useState('');

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

  const parseRanges = (input: string): { start: number; end: number }[] => {
    const ranges = input.split(',').map((s) => s.trim());
    const result: { start: number; end: number }[] = [];

    for (const range of ranges) {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          result.push({ start, end });
        }
      }
    }

    return result;
  };

  const parsePages = (input: string): number[] => {
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

  const handleSplit = useCallback(async () => {
    if (!file) return;

    const options: SplitOptions = { mode: splitMode };

    if (splitMode === 'range') {
      const ranges = parseRanges(rangesInput);
      if (ranges.length === 0) {
        alert('유효한 범위를 입력하세요. (예: 1-5, 6-10)');
        return;
      }
      options.ranges = ranges;
    } else if (splitMode === 'extract') {
      const pages = parsePages(extractInput);
      if (pages.length === 0) {
        alert('유효한 페이지 번호를 입력하세요. (예: 1,3,5-7)');
        return;
      }
      options.extractPages = pages;
    }

    setSplitting(true);
    setProgress({ current: 0, total: 1, status: '시작 중...' });

    try {
      await splitPdf(file, options, setProgress);
      alert('PDF 분할이 완료되었습니다!');
    } catch (error) {
      console.error('분할 실패:', error);
      alert('분할 중 오류가 발생했습니다.');
    } finally {
      setSplitting(false);
    }
  }, [file, splitMode, rangesInput, extractInput]);

  return (
    <div className="split-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>✂️ Split PDF</h1>
        <p>PDF를 여러 파일로 분할하세요</p>
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

      {/* 분할 옵션 */}
      {file && (
        <div className="options">
          <h3>분할 옵션</h3>

          <div className="option-group">
            <label>분할 방식</label>
            <div className="split-modes">
              <button
                className={`mode-btn ${splitMode === 'each' ? 'active' : ''}`}
                onClick={() => setSplitMode('each')}
                disabled={splitting}
              >
                <span className="mode-icon">📄</span>
                <span className="mode-title">각 페이지</span>
                <span className="mode-desc">모든 페이지를 개별 파일로</span>
              </button>
              <button
                className={`mode-btn ${splitMode === 'range' ? 'active' : ''}`}
                onClick={() => setSplitMode('range')}
                disabled={splitting}
              >
                <span className="mode-icon">📚</span>
                <span className="mode-title">범위별</span>
                <span className="mode-desc">지정한 범위로 분할</span>
              </button>
              <button
                className={`mode-btn ${splitMode === 'extract' ? 'active' : ''}`}
                onClick={() => setSplitMode('extract')}
                disabled={splitting}
              >
                <span className="mode-icon">📑</span>
                <span className="mode-title">페이지 추출</span>
                <span className="mode-desc">특정 페이지만 추출</span>
              </button>
            </div>
          </div>

          {splitMode === 'range' && (
            <div className="option-group">
              <label>페이지 범위</label>
              <input
                type="text"
                placeholder="예: 1-5, 6-10, 11-15"
                value={rangesInput}
                onChange={(e) => setRangesInput(e.target.value)}
                disabled={splitting}
              />
              <small>쉼표로 구분하여 여러 범위를 입력하세요</small>
            </div>
          )}

          {splitMode === 'extract' && (
            <div className="option-group">
              <label>추출할 페이지</label>
              <input
                type="text"
                placeholder="예: 1,3,5-7,10"
                value={extractInput}
                onChange={(e) => setExtractInput(e.target.value)}
                disabled={splitting}
              />
              <small>페이지 번호를 쉼표로 구분하세요. 범위 지원</small>
            </div>
          )}

          <button className="btn btn-convert" onClick={handleSplit} disabled={splitting}>
            {splitting ? '분할 중...' : '✂️ PDF 분할'}
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

export default SplitPdf;

