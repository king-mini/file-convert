import { useState, useCallback, useEffect } from 'react';
import { removeBackground, formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import type { RemoveBackgroundOptions } from '../../utils/imageProcessor';
import './BackgroundRemove.css';

const BackgroundRemove = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState(0); // 0: 원본, 1: 결과
  
  // 옵션
  const [modelSelection, setModelSelection] = useState<0 | 1>(1);
  const [edgeBlur, setEdgeBlur] = useState(3);
  const [copied, setCopied] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  // 모달 키보드 단축키 (ESC: 닫기, 좌우 방향키: 토글)
  useEffect(() => {
    if (!modalImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalImage(null);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (result) {
          setModalIndex(prev => prev === 0 ? 1 : 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage, result]);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('10MB 이하의 파일만 지원합니다.');
      return;
    }

    setError(null);
    setFile(selectedFile);
    setResult(null);

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
    if (!file) return;

    setProcessing(true);
    setProgress(0);
    setError(null);

    const options: RemoveBackgroundOptions = {
      modelSelection,
      edgeBlur,
    };

    try {
      const blob = await removeBackground(file, options, setProgress);
      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultBlob(blob);
      setCopied(false);
    } catch (err) {
      console.error('Processing error:', err);
      setError('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setProcessing(false);
    }
  }, [file, modelSelection, edgeBlur]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const link = document.createElement('a');
    link.href = result;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}_nobg.png`;
    link.click();
  }, [result, file]);

  const handleNewImage = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    if (result) URL.revokeObjectURL(result);
    setFile(null);
    setPreview(null);
    setResult(null);
    setResultBlob(null);
    setProgress(0);
    setError(null);
    setCopied(false);
  }, [preview, result]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!resultBlob) return;

    try {
      await copyImageToClipboard(resultBlob);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('클립보드 복사에 실패했습니다.');
    }
  }, [resultBlob]);

  const handleReapply = useCallback(async () => {
    if (!file) return;

    if (result) URL.revokeObjectURL(result);
    setResult(null);
    
    await handleProcess();
  }, [file, result, handleProcess]);

  return (
    <div className="background-remove">
      <div className="page-header">
        <h1>✨ Background Remove</h1>
        <p>이미지 배경을 깔끔하게 제거하세요</p>
      </div>

      {/* 파일 업로드 영역 */}
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
            <span className="upload-hint">JPG, PNG, WebP (최대 10MB)</span>
          </label>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* 이미지 편집 영역 */}
      {file && (
        <div className="editor">
          {/* 이미지 비교 뷰 */}
          <div className="image-compare">
            <div className="image-panel">
              <h3>원본</h3>
              <div 
                className="image-container clickable"
                onClick={() => {
                  if (preview) {
                    setModalIndex(0);
                    setModalImage(preview);
                  }
                }}
                title="클릭하여 크게 보기"
              >
                {preview && <img src={preview} alt="원본 이미지" />}
                <button 
                  className="image-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNewImage();
                  }}
                  title="다른 이미지 선택"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="image-panel">
              <h3>결과</h3>
              <div 
                className={`image-container transparent-bg ${result ? 'clickable' : ''}`}
                onClick={() => result && setModalImage(result)}
                title={result ? "클릭하여 크게 보기" : undefined}
              >
                {result ? (
                  <img src={result} alt="배경 제거된 이미지" />
                ) : (
                  <div className="placeholder">
                    {processing ? '처리 중...' : '배경 제거 후 결과가 표시됩니다'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 옵션 */}
          <div className="options">
            <div className="option-group">
              <label>모델 정밀도</label>
              <div className="radio-group">
                <label className={`radio-option ${modelSelection === 0 ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="model"
                    checked={modelSelection === 0}
                    onChange={() => setModelSelection(0)}
                    disabled={processing}
                  />
                  <span>⚡ 빠름</span>
                </label>
                <label className={`radio-option ${modelSelection === 1 ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="model"
                    checked={modelSelection === 1}
                    onChange={() => setModelSelection(1)}
                    disabled={processing}
                  />
                  <span>🎯 정밀</span>
                </label>
              </div>
            </div>

            <div className="option-group">
              <label>
                엣지 부드럽기: <strong>{edgeBlur}px</strong>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={edgeBlur}
                onChange={(e) => setEdgeBlur(Number(e.target.value))}
                disabled={processing}
              />
              <div className="range-labels">
                <span>날카롭게</span>
                <span>부드럽게</span>
              </div>
            </div>

            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
            </div>
            <p className="output-info">
              💡 결과는 투명 배경 PNG 파일로 저장됩니다
            </p>
          </div>

          {/* 진행률 */}
          {processing && (
            <div className="progress" aria-live="polite">
              <p>배경 제거 중...</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="progress-text">{progress}%</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="actions">
            <button className="btn btn-secondary" onClick={handleNewImage}>
              🖼️ 다른 이미지
            </button>
            {result && (
              <button
                className="btn btn-primary"
                onClick={handleReapply}
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
                {processing ? '처리 중...' : '✨ 배경 제거'}
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
                  💾 PNG 저장
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 이미지 확대 모달 */}
      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-wrapper">
              <img src={modalIndex === 0 ? preview! : result!} alt={modalIndex === 0 ? '원본' : '결과'} />
              <button className="modal-close" onClick={() => setModalImage(null)}>
                ✕
              </button>
            </div>
            {result && (
              <div className="modal-toggle-group">
                <button
                  className={`modal-toggle-btn ${modalIndex === 0 ? 'active' : ''}`}
                  onClick={() => setModalIndex(0)}
                >
                  원본
                </button>
                <button
                  className={`modal-toggle-btn ${modalIndex === 1 ? 'active' : ''}`}
                  onClick={() => setModalIndex(1)}
                >
                  결과
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundRemove;

