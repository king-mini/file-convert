import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  const { t } = useTranslation();

  return (
    <div className="layout">
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

