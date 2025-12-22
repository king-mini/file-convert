import { Suspense } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import MetaUpdater from './MetaUpdater';
import Loading from './Loading';
import './Layout.css';

const Layout = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const langPrefix = lang ? `/${lang}` : '/en';

  return (
    <div className="layout">
      <MetaUpdater />
      <Header />
      <main className="layout-main">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="footer">
        <p>{t('footer.notice')}</p>
        <div className="footer-links">
          <Link to={`${langPrefix}/privacy-policy`}>{t('footer.privacy')}</Link>
          <span className="footer-separator">·</span>
          <Link to={`${langPrefix}/terms`}>{t('footer.terms')}</Link>
          <span className="footer-separator">·</span>
          <Link to={`${langPrefix}/licenses`}>{t('footer.licenses')}</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
