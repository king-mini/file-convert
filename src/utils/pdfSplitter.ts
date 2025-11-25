import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface SplitProgress {
  current: number;
  total: number;
  status: string;
}

export type SplitMode = 'each' | 'range' | 'extract';

export interface SplitOptions {
  mode: SplitMode;
  ranges?: { start: number; end: number }[]; // 1-based
  extractPages?: number[]; // 1-based
}

const createSinglePagePdf = async (
  sourcePdf: PDFDocument,
  pageIndex: number
): Promise<Uint8Array> => {
  const newPdf = await PDFDocument.create();
  const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
  newPdf.addPage(copiedPage);
  return await newPdf.save();
};

const createRangePdf = async (
  sourcePdf: PDFDocument,
  startIndex: number,
  endIndex: number
): Promise<Uint8Array> => {
  const newPdf = await PDFDocument.create();
  const pageIndices = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i
  );
  const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));
  return await newPdf.save();
};

export const splitPdf = async (
  file: File,
  options: SplitOptions,
  onProgress?: (progress: SplitProgress) => void
): Promise<void> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const totalPages = pdfDoc.getPageCount();
  onProgress?.({ current: 0, total: totalPages, status: 'PDF 로딩 완료' });

  const zip = new JSZip();
  const baseName = file.name.replace(/\.pdf$/i, '');

  if (options.mode === 'each') {
    // 각 페이지를 개별 PDF로 분할
    for (let i = 0; i < totalPages; i++) {
      onProgress?.({
        current: i + 1,
        total: totalPages,
        status: `페이지 ${i + 1}/${totalPages} 분할 중...`,
      });

      const pdfBytes = await createSinglePagePdf(pdfDoc, i);
      const fileName = `${baseName}_page_${String(i + 1).padStart(3, '0')}.pdf`;
      zip.file(fileName, pdfBytes);
    }
  } else if (options.mode === 'range' && options.ranges) {
    // 범위별로 분할
    for (let i = 0; i < options.ranges.length; i++) {
      const range = options.ranges[i];
      const startIndex = Math.max(0, range.start - 1);
      const endIndex = Math.min(totalPages - 1, range.end - 1);

      onProgress?.({
        current: i + 1,
        total: options.ranges.length,
        status: `범위 ${i + 1}/${options.ranges.length} 생성 중...`,
      });

      const pdfBytes = await createRangePdf(pdfDoc, startIndex, endIndex);
      const fileName = `${baseName}_pages_${range.start}-${range.end}.pdf`;
      zip.file(fileName, pdfBytes);
    }
  } else if (options.mode === 'extract' && options.extractPages) {
    // 특정 페이지만 추출
    for (let i = 0; i < options.extractPages.length; i++) {
      const pageNum = options.extractPages[i];
      const pageIndex = pageNum - 1;

      if (pageIndex < 0 || pageIndex >= totalPages) continue;

      onProgress?.({
        current: i + 1,
        total: options.extractPages.length,
        status: `페이지 ${pageNum} 추출 중...`,
      });

      const pdfBytes = await createSinglePagePdf(pdfDoc, pageIndex);
      const fileName = `${baseName}_page_${String(pageNum).padStart(3, '0')}.pdf`;
      zip.file(fileName, pdfBytes);
    }
  }

  // ZIP 생성 및 다운로드
  onProgress?.({
    current: totalPages,
    total: totalPages,
    status: 'ZIP 파일 생성 중...',
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const outputFileName = `${baseName}_split.zip`;
  saveAs(zipBlob, outputFileName);

  onProgress?.({
    current: totalPages,
    total: totalPages,
    status: '완료!',
  });
};

