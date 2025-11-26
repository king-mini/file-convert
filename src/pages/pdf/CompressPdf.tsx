import { useState, useCallback } from 'react';
import { compressPdf, formatFileSize } from '../../utils/pdfCompressor';
import type { CompressOptions, CompressProgress } from '../../utils/pdfCompressor';
import './CompressPdf.css';

type CompressionLevel = 'low' | 'medium' | 'high' | 'extreme';

const compressionPresets: Record<CompressionLevel, CompressOptions> = {
  low: { quality: 0.9, scale: 2 },
  medium: { quality: 0.7, scale: 1.5 },
  high: { quality: 0.5, scale: 1, maxWidth: 1600 },
  extreme: { quality: 0.3, scale: 0.8, maxWidth: 1200 },
};

const CompressPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState<CompressProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // 압축 옵션
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');

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

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setCompressing(true);
    setProgress({ current: 0, total: 1, status: '시작 중...', originalSize: file.size });

    const options = compressionPresets[compressionLevel];

    try {
      await compressPdf(file, options, setProgress);
      alert('PDF 압축이 완료되었습니다!');
    } catch (error) {
      console.error('압축 실패:', error);
      alert('압축 중 오류가 발생했습니다.');
    } finally {
      setCompressing(false);
    }
  }, [file, compressionLevel]);

  return (
    <div className="compress-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>📦 Compress PDF</h1>
        <p>PDF 파일 크기를 압축하세요</p>
      </div>

      {/* 광고 영역 - 상단 */}
      <div className="ad-placeholder">
        <p>[ AdSense 광고 영역 - 상단 ]</p>
      </div>

      {/* 경고 메시지 */}
      <div className="warning-box">
        <span className="warning-icon">⚠️</span>
        <div className="warning-content">
          <strong>주의사항</strong>
          <p>압축 시 텍스트 선택 및 복사 기능이 제거됩니다. (이미지 기반 PDF로 변환)</p>
        </div>
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
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-size">원본 크기: {formatFileSize(file.size)}</span>
              </div>
              <button className="btn-remove" onClick={() => setFile(null)}>
                ✕
              </button>
            </div>
          </>
        )}
      </div>

      {/* 압축 옵션 */}
      {file && (
        <div className="options">
          <h3>압축 수준</h3>

          <div className="compression-levels">
            <button
              className={`level-btn ${compressionLevel === 'low' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('low')}
              disabled={compressing}
            >
              <span className="level-icon">🟢</span>
              <span className="level-title">낮음</span>
              <span className="level-desc">품질 우선 (90%)</span>
              <span className="level-info">약 20-30% 압축</span>
            </button>
            <button
              className={`level-btn ${compressionLevel === 'medium' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('medium')}
              disabled={compressing}
            >
              <span className="level-icon">🟡</span>
              <span className="level-title">중간</span>
              <span className="level-desc">균형 (70%)</span>
              <span className="level-info">약 40-60% 압축</span>
            </button>
            <button
              className={`level-btn ${compressionLevel === 'high' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('high')}
              disabled={compressing}
            >
              <span className="level-icon">🟠</span>
              <span className="level-title">높음</span>
              <span className="level-desc">크기 우선 (50%)</span>
              <span className="level-info">약 60-80% 압축</span>
            </button>
            <button
              className={`level-btn ${compressionLevel === 'extreme' ? 'active' : ''}`}
              onClick={() => setCompressionLevel('extreme')}
              disabled={compressing}
            >
              <span className="level-icon">🔴</span>
              <span className="level-title">최대</span>
              <span className="level-desc">최소 크기 (30%)</span>
              <span className="level-info">약 80-90% 압축</span>
            </button>
          </div>

          <button className="btn btn-convert" onClick={handleCompress} disabled={compressing}>
            {compressing ? '압축 중...' : '📦 PDF 압축'}
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
          <div className="progress-info">
            <p className="progress-text">
              {progress.current} / {progress.total} 페이지
            </p>
            {progress.originalSize && progress.currentSize && (
              <p className="size-info">
                {formatFileSize(progress.originalSize)} → {formatFileSize(progress.currentSize)}
              </p>
            )}
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

export default CompressPdf;

