import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// PDF.js worker 설정 - 로컬 파일 사용
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface ConvertOptions {
  quality: number; // 0.0 ~ 1.0
  scale: number; // 해상도 배율 (1 = 72dpi, 2 = 144dpi, etc.)
  pageRange?: { start: number; end: number }; // 1-based
}

export interface ConvertProgress {
  current: number;
  total: number;
  status: string;
}

export const convertPdfToImages = async (
  file: File,
  options: ConvertOptions,
  onProgress?: (progress: ConvertProgress) => void
): Promise<void> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const totalPages = pdf.numPages;
  const start = options.pageRange?.start ?? 1;
  const end = options.pageRange?.end ?? totalPages;

  // 범위 검증
  const startPage = Math.max(1, Math.min(start, totalPages));
  const endPage = Math.max(startPage, Math.min(end, totalPages));
  const pagesToConvert = endPage - startPage + 1;

  onProgress?.({ current: 0, total: pagesToConvert, status: 'PDF 로딩 완료' });

  const zip = new JSZip();

  // 각 페이지 변환
  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    onProgress?.({
      current: pageNum - startPage + 1,
      total: pagesToConvert,
      status: `페이지 ${pageNum}/${endPage} 변환 중...`,
    });

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: options.scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context not available');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    }).promise;

    // Canvas를 Blob으로 변환
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob failed'));
        },
        'image/jpeg',
        options.quality
      );
    });

    // ZIP에 추가 (페이지 번호 패딩)
    const fileName = `page_${String(pageNum).padStart(3, '0')}.jpg`;
    zip.file(fileName, blob);
  }

  // ZIP 생성 및 다운로드
  onProgress?.({ current: pagesToConvert, total: pagesToConvert, status: 'ZIP 파일 생성 중...' });
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const outputFileName = file.name.replace(/\.pdf$/i, '') + '_images.zip';
  saveAs(zipBlob, outputFileName);

  onProgress?.({ current: pagesToConvert, total: pagesToConvert, status: '완료!' });
};

