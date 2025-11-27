import { useState, useCallback, useEffect } from 'react';
import { formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import './ImageResize.css';

type ResizeMode = 'percentage' | 'dimensions';

const ImageResize = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // 원본 크기
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  // 리사이즈 옵션
  const [resizeMode, setResizeMode] = useState<ResizeMode>('percentage');
  const [percentage, setPercentage] = useState(50);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('20MB 이하의 파일만 지원합니다.');
      return;
    }

    setError(null);
    setFile(selectedFile);
    setResult(null);
    setResultBlob(null);

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);

    // 이미지 크기 가져오기
    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setTargetWidth(Math.round(img.width * 0.5));
      setTargetHeight(Math.round(img.height * 0.5));
    };
    img.src = url;
  }, []);

  // 비율 유지
  useEffect(() => {
    if (maintainAspectRatio && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      if (resizeMode === 'dimensions') {
        setTargetHeight(Math.round(targetWidth / ratio));
      }
    }
  }, [targetWidth, maintainAspectRatio, originalWidth, originalHeight, resizeMode]);

  const handleWidthChange = (width: number) => {
    setTargetWidth(width);
    if (maintainAspectRatio && originalWidth && originalHeight) {
      const ratio = originalHeight / originalWidth;
      setTargetHeight(Math.round(width * ratio));
    }
  };

  const handleHeightChange = (height: number) => {
    setTargetHeight(height);
    if (maintainAspectRatio && originalWidth && originalHeight) {
      const ratio = originalWidth / originalHeight;
      setTargetWidth(Math.round(height * ratio));
    }
  };

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

      let newWidth: number;
      let newHeight: number;

      if (resizeMode === 'percentage') {
        newWidth = Math.round(originalWidth * (percentage / 100));
        newHeight = Math.round(originalHeight * (percentage / 100));
      } else {
        newWidth = targetWidth;
        newHeight = targetHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d')!;
      
      // 고품질 리샘플링
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('이미지 생성 실패'))),
          file.type.includes('png') ? 'image/png' : 'image/jpeg',
          quality / 100
        );
      });

      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultBlob(blob);
      setCopied(false);
    } catch (err) {
      console.error('Processing error:', err);
      setError('처리 중 오류가 발생했습니다.');
    } finally {
      setProcessing(false);
    }
  }, [file, preview, resizeMode, percentage, targetWidth, targetHeight, originalWidth, originalHeight, quality]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const link = document.createElement('a');
    link.href = result;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const ext = file.type.includes('png') ? 'png' : 'jpg';
    link.download = `${baseName}_resized.${ext}`;
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
    setOriginalWidth(0);
    setOriginalHeight(0);
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

  const getResultDimensions = () => {
    if (resizeMode === 'percentage') {
      return {
        width: Math.round(originalWidth * (percentage / 100)),
        height: Math.round(originalHeight * (percentage / 100)),
      };
    }
    return { width: targetWidth, height: targetHeight };
  };

  return (
    <div className="image-resize">
      <div className="page-header">
        <h1>📐 Image Resize</h1>
        <p>이미지 크기를 자유롭게 조정하세요</p>
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
            <span className="upload-hint">JPG, PNG, WebP (최대 20MB)</span>
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
              <h3>원본 ({originalWidth} × {originalHeight})</h3>
              <div
                className="image-container clickable"
                onClick={() => preview && setModalImage(preview)}
              >
                {preview && <img src={preview} alt="원본 이미지" />}
              </div>
            </div>
            <div className="image-panel">
              <h3>결과 ({getResultDimensions().width} × {getResultDimensions().height})</h3>
              <div
                className={`image-container ${result ? 'clickable' : ''}`}
                onClick={() => result && setModalImage(result)}
              >
                {result ? (
                  <img src={result} alt="리사이즈된 이미지" />
                ) : (
                  <div className="placeholder">
                    {processing ? '처리 중...' : '크기 조정 후 결과가 표시됩니다'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="options">
            <div className="option-group">
              <label>크기 조정 방식</label>
              <div className="radio-group">
                <label className={`radio-option ${resizeMode === 'percentage' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    checked={resizeMode === 'percentage'}
                    onChange={() => setResizeMode('percentage')}
                  />
                  <span>📊 비율</span>
                </label>
                <label className={`radio-option ${resizeMode === 'dimensions' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    checked={resizeMode === 'dimensions'}
                    onChange={() => setResizeMode('dimensions')}
                  />
                  <span>📏 직접 입력</span>
                </label>
              </div>
            </div>

            {resizeMode === 'percentage' ? (
              <div className="option-group">
                <label>
                  크기: <strong>{percentage}%</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                />
                <div className="range-labels">
                  <span>10%</span>
                  <span>200%</span>
                </div>
              </div>
            ) : (
              <div className="dimension-inputs">
                <div className="dimension-input">
                  <label>너비 (px)</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    min="1"
                    max="10000"
                  />
                </div>
                <div className="dimension-link">
                  <button
                    className={`link-btn ${maintainAspectRatio ? 'active' : ''}`}
                    onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                    title={maintainAspectRatio ? '비율 고정 해제' : '비율 고정'}
                  >
                    {maintainAspectRatio ? '🔗' : '⛓️‍💥'}
                  </button>
                </div>
                <div className="dimension-input">
                  <label>높이 (px)</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    min="1"
                    max="10000"
                    disabled={maintainAspectRatio}
                  />
                </div>
              </div>
            )}

            <div className="option-group">
              <label>
                품질: <strong>{quality}%</strong>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>낮음</span>
                <span>높음</span>
              </div>
            </div>

            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">
                {formatFileSize(file.size)}
                {resultBlob && ` → ${formatFileSize(resultBlob.size)}`}
              </span>
            </div>
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
                {processing ? '처리 중...' : '📐 크기 조정'}
              </button>
            ) : (
              <>
                <button
                  className={`btn ${copied ? 'btn-copied' : 'btn-clipboard'}`}
                  onClick={handleCopyToClipboard}
                >
                  {copied ? '✓ 복사됨' : '📋 복사'}
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

export default ImageResize;

