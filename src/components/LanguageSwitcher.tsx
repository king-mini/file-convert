import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { availableLanguages } from '../i18n';
import './LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // 현재 언어를 URL 기반으로 판단
  const getCurrentLangCode = (): string => {
    if (lang === 'pt') return 'pt';
    if (lang === 'es') return 'es';
    if (lang === 'ko') return 'ko';
    return 'en';
  };

  const currentLang = getCurrentLangCode();

  const applyLanguage = (langCode: string) => {
    // i18n 언어 코드로 변환 (pt -> pt-BR)
    const i18nLang = langCode === 'pt' ? 'pt-BR' : langCode;

    // i18n 언어 변경
    i18n.changeLanguage(i18nLang);
    localStorage.setItem('lokit_lang', i18nLang);

    // URL 경로에서 현재 언어 부분만 교체
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 2 && ['en', 'pt', 'es', 'ko'].includes(pathParts[1])) {
      pathParts[1] = langCode === 'pt-BR' ? 'pt' : langCode;
    } else {
      // 언어 prefix가 없는 경우 (예: / 루트)
      pathParts.splice(1, 0, langCode === 'pt-BR' ? 'pt' : langCode);
    }

    const newPath = pathParts.join('/') || '/';
    navigate(newPath);
    setOpen(false);
  };

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
            onClick={() => applyLanguage(lang.code)}
          >
            {lang.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
