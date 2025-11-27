import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2025 Lokit · 모든 작업은 서버에 업로드되지 않고 안전하게 처리됩니다</p>
      </footer>
    </div>
  );
};

export default Layout;

