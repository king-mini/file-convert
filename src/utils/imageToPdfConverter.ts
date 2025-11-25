import { jsPDF } from 'jspdf';

export type PageSize = 'A4' | 'Letter' | 'Auto';

export interface ConvertOptions {
  pageSize: PageSize;
  orientation: 'portrait' | 'landscape';
  margin: number; // mm
}

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = e.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const convertImagesToPdf = async (
  images: ImageFile[],
  options: ConvertOptions,
  onProgress?: (current: number, total: number) => void
): Promise<Blob> => {
  if (images.length === 0) {
    throw new Error('이미지가 없습니다.');
  }

  // PDF 문서 생성
  const pdf = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: options.pageSize === 'Auto' ? 'a4' : options.pageSize.toLowerCase() as any,
  });

  // 페이지 크기
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = options.margin;

  // 사용 가능한 영역
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  for (let i = 0; i < images.length; i++) {
    onProgress?.(i + 1, images.length);

    const img = await loadImage(images[i].file);

    // 이미지 크기 계산
    const imgWidth = img.width;
    const imgHeight = img.height;
    const imgRatio = imgWidth / imgHeight;

    let finalWidth: number;
    let finalHeight: number;

    if (options.pageSize === 'Auto') {
      // Auto: 이미지 크기에 맞춰 페이지 생성
      finalWidth = imgWidth * 0.264583; // px to mm (96 DPI)
      finalHeight = imgHeight * 0.264583;

      if (i > 0) {
        pdf.addPage([finalWidth, finalHeight], options.orientation);
      } else {
        // 첫 페이지는 이미 생성되어 있으므로 크기만 조정
        pdf.deletePage(1);
        pdf.addPage([finalWidth, finalHeight], options.orientation);
      }

      pdf.addImage(img, 'JPEG', 0, 0, finalWidth, finalHeight);
    } else {
      // 고정 페이지 크기: 비율 유지하며 맞춤
      const pageRatio = maxWidth / maxHeight;

      if (imgRatio > pageRatio) {
        // 이미지가 더 넓음 - 너비 기준
        finalWidth = maxWidth;
        finalHeight = maxWidth / imgRatio;
      } else {
        // 이미지가 더 높음 - 높이 기준
        finalHeight = maxHeight;
        finalWidth = maxHeight * imgRatio;
      }

      // 중앙 정렬
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(img, 'JPEG', x, y, finalWidth, finalHeight);
    }
  }

  return pdf.output('blob');
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

