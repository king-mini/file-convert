import { PDFDocument, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';

export type RotationAngle = 90 | 180 | 270;

export interface RotateProgress {
  current: number;
  total: number;
  status: string;
}

export const rotatePdf = async (
  file: File,
  rotationAngle: RotationAngle,
  pageIndices: number[] | 'all',
  onProgress?: (progress: RotateProgress) => void
): Promise<void> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const totalPages = pdfDoc.getPageCount();
  onProgress?.({ current: 0, total: totalPages, status: 'PDF 로딩 완료' });

  // 회전할 페이지 결정
  const pagesToRotate =
    pageIndices === 'all'
      ? Array.from({ length: totalPages }, (_, i) => i)
      : pageIndices;

  // 각 페이지 회전
  for (let i = 0; i < pagesToRotate.length; i++) {
    const pageIndex = pagesToRotate[i];
    
    onProgress?.({
      current: i + 1,
      total: pagesToRotate.length,
      status: `페이지 ${pageIndex + 1} 회전 중...`,
    });

    const page = pdfDoc.getPage(pageIndex);
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + rotationAngle));
  }

  // PDF 저장
  onProgress?.({
    current: pagesToRotate.length,
    total: pagesToRotate.length,
    status: 'PDF 생성 중...',
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const outputFileName = file.name.replace(/\.pdf$/i, '') + '_rotated.pdf';
  saveAs(blob, outputFileName);

  onProgress?.({
    current: pagesToRotate.length,
    total: pagesToRotate.length,
    status: '완료!',
  });
};

