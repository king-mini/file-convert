import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHub = location.pathname === '/';
  const isPdfHome = location.pathname === '/pdf';
  const isImageHome = location.pathname === '/image';
  const isPdfTool = location.pathname.startsWith('/pdf/');
  const isImageTool = location.pathname.startsWith('/image/');

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
              📄 PDF 도구
            </Link>
            <Link 
              to="/image" 
              className={`nav-link ${isImageHome || isImageTool ? 'active' : ''}`}
            >
              🖼️ 이미지 도구
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
