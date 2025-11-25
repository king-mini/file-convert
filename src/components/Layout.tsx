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
        <p>© 2025 PDF Converter · 모든 변환은 브라우저에서 처리됩니다</p>
      </footer>
    </div>
  );
};

export default Layout;

