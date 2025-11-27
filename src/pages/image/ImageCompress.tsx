import { useState, useCallback } from 'react';
import { formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import './ImageCompress.css';

const ImageCompress = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // 압축 옵션
  const [quality, setQuality] = useState(70);
  const [maxWidth, setMaxWidth] = useState(0); // 0 = 변경 없음
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('50MB 이하의 파일만 지원합니다.');
      return;
    }

    setError(null);
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setResult(null);
    setResultBlob(null);
    setCompressedSize(0);

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
    },
    [handleFile]
  );

  const handleProcess = useCallback(async () => {
    if (!file || !preview) return;

    setProcessing(true);
    setError(null);

    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = preview;
      });

      let targetWidth = img.width;
      let targetHeight = img.height;

      // 최대 너비 제한이 있고 이미지가 더 크면 리사이즈
      if (maxWidth > 0 && img.width > maxWidth) {
        const ratio = maxWidth / img.width;
        targetWidth = maxWidth;
        targetHeight = Math.round(img.height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d')!;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // JPEG로 압축 (PNG도 JPEG로 변환하여 용량 절감)
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('이미지 생성 실패'))),
          'image/jpeg',
          quality / 100
        );
      });

      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultBlob(blob);
      setCompressedSize(blob.size);
      setCopied(false);
    } catch (err) {
      console.error('Processing error:', err);
      setError('처리 중 오류가 발생했습니다.');
    } finally {
      setProcessing(false);
    }
  }, [file, preview, quality, maxWidth]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const link = document.createElement('a');
    link.href = result;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}_compressed.jpg`;
    link.click();
  }, [result, file]);

  const handleNewImage = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
    setFile(null);
    setPreview(null);
    setResult(null);
    setResultBlob(null);
    setError(null);
    setCopied(false);
    setOriginalSize(0);
    setCompressedSize(0);
  }, [preview, result]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!resultBlob) return;

    try {
      await copyImageToClipboard(resultBlob);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('클립보드 복사에 실패했습니다.');
    }
  }, [resultBlob]);

  const getCompressionRatio = () => {
    if (!originalSize || !compressedSize) return 0;
    return Math.round((1 - compressedSize / originalSize) * 100);
  };

  return (
    <div className="image-compress">
      <div className="page-header">
        <h1>🗜️ Image Compress</h1>
        <p>이미지 용량을 효과적으로 줄이세요</p>
      </div>

      {!file && (
        <div
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="upload-content">
            <div className="upload-icon">🖼️</div>
            <p>이미지를 드래그하거나 클릭하여 선택하세요</p>
            <span className="upload-hint">JPG, PNG, WebP (최대 50MB)</span>
          </label>
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {file && (
        <div className="editor">
          <div className="image-compare">
            <div className="image-panel">
              <h3>원본 ({formatFileSize(originalSize)})</h3>
              <div
                className="image-container clickable"
                onClick={() => preview && setModalImage(preview)}
              >
                {preview && <img src={preview} alt="원본 이미지" />}
              </div>
            </div>
            <div className="image-panel">
              <h3>
                결과
                {compressedSize > 0 && (
                  <span className="compression-badge">
                    {formatFileSize(compressedSize)} (-{getCompressionRatio()}%)
                  </span>
                )}
              </h3>
              <div
                className={`image-container ${result ? 'clickable' : ''}`}
                onClick={() => result && setModalImage(result)}
              >
                {result ? (
                  <img src={result} alt="압축된 이미지" />
                ) : (
                  <div className="placeholder">
                    {processing ? '처리 중...' : '압축 후 결과가 표시됩니다'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="options">
            <div className="option-group">
              <label>
                압축 품질: <strong>{quality}%</strong>
                <span className="quality-hint">
                  {quality >= 80 ? '고품질' : quality >= 50 ? '중간' : '저용량'}
                </span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>저용량</span>
                <span>고품질</span>
              </div>
            </div>

            <div className="option-group">
              <label>
                최대 너비:
                <strong>
                  {maxWidth === 0 ? ' 제한 없음' : ` ${maxWidth}px`}
                </strong>
              </label>
              <div className="preset-buttons">
                <button
                  className={`preset-btn ${maxWidth === 0 ? 'active' : ''}`}
                  onClick={() => setMaxWidth(0)}
                >
                  원본
                </button>
                <button
                  className={`preset-btn ${maxWidth === 1920 ? 'active' : ''}`}
                  onClick={() => setMaxWidth(1920)}
                >
                  1920px
                </button>
                <button
                  className={`preset-btn ${maxWidth === 1280 ? 'active' : ''}`}
                  onClick={() => setMaxWidth(1280)}
                >
                  1280px
                </button>
                <button
                  className={`preset-btn ${maxWidth === 800 ? 'active' : ''}`}
                  onClick={() => setMaxWidth(800)}
                >
                  800px
                </button>
              </div>
            </div>

            {compressedSize > 0 && (
              <div className="compression-stats">
                <div className="stat">
                  <span className="stat-label">원본</span>
                  <span className="stat-value">{formatFileSize(originalSize)}</span>
                </div>
                <div className="stat-arrow">→</div>
                <div className="stat">
                  <span className="stat-label">압축 후</span>
                  <span className="stat-value highlight">{formatFileSize(compressedSize)}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">절감</span>
                  <span className="stat-value success">-{getCompressionRatio()}%</span>
                </div>
              </div>
            )}
          </div>

          <div className="actions">
            <button className="btn btn-secondary" onClick={handleNewImage}>
              🖼️ 다른 이미지
            </button>
            {result && (
              <button
                className="btn btn-primary"
                onClick={handleProcess}
                disabled={processing}
              >
                🔄 다시 적용
              </button>
            )}
            {!result ? (
              <button
                className="btn btn-primary"
                onClick={handleProcess}
                disabled={processing}
              >
                {processing ? '처리 중...' : '🗜️ 압축하기'}
              </button>
            ) : (
              <>
                <button
                  className={`btn ${copied ? 'btn-copied' : 'btn-clipboard'}`}
                  onClick={handleCopyToClipboard}
                >
                  {copied ? '✓ 복사됨' : '📋 클립보드'}
                </button>
                <button className="btn btn-success" onClick={handleDownload}>
                  💾 다운로드
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalImage(null)}>
              ✕
            </button>
            <img src={modalImage} alt="확대 이미지" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompress;

