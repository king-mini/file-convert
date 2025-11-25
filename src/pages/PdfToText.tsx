import { useState, useCallback } from 'react';
import { extractTextFromPdf, downloadAsTextFile } from '../utils/textExtractor';
import type { ExtractProgress, ExtractedText } from '../utils/textExtractor';
import './PdfToText.css';

const PdfToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState<ExtractProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [extractedTexts, setExtractedTexts] = useState<ExtractedText[]>([]);

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setProgress(null);
      setExtractedTexts([]);
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

  const handleExtract = useCallback(async () => {
    if (!file) return;

    setExtracting(true);
    setProgress({ current: 0, total: 1, status: '시작 중...' });
    setExtractedTexts([]);

    try {
      const texts = await extractTextFromPdf(file, setProgress);
      setExtractedTexts(texts);
    } catch (error) {
      console.error('추출 실패:', error);
      alert('텍스트 추출 중 오류가 발생했습니다.');
    } finally {
      setExtracting(false);
    }
  }, [file]);

  const handleDownload = useCallback(() => {
    if (!file || extractedTexts.length === 0) return;
    downloadAsTextFile(file.name, extractedTexts);
  }, [file, extractedTexts]);

  const handleCopyAll = useCallback(() => {
    const fullText = extractedTexts.map((page) => page.text).join('\n\n');
    navigator.clipboard.writeText(fullText);
    alert('텍스트가 클립보드에 복사되었습니다!');
  }, [extractedTexts]);

  return (
    <div className="pdf-to-text">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>📝 PDF to Text Converter</h1>
        <p>PDF에서 텍스트를 추출하세요</p>
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

      {/* 추출 버튼 */}
      {file && !extractedTexts.length && (
        <div className="options">
          <button className="btn btn-convert" onClick={handleExtract} disabled={extracting}>
            {extracting ? '추출 중...' : '📝 텍스트 추출'}
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
            <h3>추출된 텍스트 ({extractedTexts.length} 페이지)</h3>
            <div className="result-actions">
              <button className="btn btn-secondary" onClick={handleCopyAll}>
                📋 전체 복사
              </button>
              <button className="btn btn-primary" onClick={handleDownload}>
                💾 TXT 다운로드
              </button>
            </div>
          </div>

          <div className="text-preview">
            {extractedTexts.map((page) => (
              <div key={page.pageNumber} className="text-page">
                <div className="page-number">페이지 {page.pageNumber}</div>
                <pre className="page-text">{page.text}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 광고 영역 - 하단 */}
      <div className="ad-placeholder">
        <p>[ AdSense 광고 영역 - 하단 ]</p>
      </div>
    </div>
  );
};

export default PdfToText;

