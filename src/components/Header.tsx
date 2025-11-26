import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🔄 Lokit
        </Link>
        {!isHome && (
          <Link to="/" className="home-btn">
            ← 홈으로
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

