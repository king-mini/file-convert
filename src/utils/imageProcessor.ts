// 전역 타입 선언
declare global {
  interface Window {
    SelfieSegmentation: new (config: { locateFile: (file: string) => string }) => SelfieSegmentationInstance;
    piexif: PiexifModule;
  }
}

interface PiexifModule {
  load: (dataUrl: string) => ExifData;
  dump: (exifData: ExifData) => string;
  insert: (exifBytes: string, dataUrl: string) => string;
}

interface ExifData {
  '0th': Record<number, unknown>;
  Exif: Record<number, unknown>;
  GPS: Record<number, unknown>;
  Interop: Record<number, unknown>;
  '1st': Record<number, unknown>;
  thumbnail: string | null;
}

interface SelfieSegmentationInstance {
  setOptions: (options: { modelSelection: number; selfieMode: boolean }) => void;
  onResults: (callback: (results: SegmentationResults) => void) => void;
  send: (input: { image: HTMLCanvasElement }) => Promise<void>;
  close: () => void;
}

interface SegmentationResults {
  segmentationMask: HTMLCanvasElement;
  image: HTMLCanvasElement;
}

// MediaPipe 스크립트 로드
const loadMediaPipeScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.SelfieSegmentation) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('MediaPipe 로드 실패'));
    document.head.appendChild(script);
  });

// Piexif 스크립트 로드
const loadPiexifScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.piexif) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/piexifjs@1.0.6/piexif.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Piexif 로드 실패'));
    document.head.appendChild(script);
  });

// 이미지 로드 헬퍼
const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지를 불러올 수 없습니다.'));
    };
    img.src = url;
  });

// Canvas를 Blob으로 변환
const canvasToBlob = (canvas: HTMLCanvasElement, type = 'image/jpeg', quality = 0.92): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('이미지 생성에 실패했습니다.'));
      },
      type,
      quality
    );
  });

// 파일을 Data URL로 변환
const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// EXIF 데이터 추출
const extractExif = async (file: File): Promise<ExifData | null> => {
  try {
    // JPG 파일만 EXIF 지원
    if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
      return null;
    }
    
    await loadPiexifScript();
    const dataUrl = await fileToDataUrl(file);
    return window.piexif.load(dataUrl);
  } catch {
    return null;
  }
};

// EXIF 데이터 삽입
const insertExif = (dataUrl: string, exifData: ExifData): string => {
  try {
    if (!window.piexif) return dataUrl;
    const exifBytes = window.piexif.dump(exifData);
    return window.piexif.insert(exifBytes, dataUrl);
  } catch {
    return dataUrl;
  }
};

// Data URL을 Blob으로 변환
const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

// 클립보드에 이미지 복사
export const copyImageToClipboard = async (blob: Blob): Promise<void> => {
  try {
    // PNG로 변환 (클립보드는 PNG만 지원)
    if (blob.type !== 'image/png') {
      const img = new Image();
      const url = URL.createObjectURL(blob);
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      
      blob = await canvasToBlob(canvas, 'image/png', 1);
    }

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  } catch (err) {
    throw new Error('클립보드 복사에 실패했습니다.');
  }
};

