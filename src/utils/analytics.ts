// Google Analytics 4 이벤트 트래킹 유틸리티

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export type ToolType =
    | 'pdf_to_jpg'
    | 'pdf_to_png'
    | 'pdf_to_text'
    | 'image_to_pdf'
    | 'merge_pdf'
    | 'split_pdf'
    | 'rotate_pdf'
    | 'compress_pdf'
    | 'portrait_blur'
    | 'background_remove'
    | 'image_resize'
    | 'image_compress'
    | 'format_convert'
    | 'image_crop';

export type EventType =
    | 'conversion_start'
    | 'conversion_complete'
    | 'conversion_error'
    | 'file_download';

interface EventParams {
    tool_type: ToolType;
    file_size?: string;
    error_type?: string;
    duration_ms?: number;
}

/**
 * Google Analytics 이벤트 전송
 */
export const trackEvent = (eventName: EventType, params: EventParams) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
};

/**
 * 변환 시작 추적
 */
export const trackConversionStart = (toolType: ToolType, fileSize?: number) => {
    trackEvent('conversion_start', {
        tool_type: toolType,
        file_size: fileSize ? formatFileSize(fileSize) : undefined,
    });
};

/**
 * 변환 완료 추적
 */
export const trackConversionComplete = (
    toolType: ToolType,
    fileSize?: number,
    duration?: number
) => {
    trackEvent('conversion_complete', {
        tool_type: toolType,
        file_size: fileSize ? formatFileSize(fileSize) : undefined,
        duration_ms: duration,
    });
};

/**
 * 변환 에러 추적
 */
export const trackConversionError = (
    toolType: ToolType,
    errorType: string
) => {
    trackEvent('conversion_error', {
        tool_type: toolType,
        error_type: errorType,
    });
};

/**
 * 파일 다운로드 추적
 */
export const trackFileDownload = (toolType: ToolType, fileSize?: number) => {
    trackEvent('file_download', {
        tool_type: toolType,
        file_size: fileSize ? formatFileSize(fileSize) : undefined,
    });
};

/**
 * 파일 크기 포맷 (바이트 → 읽기 쉬운 형식)
 */
const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};
