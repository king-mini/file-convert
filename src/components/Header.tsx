import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import './Header.css';

export const Header: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isHub = location.pathname === '/';
  const isPdfHome = location.pathname === '/pdf';
  const isImageHome = location.pathname === '/image';
  const isPdfTool = location.pathname.startsWith('/pdf/');
  const isImageTool = location.pathname.startsWith('/image/');

  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <NavLink to="/" className="logo">
            <img src="/lokit-logo.svg" alt="Lokit" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle' }} />
            Lokit
          </NavLink>
        </div>

        <nav className="top-bar-tabs">
          {!isHub && (
            <>
              <NavLink
                to="/pdf"
                className={({ isActive }) =>
                  'tab-button' + (isActive || isPdfHome || isPdfTool ? ' tab-button-active' : '')
                }
              >
                {t('nav.pdf')}
              </NavLink>
              <NavLink
                to="/image"
                className={({ isActive }) =>
                  'tab-button' + (isActive || isImageHome || isImageTool ? ' tab-button-active' : '')
                }
              >
                {t('nav.image')}
              </NavLink>
            </>
          )}
        </nav>

        <div className="top-bar-right">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
