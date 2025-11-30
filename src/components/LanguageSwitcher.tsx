import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../i18n';
import './LanguageSwitcher.css';

type Language = 'ko' | 'en';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const currentLang = (i18n.language?.startsWith('ko') ? 'ko' : 'en') satisfies Language;

  const applyLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lokit_lang', lang);
    setOpen(false);
  };

  // 초기 언어 복원
  useEffect(() => {
    const saved = localStorage.getItem('lokit_lang') as Language | null;
    if (saved && saved !== currentLang) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  // 바깥 클릭 / ESC 처리
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (availableLanguages.length <= 1) return null;

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-toggle-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
      >
        🌐
      </button>
      <ul
        className={`lang-menu ${open ? 'lang-menu-open' : 'lang-menu-hidden'}`}
        role="listbox"
        aria-label="Language selector"
      >
        {availableLanguages.map((lang) => (
          <li
            key={lang.code}
            role="option"
            data-lang={lang.code}
            className={`lang-option ${currentLang === lang.code ? 'lang-option-active' : ''}`}
            onClick={() => applyLanguage(lang.code as Language)}
          >
            {lang.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

