import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface CompressOptions {
  quality: number; // 0.1 ~ 1.0
  scale: number; // 해상도 배율 (낮을수록 더 압축)
  maxWidth?: number; // 최대 너비 (px), undefined면 제한 없음
  maxHeight?: number; // 최대 높이 (px), undefined면 제한 없음
}

export interface CompressProgress {
  current: number;
  total: number;
  status: string;
  originalSize?: number;
  currentSize?: number;
}

const compressImage = async (
  canvas: HTMLCanvasElement,
  quality: number,
  maxWidth?: number,
  maxHeight?: number
): Promise<Blob> => {
  let finalCanvas = canvas;

  // 크기 제한이 있는 경우 리사이즈
  if (maxWidth || maxHeight) {
    const width = canvas.width;
    const height = canvas.height;
    let newWidth = width;
    let newHeight = height;

    if (maxWidth && width > maxWidth) {
      newWidth = maxWidth;
      newHeight = (height * maxWidth) / width;
    }

    if (maxHeight && newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = (width * maxHeight) / height;
    }

    if (newWidth !== width || newHeight !== height) {
      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = newWidth;
      resizedCanvas.height = newHeight;
      const ctx = resizedCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
        finalCanvas = resizedCanvas;
      }
    }
  }

  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas to Blob failed'));
      },
      'image/jpeg',
      quality
    );
  });
};

export const compressPdf = async (
  file: File,
  options: CompressOptions,
  onProgress?: (progress: CompressProgress) => void
): Promise<void> => {
  const originalSize = file.size;

  // 원본 PDF 로드
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const totalPages = pdf.numPages;
  onProgress?.({
    current: 0,
    total: totalPages,
    status: 'PDF 로딩 완료',
    originalSize,
  });

  // 새 PDF 문서 생성
  const compressedPdf = await PDFDocument.create();

  let totalCompressedSize = 0;

  // 각 페이지 압축
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    onProgress?.({
      current: pageNum,
      total: totalPages,
      status: `페이지 ${pageNum}/${totalPages} 압축 중...`,
      originalSize,
      currentSize: totalCompressedSize,
    });

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: options.scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context not available');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // 페이지 렌더링
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    }).promise;

    // 이미지 압축
    const imageBlob = await compressImage(
      canvas,
      options.quality,
      options.maxWidth,
      options.maxHeight
    );

    totalCompressedSize += imageBlob.size;

    // 압축된 이미지를 PDF에 추가
    const imageBytes = await imageBlob.arrayBuffer();
    const image = await compressedPdf.embedJpg(new Uint8Array(imageBytes));

    const pdfPage = compressedPdf.addPage([image.width, image.height]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  // 압축된 PDF 저장
  onProgress?.({
    current: totalPages,
    total: totalPages,
    status: 'PDF 생성 중...',
    originalSize,
    currentSize: totalCompressedSize,
  });

  const pdfBytes = await compressedPdf.save();
  const finalSize = pdfBytes.length;
  const compressionRatio = ((1 - finalSize / originalSize) * 100).toFixed(1);

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const outputFileName = file.name.replace(/\.pdf$/i, '') + '_compressed.pdf';
  saveAs(blob, outputFileName);

  onProgress?.({
    current: totalPages,
    total: totalPages,
    status: `완료! (${compressionRatio}% 압축)`,
    originalSize,
    currentSize: finalSize,
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

