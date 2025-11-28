import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../i18n';
import './Header.css';

type LanguageCode = 'ko' | 'en';

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isHub = location.pathname === '/';
  const isPdfHome = location.pathname === '/pdf';
  const isImageHome = location.pathname === '/image';
  const isPdfTool = location.pathname.startsWith('/pdf/');
  const isImageTool = location.pathname.startsWith('/image/');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0] as LanguageCode;
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLanguageChange = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lokit_lang', code);
    }
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🔄 Lokit
        </Link>

        {/* Hub에서는 네비게이션 숨김 */}
        {!isHub && (
          <nav className="nav">
            <Link 
              to="/pdf" 
              className={`nav-link ${isPdfHome || isPdfTool ? 'active' : ''}`}
            >
              {t('nav.pdf')}
            </Link>
            <Link 
              to="/image" 
              className={`nav-link ${isImageHome || isImageTool ? 'active' : ''}`}
            >
              {t('nav.image')}
            </Link>
          </nav>
        )}

        <div className="lang-switch" ref={langRef}>
          <button
            type="button"
            className="lang-toggle"
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            🌐
            <span className="sr-only">{t('header.lang.label')}</span>
          </button>

          {menuOpen && (
            <div className="lang-menu" role="listbox">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  data-lang={lang.code}
                  aria-selected={currentLang === lang.code}
                  className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                >
                  {currentLang === lang.code && <span className="lang-check">✓</span>}
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
