import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko';
import en from './locales/en';
import es from './locales/es';

// Production 환경에서는 한국어 숨김
const isProduction = import.meta.env.PROD;

export const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  ...(isProduction ? [] : [{ code: 'ko', label: '한국어' }]),
];

const resolveStoredLanguage = () => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem('lokit_lang');
  return stored === 'ko' || stored === 'en' || stored === 'es' ? stored : null;
};

const resolveBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const lang = navigator.language?.toLowerCase() || '';
  if (lang.startsWith('ko')) return 'ko';
  if (lang.startsWith('es')) return 'es';
  return 'en';
};

const defaultLanguage = isProduction ? 'en' : (resolveStoredLanguage() ?? resolveBrowserLanguage());

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
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  supportedLngs: ['ko', 'en', 'es'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
