import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../i18n';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isHub = location.pathname === '/';
  const isPdfHome = location.pathname === '/pdf';
  const isImageHome = location.pathname === '/image';
  const isPdfTool = location.pathname.startsWith('/pdf/');
  const isImageTool = location.pathname.startsWith('/image/');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0];
  const langRef = useRef<HTMLDivElement | null>(null);

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
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => i18n.changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
