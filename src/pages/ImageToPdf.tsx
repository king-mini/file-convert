import { useState, useCallback } from 'react';
import { convertImagesToPdf, createImagePreview } from '../utils/imageToPdfConverter';
import type { ImageFile, PageSize, ConvertOptions } from '../utils/imageToPdfConverter';
import { saveAs } from 'file-saver';
import './ImageToPdf.css';

const ImageToPdf = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // 변환 옵션
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState(10);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    const newImages: ImageFile[] = [];

    for (const file of imageFiles) {
      try {
        const preview = await createImagePreview(file);
        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview,
        });
      } catch (error) {
        console.error('이미지 로딩 실패:', error);
      }
    }

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleMoveImage = useCallback((id: string, direction: 'up' | 'down') => {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const newImages = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      return newImages;
    });
  }, []);

  const handleConvert = useCallback(async () => {
    if (images.length === 0) return;

    setConverting(true);
    setProgress({ current: 0, total: images.length });

    const options: ConvertOptions = {
      pageSize,
      orientation,
      margin,
    };

    try {
      const blob = await convertImagesToPdf(
        images,
        options,
        (current, total) => setProgress({ current, total })
      );

      saveAs(blob, 'converted_images.pdf');
      alert('PDF 생성이 완료되었습니다!');
    } catch (error) {
      console.error('변환 실패:', error);
      alert('변환 중 오류가 발생했습니다.');
    } finally {
      setConverting(false);
      setProgress(null);
    }
  }, [images, pageSize, orientation, margin]);

  return (
    <div className="image-to-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>🖼️ Image to PDF Converter</h1>
        <p>여러 이미지를 하나의 PDF로 변환하세요</p>
      </div>

      {/* 광고 영역 - 상단 */}
      <div className="ad-placeholder">
        <p>[ AdSense 광고 영역 - 상단 ]</p>
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
        <div className="upload-icon">🖼️</div>
        <p>이미지 파일을 드래그하거나 클릭하여 선택 (JPG, PNG, GIF, WebP)</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn btn-primary">
          이미지 선택
        </label>
      </div>

      {/* 이미지 목록 */}
      {images.length > 0 && (
        <div className="image-list">
          <h3>선택된 이미지 ({images.length}개)</h3>
          <div className="images-grid">
            {images.map((img, index) => (
              <div key={img.id} className="image-item">
                <img src={img.preview} alt={`Preview ${index + 1}`} />
                <div className="image-overlay">
                  <span className="image-number">{index + 1}</span>
                  <div className="image-actions">
                    <button
                      onClick={() => handleMoveImage(img.id, 'up')}
                      disabled={index === 0}
                      title="위로"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveImage(img.id, 'down')}
                      disabled={index === images.length - 1}
                      title="아래로"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleRemoveImage(img.id)}
                      className="btn-delete"
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 변환 옵션 */}
      {images.length > 0 && (
        <div className="options">
          <h3>변환 옵션</h3>

          <div className="option-group">
            <label>페이지 크기</label>
            <select value={pageSize} onChange={(e) => setPageSize(e.target.value as PageSize)}>
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
              <option value="Auto">자동 (이미지 크기에 맞춤)</option>
            </select>
          </div>

          <div className="option-group">
            <label>페이지 방향</label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
            >
              <option value="portrait">세로 (Portrait)</option>
              <option value="landscape">가로 (Landscape)</option>
            </select>
          </div>

          <div className="option-group">
            <label>
              여백: <strong>{margin}mm</strong>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value))}
              disabled={converting || pageSize === 'Auto'}
            />
          </div>

          <button className="btn btn-convert" onClick={handleConvert} disabled={converting}>
            {converting ? `변환 중... (${progress?.current}/${progress?.total})` : '📄 PDF 생성'}
          </button>
        </div>
      )}

      {/* 광고 영역 - 하단 */}
      <div className="ad-placeholder">
        <p>[ AdSense 광고 영역 - 하단 ]</p>
      </div>
    </div>
  );
};

export default ImageToPdf;

