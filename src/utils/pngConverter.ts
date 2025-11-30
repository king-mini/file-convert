import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import i18n from '../i18n';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface ConvertOptions {
  scale: number; // 해상도 배율 (1 = 72dpi, 2 = 144dpi, etc.)
  pageRange?: { start: number; end: number }; // 1-based
  backgroundColor?: string; // 투명 배경 옵션
  password?: string;
}

export interface ConvertProgress {
  current: number;
  total: number;
  status: string;
}

export const convertPdfToPngImages = async (
  file: File,
  options: ConvertOptions,
  onProgress?: (progress: ConvertProgress) => void
): Promise<void> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: arrayBuffer,
    password: options.password,
  });
  const pdf = await loadingTask.promise;

  const totalPages = pdf.numPages;
  const start = options.pageRange?.start ?? 1;
  const end = options.pageRange?.end ?? totalPages;

  // 범위 검증
  const startPage = Math.max(1, Math.min(start, totalPages));
  const endPage = Math.max(startPage, Math.min(end, totalPages));
  const pagesToConvert = endPage - startPage + 1;

  onProgress?.({
    current: 0,
    total: pagesToConvert,
    status: i18n.t('common.status.pdfLoadingComplete'),
  });

  const zip = new JSZip();

  // 각 페이지 변환
  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    onProgress?.({
      current: pageNum - startPage + 1,
      total: pagesToConvert,
      status: i18n.t('common.status.pageConverting', { current: pageNum, total: endPage }),
    });

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: options.scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context not available');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // 배경색 설정 (투명 배경 옵션)
    if (options.backgroundColor) {
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    }).promise;

    // Canvas를 Blob으로 변환 (PNG)
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob failed'));
        },
        'image/png'
      );
    });

    // ZIP에 추가 (페이지 번호 패딩)
    const fileName = `page_${String(pageNum).padStart(3, '0')}.png`;
    zip.file(fileName, blob);
  }

  // ZIP 생성 및 다운로드
  onProgress?.({
    current: pagesToConvert,
    total: pagesToConvert,
    status: i18n.t('common.status.zipPreparing'),
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const outputFileName = file.name.replace(/\.pdf$/i, '') + '_images.zip';
  saveAs(zipBlob, outputFileName);

  onProgress?.({
    current: pagesToConvert,
    total: pagesToConvert,
    status: i18n.t('common.status.done'),
  });
};

