import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import './Header.css';

export const Header: React.FC = () => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();

  // 언어 prefix를 포함한 경로 생성
  const langPrefix = lang ? `/${lang}` : '/en';

  // 현재 경로에서 언어 prefix 제거한 상대 경로
  const pathWithoutLang = location.pathname.replace(/^\/(en|pt|es|ko)/, '');

  const isHub = pathWithoutLang === '' || pathWithoutLang === '/';
  const isPdfHome = pathWithoutLang === '/pdf';
  const isImageHome = pathWithoutLang === '/image';
  const isPdfTool = pathWithoutLang.startsWith('/pdf/');
  const isImageTool = pathWithoutLang.startsWith('/image/');

  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <NavLink to={langPrefix} className="logo">
            <img src="/lokit-logo.svg" alt="Lokit" style={{ width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle' }} />
            Lokit
          </NavLink>
        </div>

        <nav className="top-bar-tabs">
          {!isHub && (
            <>
              <NavLink
                to={`${langPrefix}/pdf`}
                className={({ isActive }) =>
                  'tab-button' + (isActive || isPdfHome || isPdfTool ? ' tab-button-active' : '')
                }
              >
                {t('nav.pdf')}
              </NavLink>
              <NavLink
                to={`${langPrefix}/image`}
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
