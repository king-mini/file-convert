import { saveAs } from 'file-saver';
import i18n from '../i18n';

export interface MergeProgress {
  current: number;
  total: number;
  status: string;
}

export interface PdfFile {
  id: string;
  file: File;
  pageCount?: number;
  password?: string;
}

export const mergePdfs = async (
  files: PdfFile[],
  onProgress?: (progress: MergeProgress) => void
): Promise<void> => {
  if (files.length === 0) {
    throw new Error(i18n.t('pages.pdf.merge.errors.noFiles'));
  }

  onProgress?.({
    current: 0,
    total: files.length,
    status: i18n.t('common.status.pdfMergeStart'),
  });

  const { PDFDocument } = await import('pdf-lib');

  // 병합된 PDF 문서 생성
  const mergedPdf = await PDFDocument.create();

  // 각 PDF 파일 처리
  for (let i = 0; i < files.length; i++) {
    onProgress?.({
      current: i + 1,
      total: files.length,
      status: i18n.t('common.status.pdfMergingFile', { fileName: files[i].file.name }),
    });

    const arrayBuffer = await files[i].file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { password: files[i].password } as any);
    const pageCount = pdf.getPageCount();

    // 모든 페이지 복사
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));

    // 페이지 수 업데이트 (상태 관리용)
    files[i].pageCount = pageCount;
  }

  // 병합된 PDF 저장
  onProgress?.({
    current: files.length,
    total: files.length,
    status: i18n.t('common.status.pdfGenerating'),
  });

  const pdfBytes = await mergedPdf.save();
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
  saveAs(blob, 'merged.pdf');

  onProgress?.({
    current: files.length,
    total: files.length,
    status: i18n.t('common.status.done'),
  });
};

export const getPageCount = async (file: File): Promise<number> => {
  try {
    const { PDFDocument } = await import('pdf-lib');
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return pdf.getPageCount();
  } catch (error) {
    console.error('페이지 수 확인 실패:', error);
    return 0;
  }
};

