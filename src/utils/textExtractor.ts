import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export interface ExtractProgress {
  current: number;
  total: number;
  status: string;
}

export interface ExtractedText {
  pageNumber: number;
  text: string;
}

export const extractTextFromPdf = async (
  file: File,
  onProgress?: (progress: ExtractProgress) => void
): Promise<ExtractedText[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const totalPages = pdf.numPages;
  onProgress?.({ current: 0, total: totalPages, status: 'PDF 로딩 완료' });

  const extractedTexts: ExtractedText[] = [];

  // 각 페이지에서 텍스트 추출
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    onProgress?.({
      current: pageNum,
      total: totalPages,
      status: `페이지 ${pageNum}/${totalPages} 텍스트 추출 중...`,
    });

    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    
    // 텍스트 아이템들을 문자열로 결합
    const text = textContent.items
      .map((item: any) => item.str)
      .join(' ')
      .trim();

    extractedTexts.push({
      pageNumber: pageNum,
      text: text || '(텍스트 없음)',
    });
  }

  onProgress?.({ current: totalPages, total: totalPages, status: '추출 완료!' });

  return extractedTexts;
};

export const downloadAsTextFile = (
  fileName: string,
  extractedTexts: ExtractedText[]
): void => {
  // 페이지별로 구분하여 텍스트 생성
  const fullText = extractedTexts
    .map(
      (page) =>
        `========== 페이지 ${page.pageNumber} ==========\n\n${page.text}\n\n`
    )
    .join('');

  const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
  const outputFileName = fileName.replace(/\.pdf$/i, '') + '.txt';
  saveAs(blob, outputFileName);
};

