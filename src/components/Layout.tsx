import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import MetaUpdater from './MetaUpdater';
import './Layout.css';

const Layout = () => {
  const { t } = useTranslation();

  return (
    <div className="layout">
      <MetaUpdater />
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>{t('footer.notice')}</p>
      </footer>
    </div>
  );
};

export default Layout;

