import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const availableLanguages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
];

const defaultLanguage =
  typeof window !== 'undefined' && navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';

const resources = {
  ko: {
    translation: {
      common: {
        comingSoon: '곧 출시',
        loading: '로딩 중...',
      },
      nav: {
        pdf: '📄 PDF 작업',
        image: '🖼️ 이미지 편집',
      },
      header: {
        lang: {
          label: '언어',
          ko: '한국어',
          en: 'English',
        },
      },
      hub: {
        hero: {
          title: '무엇을 도와드릴까요?',
        },
        categories: {
          pdf: {
            title: 'PDF 작업',
            desc: 'PDF 변환, 병합, 분할, 회전 등',
            count: '8개 도구',
          },
          image: {
            title: '이미지 편집',
            desc: '배경 제거, 리사이즈 등',
            count: '6개 도구',
            badge: 'BETA',
          },
        },
        features: {
          client: {
            title: '100% 클라이언트 사이드',
            desc: '파일 업로드 없이 브라우저에서 처리',
          },
          privacy: {
            title: '개인정보 보호',
            desc: '모든 파일이 기기에서 처리됩니다',
          },
          free: {
            title: '무료 제공',
            desc: '회원가입 없이 바로 사용',
          },
        },
      },
      imageHome: {
        heroTitle: '🖼️ 이미지 편집',
        heroSubtitle: '브라우저에서 빠르게 편집하세요',
        features: {
          portraitBlur: {
            title: 'Portrait Blur',
            description: '인물 배경 흐리기',
          },
          backgroundRemove: {
            title: 'Background Remove',
            description: '이미지 배경 제거',
          },
          imageResize: {
            title: 'Image Resize',
            description: '이미지 크기 조절',
          },
          imageCompress: {
            title: 'Image Compress',
            description: '이미지 용량 줄이기',
          },
          formatConvert: {
            title: 'Format Convert',
            description: 'PNG/JPG/WebP 변환',
          },
          imageCrop: {
            title: 'Image Crop',
            description: '이미지 자르기',
          },
        },
      },
      footer: {
        notice: '© 2025 Lokit · 모든 변환은 브라우저에서 처리됩니다',
      },
    },
  },
  en: {
    translation: {
      common: {
        comingSoon: 'Coming soon',
        loading: 'Loading...',
      },
      nav: {
        pdf: '📄 PDF Tools',
        image: '🖼️ Image Tools',
      },
      header: {
        lang: {
          label: 'Language',
          ko: '한국어',
          en: 'English',
        },
      },
      hub: {
        hero: {
          title: 'What can we help you with?',
        },
        categories: {
          pdf: {
            title: 'PDF tools',
            desc: 'Convert, merge, split, rotate PDF',
            count: '8 tools',
          },
          image: {
            title: 'Image tools',
            desc: 'Background remove, resize, blur',
            count: '6 tools',
            badge: 'BETA',
          },
        },
        features: {
          client: {
            title: '100% client-side',
            desc: 'Process files in your browser without uploads',
          },
          privacy: {
            title: 'Privacy first',
            desc: 'Files never leave your device',
          },
          free: {
            title: 'Free to use',
            desc: 'No account required',
          },
        },
      },
      imageHome: {
        heroTitle: '🖼️ Image Tools',
        heroSubtitle: 'Edit quickly in your browser',
        features: {
          portraitBlur: {
            title: 'Portrait Blur',
            description: 'Blur backgrounds for people',
          },
          backgroundRemove: {
            title: 'Background Remove',
            description: 'Remove image backgrounds',
          },
          imageResize: {
            title: 'Image Resize',
            description: 'Change dimensions safely',
          },
          imageCompress: {
            title: 'Image Compress',
            description: 'Reduce file size',
          },
          formatConvert: {
            title: 'Format Convert',
            description: 'PNG/JPG/WebP',
          },
          imageCrop: {
            title: 'Image Crop',
            description: 'Trim and straighten',
          },
        },
      },
      footer: {
        notice: '© 2025 Lokit · All conversions stay in your browser',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  supportedLngs: ['ko', 'en'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
