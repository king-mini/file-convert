import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHub = location.pathname === '/';
  const isPdfSection = location.pathname.startsWith('/pdf');
  const isImageSection = location.pathname.startsWith('/image');

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🔄 Lokit
        </Link>
        
        <nav className="nav">
          <Link 
            to="/pdf" 
            className={`nav-link ${isPdfSection ? 'active' : ''}`}
          >
            📄 PDF 도구
          </Link>
          <Link 
            to="/image" 
            className={`nav-link ${isImageSection ? 'active' : ''}`}
          >
            🖼️ 이미지 도구
            <span className="badge">BETA</span>
          </Link>
        </nav>

        {!isHub && (
          <Link to="/" className="home-btn">
            ← 홈
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