// 배경 블러 처리
export const blurBackground = async (
  file: File,
  blurAmount: number,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  onProgress?.(5);

  // 1. EXIF 데이터 추출 (JPG인 경우)
  const exifData = await extractExif(file);

  // 2. MediaPipe 스크립트 로드
  await loadMediaPipeScript();
  onProgress?.(10);

  // 3. 이미지 로드
  const img = await loadImage(file);
  const { width, height } = img;
  onProgress?.(20);

  // 3. MediaPipe Selfie Segmentation 초기화
  const segmentation = new window.SelfieSegmentation({
    locateFile: (path: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${path}`,
  });

  segmentation.setOptions({
    modelSelection: 1,
    selfieMode: false,
  });

  onProgress?.(30);

  // 4. 캔버스 설정
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 5. 세그멘테이션 결과를 Promise로 래핑
  const segmentationResult = await new Promise<SegmentationResults>((resolve, reject) => {
    segmentation.onResults((results) => {
      resolve(results);
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.drawImage(img, 0, 0);

    segmentation.send({ image: tempCanvas }).catch(reject);
  });

  onProgress?.(60);

  // 6. 배경 블러 처리
  const { segmentationMask } = segmentationResult;

  // 블러된 배경 캔버스
  const blurCanvas = document.createElement('canvas');
  blurCanvas.width = width;
  blurCanvas.height = height;
  const blurCtx = blurCanvas.getContext('2d')!;
  blurCtx.filter = `blur(${blurAmount}px)`;
  blurCtx.drawImage(img, 0, 0);
  blurCtx.filter = 'none';

  onProgress?.(75);

  // 7. 마스크를 사용하여 합성
  ctx.drawImage(blurCanvas, 0, 0);

  // 마스크 캔버스 생성
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskCtx = maskCanvas.getContext('2d')!;
  maskCtx.drawImage(segmentationMask, 0, 0, width, height);

  // 원본 이미지를 마스크를 사용하여 그리기
  ctx.globalCompositeOperation = 'destination-out';
  ctx.drawImage(maskCanvas, 0, 0);

  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(img, 0, 0);

  onProgress?.(90);

  // 8. 결과 반환 (EXIF 유지)
  let resultBlob: Blob;

  if (exifData) {
    // EXIF가 있으면 Data URL로 변환 후 EXIF 삽입
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const exifInsertedDataUrl = insertExif(dataUrl, exifData);
    resultBlob = dataUrlToBlob(exifInsertedDataUrl);
  } else {
    resultBlob = await canvasToBlob(canvas);
  }

  segmentation.close();

  onProgress?.(100);

  return resultBlob;
};

export interface RemoveBackgroundOptions {
  modelSelection: 0 | 1; // 0: 일반(빠름), 1: 정밀(정확)
  edgeBlur: number; // 엣지 부드럽기 (0~10)
}

// 배경 제거
export const removeBackground = async (
  file: File,
  options: RemoveBackgroundOptions = { modelSelection: 1, edgeBlur: 0 },
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  onProgress?.(5);

  // 1. MediaPipe 스크립트 로드
  await loadMediaPipeScript();
  onProgress?.(10);

  // 2. 이미지 로드
  const img = await loadImage(file);
  const { width, height } = img;
  onProgress?.(20);

  // 3. MediaPipe Selfie Segmentation 초기화
  const segmentation = new window.SelfieSegmentation({
    locateFile: (path: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${path}`,
  });

  segmentation.setOptions({
    modelSelection: options.modelSelection,
    selfieMode: false,
  });

  onProgress?.(30);

  // 4. 캔버스 설정
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 5. 세그멘테이션 실행
  const segmentationResult = await new Promise<SegmentationResults>((resolve, reject) => {
    segmentation.onResults((results) => {
      resolve(results);
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.drawImage(img, 0, 0);

    segmentation.send({ image: tempCanvas }).catch(reject);
  });

  onProgress?.(60);

  // 6. 마스크 적용하여 배경 제거
  const { segmentationMask } = segmentationResult;

  // 마스크 캔버스 (엣지 블러 적용)
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskCtx = maskCanvas.getContext('2d')!;
  
  if (options.edgeBlur > 0) {
    maskCtx.filter = `blur(${options.edgeBlur}px)`;
  }
  maskCtx.drawImage(segmentationMask, 0, 0, width, height);
  maskCtx.filter = 'none';

  // 원본 이미지 그리기
  ctx.drawImage(img, 0, 0);

  // 마스크를 사용하여 배경 제거
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(maskCanvas, 0, 0);

  onProgress?.(90);

  // 7. PNG로 반환
  const blob = await canvasToBlob(canvas, 'image/png', 1);

  segmentation.close();
  onProgress?.(100);

  return blob;
};

// 파일 크기 포맷
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
