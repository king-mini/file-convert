import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko';
import en from './locales/en';

// Production 환경에서는 한국어 숨김
const isProduction = import.meta.env.PROD;

export const availableLanguages = [
  { code: 'en', label: 'English' },
  ...(isProduction ? [] : [{ code: 'ko', label: '한국어' }]),
];

const resolveStoredLanguage = () => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem('lokit_lang');
  return stored === 'ko' || stored === 'en' ? stored : null;
};

const resolveBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const lang = navigator.language?.toLowerCase() || '';
  return lang.startsWith('ko') ? 'ko' : 'en';
};

const defaultLanguage = isProduction ? 'en' : (resolveStoredLanguage() ?? resolveBrowserLanguage());

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
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
