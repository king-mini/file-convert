import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHub = location.pathname === '/';
  const isPdfHome = location.pathname === '/pdf';
  const isImageHome = location.pathname === '/image';
  const isPdfTool = location.pathname.startsWith('/pdf/');
  const isImageTool = location.pathname.startsWith('/image/');

  // 뒤로가기 버튼 텍스트와 경로 결정
  const getBackButton = () => {
    if (isPdfTool) {
      return { to: '/pdf', label: '← PDF 도구' };
    }
    if (isImageTool) {
      return { to: '/image', label: '← 이미지 도구' };
    }
    if (isPdfHome || isImageHome) {
      return { to: '/', label: '← 홈' };
    }
    return null;
  };

  const backButton = getBackButton();

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

        {backButton && (
          <Link to={backButton.to} className="home-btn">
            {backButton.label}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

