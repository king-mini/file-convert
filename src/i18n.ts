import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko';
import en from './locales/en';
import es from './locales/es';
import ptBR from './locales/pt-BR';

// Production 환경에서는 한국어 숨김
const isProduction = import.meta.env.PROD;

export const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  ...(isProduction ? [] : [{ code: 'ko', label: '한국어' }]),
];

// URL에서 언어 코드 추출
const resolveUrlLanguage = (): string | null => {
  if (typeof window === 'undefined') return null;
  const pathLang = window.location.pathname.split('/')[1];
  if (['en', 'pt', 'es', 'ko'].includes(pathLang)) {
    return pathLang === 'pt' ? 'pt-BR' : pathLang;
  }
  return null;
};

const resolveStoredLanguage = () => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem('lokit_lang');
  return stored === 'ko' || stored === 'en' || stored === 'es' || stored === 'pt-BR' ? stored : null;
};

const resolveBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const lang = navigator.language?.toLowerCase() || '';
  if (lang.startsWith('ko')) return 'ko';
  if (lang.startsWith('pt')) return 'pt-BR';
  if (lang.startsWith('es')) return 'es';
  return 'en';
};

// URL 언어 → 저장된 언어 → 브라우저 언어 순으로 확인
const resolveLanguage = (): string => {
  const urlLang = resolveUrlLanguage();
  if (urlLang) return urlLang;

  if (isProduction) {
    // 프로덕션에서는 URL이 없으면 브라우저 언어 사용 (한국어 제외)
    const browserLang = resolveBrowserLanguage();
    return browserLang === 'ko' ? 'en' : browserLang;
  }

  return resolveStoredLanguage() ?? resolveBrowserLanguage();
};

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  'pt-BR': {
    translation: ptBR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: resolveLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['ko', 'en', 'es', 'pt-BR'],
  interpolation: {
    escapeValue: false,
  },
});

// 언어 코드를 URL용 단축 코드로 변환
export const langToUrlCode = (lang: string): string => {
  if (lang === 'pt-BR') return 'pt';
  return lang;
};

// URL용 단축 코드를 i18n 언어 코드로 변환
export const urlCodeToLang = (code: string): string => {
  if (code === 'pt') return 'pt-BR';
  return code;
};

export default i18n;
