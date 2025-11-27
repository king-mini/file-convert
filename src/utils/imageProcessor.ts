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

// iOS 감지
const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// 최대 처리 해상도 (iOS는 더 작게)
const getMaxProcessingSize = (): number => {
  return isIOS() ? 1024 : 1536;
};

// 리사이즈 비율 계산
const getResizeRatio = (width: number, height: number, maxSize: number): number => {
  const maxDim = Math.max(width, height);
  if (maxDim <= maxSize) return 1;
  return maxSize / maxDim;
};

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

// 캔버스 메모리 해제
const clearCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  canvas.width = 1;
  canvas.height = 1;
};

// 브라우저에 숨쉴 틈 주기
const yieldToMain = (): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, 0));

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
      clearCanvas(canvas);
    }

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  } catch {
    throw new Error('클립보드 복사에 실패했습니다.');
  }
};

// 배경 블러 처리 (메모리 최적화 버전)
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
  const originalWidth = img.width;
  const originalHeight = img.height;
  onProgress?.(15);

  // 4. 처리용 리사이즈 비율 계산 (마스크 생성용)
  const maxSize = getMaxProcessingSize();
  const ratio = getResizeRatio(originalWidth, originalHeight, maxSize);
  const processWidth = Math.round(originalWidth * ratio);
  const processHeight = Math.round(originalHeight * ratio);

  // 5. MediaPipe Selfie Segmentation 초기화
  const segmentation = new window.SelfieSegmentation({
    locateFile: (path: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${path}`,
  });

  // iOS는 빠른 모델 사용 (메모리 절약)
  segmentation.setOptions({
    modelSelection: isIOS() ? 0 : 1,
    selfieMode: false,
  });

  onProgress?.(25);

  // 6. 작은 크기로 세그멘테이션 수행
  const processCanvas = document.createElement('canvas');
  processCanvas.width = processWidth;
  processCanvas.height = processHeight;
  const processCtx = processCanvas.getContext('2d')!;
  processCtx.drawImage(img, 0, 0, processWidth, processHeight);

  await yieldToMain(); // 브라우저에 숨쉴 틈

  const segmentationResult = await new Promise<SegmentationResults>((resolve, reject) => {
    segmentation.onResults((results) => {
      resolve(results);
    });

    segmentation.send({ image: processCanvas }).catch(reject);
  });

  onProgress?.(50);

  // 7. 마스크를 원본 크기로 업스케일
  const { segmentationMask } = segmentationResult;
  
  // processCanvas를 마스크 캔버스로 재활용
  processCtx.clearRect(0, 0, processWidth, processHeight);
  processCanvas.width = originalWidth;
  processCanvas.height = originalHeight;
  
  // 부드러운 업스케일
  processCtx.imageSmoothingEnabled = true;
  processCtx.imageSmoothingQuality = 'high';
  processCtx.drawImage(segmentationMask, 0, 0, originalWidth, originalHeight);

  await yieldToMain();
  onProgress?.(60);

  // 8. 결과 캔버스 생성 (최종 결과용)
  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = originalWidth;
  resultCanvas.height = originalHeight;
  const resultCtx = resultCanvas.getContext('2d')!;

  // 9. 블러된 배경 그리기 (resultCanvas에)
  resultCtx.filter = `blur(${blurAmount}px)`;
  resultCtx.drawImage(img, 0, 0);
  resultCtx.filter = 'none';

  await yieldToMain();
  onProgress?.(75);

  // 10. 마스크를 사용하여 합성
  resultCtx.globalCompositeOperation = 'destination-out';
  resultCtx.drawImage(processCanvas, 0, 0);

  resultCtx.globalCompositeOperation = 'destination-over';
  resultCtx.drawImage(img, 0, 0);

  // processCanvas 메모리 해제
  clearCanvas(processCanvas);

  await yieldToMain();
  onProgress?.(90);

  // 11. 결과 반환 (EXIF 유지)
  let resultBlob: Blob;

  if (exifData) {
    const dataUrl = resultCanvas.toDataURL('image/jpeg', 0.92);
    const exifInsertedDataUrl = insertExif(dataUrl, exifData);
    resultBlob = dataUrlToBlob(exifInsertedDataUrl);
  } else {
    resultBlob = await canvasToBlob(resultCanvas);
  }

  // 정리
  segmentation.close();
  clearCanvas(resultCanvas);

  onProgress?.(100);

  return resultBlob;
};

export interface RemoveBackgroundOptions {
  modelSelection: 0 | 1; // 0: 일반(빠름), 1: 정밀(정확)
  edgeBlur: number; // 엣지 부드럽기 (0~10)
}

// 배경 제거 (메모리 최적화 버전)
export const removeBackground = async (
  file: File,
  options: RemoveBackgroundOptions = { modelSelection: 1, edgeBlur: 3 },
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  onProgress?.(5);

  // 1. MediaPipe 스크립트 로드
  await loadMediaPipeScript();
  onProgress?.(10);

  // 2. 이미지 로드
  const img = await loadImage(file);
  const originalWidth = img.width;
  const originalHeight = img.height;
  onProgress?.(15);

  // 3. 처리용 리사이즈 비율 계산
  const maxSize = getMaxProcessingSize();
  const ratio = getResizeRatio(originalWidth, originalHeight, maxSize);
  const processWidth = Math.round(originalWidth * ratio);
  const processHeight = Math.round(originalHeight * ratio);

  // 4. MediaPipe Selfie Segmentation 초기화
  const segmentation = new window.SelfieSegmentation({
    locateFile: (path: string) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${path}`,
  });

  // iOS는 항상 빠른 모델 사용 (메모리 절약)
  const actualModelSelection = isIOS() ? 0 : options.modelSelection;
  
  segmentation.setOptions({
    modelSelection: actualModelSelection,
    selfieMode: false,
  });

  onProgress?.(25);

  // 5. 작은 크기로 세그멘테이션 수행
  const processCanvas = document.createElement('canvas');
  processCanvas.width = processWidth;
  processCanvas.height = processHeight;
  const processCtx = processCanvas.getContext('2d')!;
  processCtx.drawImage(img, 0, 0, processWidth, processHeight);

  await yieldToMain();

  const segmentationResult = await new Promise<SegmentationResults>((resolve, reject) => {
    segmentation.onResults((results) => {
      resolve(results);
    });

    segmentation.send({ image: processCanvas }).catch(reject);
  });

  onProgress?.(50);

  // 6. 마스크를 원본 크기로 업스케일
  const { segmentationMask } = segmentationResult;
  
  // processCanvas를 마스크 캔버스로 재활용
  processCtx.clearRect(0, 0, processWidth, processHeight);
  processCanvas.width = originalWidth;
  processCanvas.height = originalHeight;
  
  // 엣지 블러와 함께 업스케일
  processCtx.imageSmoothingEnabled = true;
  processCtx.imageSmoothingQuality = 'high';
  if (options.edgeBlur > 0) {
    processCtx.filter = `blur(${options.edgeBlur}px)`;
  }
  processCtx.drawImage(segmentationMask, 0, 0, originalWidth, originalHeight);
  processCtx.filter = 'none';

  await yieldToMain();
  onProgress?.(70);

  // 7. 결과 캔버스 생성
  const resultCanvas = document.createElement('canvas');
  resultCanvas.width = originalWidth;
  resultCanvas.height = originalHeight;
  const resultCtx = resultCanvas.getContext('2d')!;

  // 8. 원본 이미지 그리기
  resultCtx.drawImage(img, 0, 0);

  // 9. 마스크를 사용하여 배경 제거
  resultCtx.globalCompositeOperation = 'destination-in';
  resultCtx.drawImage(processCanvas, 0, 0);

  // processCanvas 메모리 해제
  clearCanvas(processCanvas);

  await yieldToMain();
  onProgress?.(90);

  // 10. PNG로 반환
  const blob = await canvasToBlob(resultCanvas, 'image/png', 1);

  // 정리
  segmentation.close();
  clearCanvas(resultCanvas);

  onProgress?.(100);

  return blob;
};

// 파일 크기 포맷
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
