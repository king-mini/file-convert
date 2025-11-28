import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { convertImagesToPdf, createImagePreview } from '../../utils/imageToPdfConverter';
import type { ImageFile, PageSize, ConvertOptions } from '../../utils/imageToPdfConverter';
import { saveAs } from 'file-saver';
import './ImageToPdf.css';

const ImageToPdf = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

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
      alert(t('common.validation.imageOnly'));
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
  }, [t]);

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
      alert(t('common.success.pdfCreated'));
    } catch (error) {
      console.error('변환 실패:', error);
      alert(t('common.errors.convert'));
    } finally {
      setConverting(false);
      setProgress(null);
    }
  }, [images, pageSize, orientation, margin, t]);

  return (
    <div className="image-to-pdf">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.imageToPdf.hero.title')}</h1>
        <p>{t('pages.pdf.imageToPdf.hero.description')}</p>
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
        <p>{t('pages.pdf.imageToPdf.upload.hint')}</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input" className="btn btn-primary">
          {t('common.buttons.selectImages')}
        </label>
      </div>

      {/* 이미지 목록 */}
      {images.length > 0 && (
        <div className="image-list">
          <h3>{t('pages.pdf.imageToPdf.list.title', { count: images.length })}</h3>
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
                      title={t('pages.pdf.imageToPdf.list.moveUp')}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveImage(img.id, 'down')}
                      disabled={index === images.length - 1}
                      title={t('pages.pdf.imageToPdf.list.moveDown')}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleRemoveImage(img.id)}
                      className="btn-delete"
                      title={t('pages.pdf.imageToPdf.list.delete')}
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
          <h3>{t('pages.pdf.imageToPdf.options.title')}</h3>

          <div className="option-group">
            <label>{t('pages.pdf.imageToPdf.options.pageSize')}</label>
            <select value={pageSize} onChange={(e) => setPageSize(e.target.value as PageSize)}>
              <option value="A4">{t('pages.pdf.imageToPdf.options.pageSizeOptions.a4')}</option>
              <option value="Letter">{t('pages.pdf.imageToPdf.options.pageSizeOptions.letter')}</option>
              <option value="Auto">{t('pages.pdf.imageToPdf.options.pageSizeOptions.auto')}</option>
            </select>
          </div>

          <div className="option-group">
            <label>{t('pages.pdf.imageToPdf.options.orientation')}</label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
            >
              <option value="portrait">
                {t('pages.pdf.imageToPdf.options.orientationOptions.portrait')}
              </option>
              <option value="landscape">
                {t('pages.pdf.imageToPdf.options.orientationOptions.landscape')}
              </option>
            </select>
          </div>

          <div className="option-group">
            <label>
              {t('pages.pdf.imageToPdf.options.margin', { value: margin })}
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
            {converting
              ? t('pages.pdf.imageToPdf.actions.processing', {
                  current: progress?.current ?? 0,
                  total: progress?.total ?? images.length,
                })
              : t('pages.pdf.imageToPdf.actions.create')}
          </button>
        </div>
      )}

    </div>
  );
};

export default ImageToPdf;

