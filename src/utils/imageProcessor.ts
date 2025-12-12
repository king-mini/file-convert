// 전역 타입 선언
declare global {
  interface Window {
    SelfieSegmentation: new (config: { locateFile: (file: string) => string }) => SelfieSegmentationInstance;
    FaceDetection: new (config: { locateFile: (file: string) => string }) => FaceDetectionInstance;
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

interface FaceDetectionInstance {
  setOptions: (options: { modelSelection: number; minDetectionConfidence: number }) => void;
  onResults: (callback: (results: FaceDetectionResults) => void) => void;
  send: (input: { image: HTMLCanvasElement }) => Promise<void>;
  close: () => void;
}

interface FaceDetectionResults {
  detections: Detection[];
  image: HTMLCanvasElement;
}

interface Detection {
  boundingBox: {
    xCenter: number;
    yCenter: number;
    width: number;
    height: number;
    rotation: number;
  };
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
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1.1675466837/selfie_segmentation.js';
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

// FaceDetection 스크립트 로드
const loadFaceDetectionScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.FaceDetection) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/face_detection.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('FaceDetection 로드 실패'));
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

// EXIF 데이터 삽입 (Orientation은 1로 리셋 - 브라우저가 이미 회전 적용함)
const insertExif = (dataUrl: string, exifData: ExifData): string => {
  try {
    if (!window.piexif) return dataUrl;

    // Orientation을 1(정상)로 설정 - 브라우저가 이미 회전을 적용했으므로
    if (exifData['0th']) {
      exifData['0th'][274] = 1; // 274 = Orientation 태그
    }

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

// Canvas filter 지원 여부 확인
const supportsCanvasFilter = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    // iOS Safari는 filter 속성이 있지만 작동하지 않음
    // 실제로 적용되는지 테스트
    return typeof ctx.filter === 'string' && !isIOS();
  } catch {
    return false;
  }
};

// iOS fallback: ImageData 직접 조작 StackBlur
const applyBlurFallback = (
  canvas: HTMLCanvasElement,
  radius: number
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // 블러 반경 제한
  const r = Math.min(Math.max(1, Math.round(radius)), 100);

  // 원본 이미지 데이터 가져오기
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // 복사본 생성 (읽기용)
  const copy = new Uint8ClampedArray(pixels);

  const wm = width - 1;
  const hm = height - 1;
  const div = r + r + 1;

  // 수평 블러
  for (let y = 0; y < height; y++) {
    let rSum = 0, gSum = 0, bSum = 0, aSum = 0;

    // 초기 윈도우 합계
    for (let i = -r; i <= r; i++) {
      const x = Math.min(wm, Math.max(0, i));
      const idx = (y * width + x) * 4;
      rSum += copy[idx];
      gSum += copy[idx + 1];
      bSum += copy[idx + 2];
      aSum += copy[idx + 3];
    }

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      pixels[idx] = (rSum / div) | 0;
      pixels[idx + 1] = (gSum / div) | 0;
      pixels[idx + 2] = (bSum / div) | 0;
      pixels[idx + 3] = (aSum / div) | 0;

      // 윈도우 슬라이드: 왼쪽 픽셀 빼고 오른쪽 픽셀 추가
      const leftX = Math.max(0, x - r);
      const rightX = Math.min(wm, x + r + 1);
      const leftIdx = (y * width + leftX) * 4;
      const rightIdx = (y * width + rightX) * 4;

      rSum += copy[rightIdx] - copy[leftIdx];
      gSum += copy[rightIdx + 1] - copy[leftIdx + 1];
      bSum += copy[rightIdx + 2] - copy[leftIdx + 2];
      aSum += copy[rightIdx + 3] - copy[leftIdx + 3];
    }
  }

  // 수평 블러 결과를 복사본에 저장
  copy.set(pixels);

  // 수직 블러
  for (let x = 0; x < width; x++) {
    let rSum = 0, gSum = 0, bSum = 0, aSum = 0;

    // 초기 윈도우 합계
    for (let i = -r; i <= r; i++) {
      const y = Math.min(hm, Math.max(0, i));
      const idx = (y * width + x) * 4;
      rSum += copy[idx];
      gSum += copy[idx + 1];
      bSum += copy[idx + 2];
      aSum += copy[idx + 3];
    }

    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      pixels[idx] = (rSum / div) | 0;
      pixels[idx + 1] = (gSum / div) | 0;
      pixels[idx + 2] = (bSum / div) | 0;
      pixels[idx + 3] = (aSum / div) | 0;

      // 윈도우 슬라이드
      const topY = Math.max(0, y - r);
      const bottomY = Math.min(hm, y + r + 1);
      const topIdx = (topY * width + x) * 4;
      const bottomIdx = (bottomY * width + x) * 4;

      rSum += copy[bottomIdx] - copy[topIdx];
      gSum += copy[bottomIdx + 1] - copy[topIdx + 1];
      bSum += copy[bottomIdx + 2] - copy[topIdx + 2];
      aSum += copy[bottomIdx + 3] - copy[topIdx + 3];
    }
  }

  // 결과 적용
  ctx.putImageData(imageData, 0, 0);
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
  let step = 'init';

  try {
    onProgress?.(5);

    // 1. EXIF 데이터 추출 (JPG인 경우)
    step = 'extractExif';
    const exifData = await extractExif(file);

    // 2. MediaPipe 스크립트 로드
    step = 'loadMediaPipe';
    await loadMediaPipeScript();
    onProgress?.(10);

    // 3. 이미지 로드
    step = 'loadImage';
    const img = await loadImage(file);
    const originalWidth = img.width;
    const originalHeight = img.height;
    onProgress?.(15);

    // 4. 처리용 리사이즈 비율 계산 (마스크 생성용)
    step = 'calcResize';
    const maxSize = getMaxProcessingSize();
    const ratio = getResizeRatio(originalWidth, originalHeight, maxSize);
    const processWidth = Math.round(originalWidth * ratio);
    const processHeight = Math.round(originalHeight * ratio);

    // 5. MediaPipe Selfie Segmentation 초기화
    step = 'initSegmentation';
    const segmentation = new window.SelfieSegmentation({
      locateFile: (path: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1.1675466837/${path}`,
    });

    // iOS는 빠른 모델 사용 (메모리 절약)
    segmentation.setOptions({
      modelSelection: isIOS() ? 0 : 1,
      selfieMode: false,
    });

    onProgress?.(25);

    // 6. 작은 크기로 세그멘테이션 수행
    step = 'createProcessCanvas';
    const processCanvas = document.createElement('canvas');
    processCanvas.width = processWidth;
    processCanvas.height = processHeight;
    const processCtx = processCanvas.getContext('2d')!;
    processCtx.drawImage(img, 0, 0, processWidth, processHeight);

    await yieldToMain(); // 브라우저에 숨쉴 틈

    step = 'runSegmentation';
    const segmentationResult = await new Promise<SegmentationResults>((resolve, reject) => {
      segmentation.onResults((results) => {
        resolve(results);
      });

      segmentation.send({ image: processCanvas }).catch(reject);
    });

    onProgress?.(50);

    // 7. 마스크를 원본 크기로 업스케일
    step = 'upscaleMask';
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
    step = 'createResultCanvas';
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = originalWidth;
    resultCanvas.height = originalHeight;
    const resultCtx = resultCanvas.getContext('2d')!;

    // 9. 블러된 배경 그리기 (resultCanvas에)
    step = 'applyBlur';
    const useCanvasFilter = supportsCanvasFilter();


    if (useCanvasFilter) {
      // PC/Android: Canvas filter 사용 (빠름)
      resultCtx.filter = `blur(${blurAmount}px)`;
      resultCtx.drawImage(img, 0, 0);
      resultCtx.filter = 'none';
    } else {
      // iOS: 축소-확대 방식 블러
      resultCtx.drawImage(img, 0, 0);
      applyBlurFallback(resultCanvas, blurAmount);
    }

    await yieldToMain();
    onProgress?.(75);

    // 10. 마스크를 사용하여 합성
    step = 'compositeImages';
    resultCtx.globalCompositeOperation = 'destination-out';
    resultCtx.drawImage(processCanvas, 0, 0);

    resultCtx.globalCompositeOperation = 'destination-over';
    resultCtx.drawImage(img, 0, 0);

    // processCanvas 메모리 해제
    clearCanvas(processCanvas);

    await yieldToMain();
    onProgress?.(90);

    // 11. 결과 반환 (EXIF 유지, Orientation은 1로 리셋)
    step = 'createResult';
    let resultBlob: Blob;

    if (exifData) {
      // EXIF 보존 (Orientation만 1로 리셋)
      const dataUrl = resultCanvas.toDataURL('image/jpeg', 0.92);
      const exifInsertedDataUrl = insertExif(dataUrl, exifData);
      resultBlob = dataUrlToBlob(exifInsertedDataUrl);
    } else {
      resultBlob = await canvasToBlob(resultCanvas);
    }

    // 정리
    step = 'cleanup';
    segmentation.close();
    clearCanvas(resultCanvas);

    onProgress?.(100);

    return resultBlob;
  } catch (err) {
    // 디버그: step 정보 포함
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`[Step: ${step}] ${message}`);
  }
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
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1.1675466837/${path}`,
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

// 모자이크 처리 (픽셀화)
const pixelateCanvas = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  blockSize: number
) => {
  if (blockSize <= 1) return;

  // 정수형으로 변환하여 경계 문제 방지
  const startX = Math.floor(x);
  const startY = Math.floor(y);
  const w = Math.floor(width);
  const h = Math.floor(height);

  // 패딩을 주어 경계선이 짤리지 않게 함
  const sampleW = w + (blockSize - (w % blockSize));
  const sampleH = h + (blockSize - (h % blockSize));

  try {
    // 1. 해당 영역을 작게 그림 (다운샘플링)
    const tempCanvas = document.createElement('canvas');
    const scaledW = Math.ceil(sampleW / blockSize);
    const scaledH = Math.ceil(sampleH / blockSize);
    tempCanvas.width = scaledW;
    tempCanvas.height = scaledH;

    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // 부드러운 보간 끄기 (픽셀화 효과 극대화)
    tempCtx.imageSmoothingEnabled = false;

    // 원본의 해당 영역을 축소해서 그림
    tempCtx.drawImage(
      ctx.canvas,
      startX, startY, w, h,
      0, 0, scaledW, scaledH
    );

    // 2. 다시 크게 그림 (업샘플링)
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      tempCanvas,
      0, 0, scaledW, scaledH,
      startX, startY, w, h
    );
    ctx.imageSmoothingEnabled = true; // 복구

  } catch (e) {
    console.error('Pixelate failed:', e);
  }
};

// 얼굴 감지 및 처리 공통 로직
const processFace = async (
  file: File,
  effectType: 'blur' | 'pixelate',
  strength: number,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  let step = 'init';
  try {
    onProgress?.(5);

    // 1. EXIF 및 이미지 로드
    step = 'loadResources';
    const exifData = await extractExif(file);
    await loadFaceDetectionScript();
    const img = await loadImage(file);
    onProgress?.(20);

    const width = img.width;
    const height = img.height;

    // 2. 처리용 캔버스 (FaceDetection은 큰 이미지도 잘 처리하지만, 너무 크면 느림)
    // 적당히 리사이즈해서 감지 성능 확보
    step = 'prepareDetection';
    const detectMaxSize = 1024; // 감지용 최대 크기
    const ratio = getResizeRatio(width, height, detectMaxSize);
    const detectWidth = Math.round(width * ratio);
    const detectHeight = Math.round(height * ratio);

    const detectCanvas = document.createElement('canvas');
    detectCanvas.width = detectWidth;
    detectCanvas.height = detectHeight;
    const detectCtx = detectCanvas.getContext('2d')!;
    detectCtx.drawImage(img, 0, 0, detectWidth, detectHeight);

    // 3. FaceDetection 초기화
    step = 'initFaceDetection';
    const faceDetection = new window.FaceDetection({
      locateFile: (path: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/${path}`,
    });

    faceDetection.setOptions({
      modelSelection: 1, // 0: short-range, 1: full-range (더 정확)
      minDetectionConfidence: 0.5,
    });

    onProgress?.(40);

    // 4. 감지 실행
    step = 'runDetection';

    // 모듈 초기화 확인
    if (!faceDetection.send) {
      throw new Error('FaceDetection module not fully initialized');
    }

    const results = await new Promise<FaceDetectionResults>((resolve, reject) => {
      faceDetection.onResults(resolve);

      // 타임아웃 설정 (10초)
      const timeoutId = setTimeout(() => {
        reject(new Error('Detection timed out (10s)'));
      }, 10000);

      faceDetection.send({ image: detectCanvas })
        .then(() => clearTimeout(timeoutId))
        .catch((e) => {
          clearTimeout(timeoutId);
          reject(new Error(`FaceDetection send failed: ${e.message}`));
        });
    });

    onProgress?.(60);

    // 5. 결과 적용
    step = 'applyEffect';
    const resultCanvas = document.createElement('canvas');
    resultCanvas.width = width;
    resultCanvas.height = height;
    const resultCtx = resultCanvas.getContext('2d')!;

    // 원본 그리기
    resultCtx.drawImage(img, 0, 0);

    if (results.detections.length > 0) {
      // 얼굴 영역 처리
      for (const detection of results.detections) {
        const box = detection.boundingBox;

        // 정규화된 좌표(0~1)를 픽셀 좌료로 변환
        // MediaPipe FaceDetection의 boundingBox는 xCenter, yCenter, width, height를 제공
        // width, height, xCenter, yCenter 모두 0~1 정규화 값임

        const w = box.width * width;
        const h = box.height * height;
        const x = (box.xCenter * width) - (w / 2);
        const y = (box.yCenter * height) - (h / 2);

        // 영역 보정 (약간 더 넓게 잡기)
        const padding = 0.2; // 20% 여유
        const padW = w * padding;
        const padH = h * padding;

        const finalX = Math.max(0, x - padW);
        const finalY = Math.max(0, y - padH);
        const finalW = Math.min(width - finalX, w + (padW * 2));
        const finalH = Math.min(height - finalY, h + (padH * 2));

        if (effectType === 'blur') {
          // 블러 처리 (해당 영역만 추출 -> 블러 -> 다시 그리기)
          // 캔버스 클리핑 사용 (타원형 등 가능하지만 우선 사각형 적용)
          const regionCanvas = document.createElement('canvas');
          regionCanvas.width = finalW;
          regionCanvas.height = finalH;
          const regionCtx = regionCanvas.getContext('2d')!;
          regionCtx.drawImage(resultCanvas, finalX, finalY, finalW, finalH, 0, 0, finalW, finalH);

          // 블러 적용
          if (supportsCanvasFilter()) {
            regionCtx.filter = `blur(${strength}px)`;
            regionCtx.drawImage(regionCanvas, 0, 0); // 자기 자신 위에 덮어쓰기 (효과 적용) -> 안됨, filter는 draw할 때 적용

            // 임시 캔버스 필요
            const tempC = document.createElement('canvas');
            tempC.width = finalW;
            tempC.height = finalH;
            const tempCtx = tempC.getContext('2d')!;
            tempCtx.filter = `blur(${strength}px)`;
            tempCtx.drawImage(regionCanvas, 0, 0);

            // 원본에 덮어쓰기
            resultCtx.drawImage(tempC, finalX, finalY);
          } else {
            // iOS fallback
            applyBlurFallback(regionCanvas, strength);
            resultCtx.drawImage(regionCanvas, finalX, finalY);
          }
        } else if (effectType === 'pixelate') {
          // 모자이크 처리 (blockSize = strength)
          // strength가 1~50 범위로 들어옴. 10~50 정도의 블록 사이즈 적절
          const blockSize = Math.max(5, strength);
          pixelateCanvas(resultCtx, finalX, finalY, finalW, finalH, blockSize);
        }
      }
    }

    onProgress?.(80);

    // 6. 결과 반환
    step = 'createBlob';
    let resultBlob: Blob;
    if (exifData) {
      const dataUrl = resultCanvas.toDataURL('image/jpeg', 0.92);
      const exifInserted = insertExif(dataUrl, exifData);
      resultBlob = dataUrlToBlob(exifInserted);
    } else {
      resultBlob = await canvasToBlob(resultCanvas);
    }

    faceDetection.close();
    return resultBlob;

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`[Step: ${step}] ${message}`);
  }
}

// 얼굴 블러 (공통 함수 래퍼)
export const blurFace = (
  file: File,
  blurAmount: number,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  return processFace(file, 'blur', blurAmount * 2, onProgress); // 블러 강도 보정
};

// 얼굴 모자이크 (공통 함수 래퍼)
export const redactImage = (
  file: File,
  blockSize: number,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  return processFace(file, 'pixelate', blockSize, onProgress);
};

// 파일 크기 포맷
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
