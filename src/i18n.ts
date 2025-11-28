import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ko from './locales/ko';
import en from './locales/en';

export const availableLanguages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
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

const defaultLanguage = resolveStoredLanguage() ?? resolveBrowserLanguage();

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
