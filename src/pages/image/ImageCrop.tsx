import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FeatureHighlights from '../../components/FeatureHighlights';
import { formatFileSize, copyImageToClipboard } from '../../utils/imageProcessor';
import './ImageCrop.css';

type AspectRatio = 'free' | '1:1' | '4:3' | '16:9' | '3:2' | '2:3';

const aspectRatios: Record<AspectRatio, { label: string; value: number | null }> = {
  free: { label: '자유', value: null },
  '1:1': { label: '1:1', value: 1 },
  '4:3': { label: '4:3', value: 4 / 3 },
  '16:9': { label: '16:9', value: 16 / 9 },
  '3:2': { label: '3:2', value: 3 / 2 },
  '2:3': { label: '2:3', value: 2 / 3 },
};

const ImageCrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  // 이미지 원본 크기
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // 크롭 옵션
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free');
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });

  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError(t('common.validation.imageOnly'));
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError(t('common.validation.maxImageSize', { limit: 50 }));
      return;
    }

    setError(null);
    setFile(selectedFile);
    setResult(null);
    setResultBlob(null);

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);

    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      // 초기 크롭 영역 설정 (중앙 70%)
      setCropArea({ x: 15, y: 15, width: 70, height: 70 });
    };
    img.src = url;
  }, [t]);

  // 비율 변경 시 크롭 영역 조정
  useEffect(() => {
    if (!imageSize.width || !imageSize.height) return;

    const ratio = aspectRatios[aspectRatio].value;
    if (ratio === null) return;

    // 현재 크롭 영역 중심 유지하면서 비율 맞추기
    const centerX = cropArea.x + cropArea.width / 2;
    const centerY = cropArea.y + cropArea.height / 2;

    let newWidth: number;
    let newHeight: number;

    const imageRatio = imageSize.width / imageSize.height;

    if (ratio > imageRatio) {
      // 가로가 더 긴 비율
      newWidth = Math.min(80, cropArea.width);
      newHeight = (newWidth * (imageSize.width / 100)) / ratio / (imageSize.height / 100);
    } else {
      // 세로가 더 긴 비율
      newHeight = Math.min(80, cropArea.height);
      newWidth = (newHeight * (imageSize.height / 100)) * ratio / (imageSize.width / 100);
    }

    const newX = Math.max(0, Math.min(100 - newWidth, centerX - newWidth / 2));
    const newY = Math.max(0, Math.min(100 - newHeight, centerY - newHeight / 2));

    setCropArea({ x: newX, y: newY, width: newWidth, height: newHeight });
  }, [aspectRatio, imageSize]);

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

  const handleMouseDown = (e: React.MouseEvent, action: 'move' | string) => {
    e.preventDefault();
    if (action === 'move') {
      setIsDragging(true);
    } else {
      setIsResizing(action);
    }
    setDragStart({ x: e.clientX, y: e.clientY });
    setCropStart({ ...cropArea });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || (!isDragging && !isResizing)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
      const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

      if (isDragging) {
        const newX = Math.max(0, Math.min(100 - cropStart.width, cropStart.x + deltaX));
        const newY = Math.max(0, Math.min(100 - cropStart.height, cropStart.y + deltaY));
        setCropArea({ ...cropArea, x: newX, y: newY });
      } else if (isResizing) {
        const ratio = aspectRatios[aspectRatio].value;
        let newArea = { ...cropStart };

        if (isResizing.includes('e')) {
          newArea.width = Math.max(10, Math.min(100 - cropStart.x, cropStart.width + deltaX));
        }
        if (isResizing.includes('w')) {
          const newWidth = Math.max(10, Math.min(cropStart.x + cropStart.width, cropStart.width - deltaX));
          newArea.x = cropStart.x + (cropStart.width - newWidth);
          newArea.width = newWidth;
        }
        if (isResizing.includes('s')) {
          newArea.height = Math.max(10, Math.min(100 - cropStart.y, cropStart.height + deltaY));
        }
        if (isResizing.includes('n')) {
          const newHeight = Math.max(10, Math.min(cropStart.y + cropStart.height, cropStart.height - deltaY));
          newArea.y = cropStart.y + (cropStart.height - newHeight);
          newArea.height = newHeight;
        }

        // 비율 유지
        if (ratio !== null) {
          const pixelWidth = (newArea.width / 100) * imageSize.width;
          const pixelHeight = (newArea.height / 100) * imageSize.height;

          if (isResizing.includes('e') || isResizing.includes('w')) {
            const targetHeight = pixelWidth / ratio;
            newArea.height = (targetHeight / imageSize.height) * 100;
          } else {
            const targetWidth = pixelHeight * ratio;
            newArea.width = (targetWidth / imageSize.width) * 100;
          }
        }

        // 경계 체크
        newArea.x = Math.max(0, Math.min(100 - newArea.width, newArea.x));
        newArea.y = Math.max(0, Math.min(100 - newArea.height, newArea.y));

        setCropArea(newArea);
      }
    },
    [isDragging, isResizing, dragStart, cropStart, cropArea, aspectRatio, imageSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(null);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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

      const sx = (cropArea.x / 100) * img.width;
      const sy = (cropArea.y / 100) * img.height;
      const sw = (cropArea.width / 100) * img.width;
      const sh = (cropArea.height / 100) * img.height;

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(sw);
      canvas.height = Math.round(sh);
      const ctx = canvas.getContext('2d')!;
      
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('이미지 생성 실패'))),
          file.type.includes('png') ? 'image/png' : 'image/jpeg',
          0.92
        );
      });

      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultBlob(blob);
      setCopied(false);
    } catch (err) {
      console.error('Processing error:', err);
      setError(t('common.errors.process'));
    } finally {
      setProcessing(false);
    }
  }, [file, preview, cropArea, t]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;

    const link = document.createElement('a');
    link.href = result;
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const ext = file.type.includes('png') ? 'png' : 'jpg';
    link.download = `${baseName}_cropped.${ext}`;
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
    setImageSize({ width: 0, height: 0 });
    setCropArea({ x: 15, y: 15, width: 70, height: 70 });
  }, [preview, result]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!resultBlob) return;

    try {
      await copyImageToClipboard(resultBlob);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(t('common.errors.clipboard'));
    }
  }, [resultBlob, t]);

  const getCropPixelSize = () => ({
    width: Math.round((cropArea.width / 100) * imageSize.width),
    height: Math.round((cropArea.height / 100) * imageSize.height),
  });

  return (
    <div className="image-crop">
      <div className="page-header">
        <h1>{t('pages.image.imageCrop.hero.title')}</h1>
        <p>{t('pages.image.imageCrop.hero.description')}</p>
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
            <p>{t('pages.image.imageCrop.upload.hint')}</p>
            <span className="upload-hint">{t('pages.image.imageCrop.upload.support')}</span>
          </label>
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {file && !result && (
        <div className="editor">
          <div className="crop-container" ref={containerRef}>
            <img ref={imageRef} src={preview || ''} alt="원본" className="crop-image" />
            <button 
              className="image-remove-btn"
              onClick={handleNewImage}
              title={t('common.hints.chooseAnother')}
            >
              ✕
            </button>
            <div className="crop-overlay">
              <div
                className="crop-area"
                style={{
                  left: `${cropArea.x}%`,
                  top: `${cropArea.y}%`,
                  width: `${cropArea.width}%`,
                  height: `${cropArea.height}%`,
                }}
              >
                <div
                  className="crop-move"
                  onMouseDown={(e) => handleMouseDown(e, 'move')}
                />
                <div className="crop-handle nw" onMouseDown={(e) => handleMouseDown(e, 'nw')} />
                <div className="crop-handle ne" onMouseDown={(e) => handleMouseDown(e, 'ne')} />
                <div className="crop-handle sw" onMouseDown={(e) => handleMouseDown(e, 'sw')} />
                <div className="crop-handle se" onMouseDown={(e) => handleMouseDown(e, 'se')} />
                <div className="crop-handle n" onMouseDown={(e) => handleMouseDown(e, 'n')} />
                <div className="crop-handle s" onMouseDown={(e) => handleMouseDown(e, 's')} />
                <div className="crop-handle e" onMouseDown={(e) => handleMouseDown(e, 'e')} />
                <div className="crop-handle w" onMouseDown={(e) => handleMouseDown(e, 'w')} />
                <div className="crop-size-label">
                  {getCropPixelSize().width} × {getCropPixelSize().height}
                </div>
              </div>
            </div>
          </div>

          <div className="options">
            <div className="option-group">
              <label>{t('pages.image.imageCrop.options.ratio')}</label>
              <div className="ratio-buttons">
                {(Object.keys(aspectRatios) as AspectRatio[]).map((ratio) => (
                  <button
                    key={ratio}
                    className={`ratio-btn ${aspectRatio === ratio ? 'active' : ''}`}
                    onClick={() => setAspectRatio(ratio)}
                  >
                    {t(`pages.image.imageCrop.options.buttons.${ratio}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-secondary" onClick={handleNewImage}>
              {t('common.buttons.otherImage')}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleProcess}
              disabled={processing}
            >
              {processing ? t('common.status.processing') : t('pages.image.imageCrop.actions.crop')}
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="editor">
          <div className="result-container">
            <h3>
              {t('pages.image.imageCrop.panels.result', {
                width: getCropPixelSize().width,
                height: getCropPixelSize().height,
              })}
            </h3>
            <div
              className="image-container clickable"
              onClick={() => setModalImage(result)}
            >
              <img src={result} alt="자른 이미지" />
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-secondary" onClick={handleNewImage}>
              {t('common.buttons.otherImage')}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setResult(null);
                setResultBlob(null);
              }}
            >
              {t('pages.image.imageCrop.actions.recrop')}
            </button>
            <button
              className={`btn ${copied ? 'btn-copied' : 'btn-clipboard'}`}
              onClick={handleCopyToClipboard}
            >
              {copied ? t('common.buttons.copied') : t('common.buttons.copy')}
            </button>
            <button className="btn btn-success" onClick={handleDownload}>
              {t('common.buttons.save')}
            </button>
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

      <FeatureHighlights className="seo-highlights" />
    </div>
  );
};

export default ImageCrop;

