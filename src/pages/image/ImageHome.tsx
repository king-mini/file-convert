import { Link } from 'react-router-dom';
import './ImageHome.css';

interface FeatureCard {
  title: string;
  icon: string;
  description: string;
  path: string;
  available: boolean;
}

const features: FeatureCard[] = [
  {
    title: 'Portrait Blur',
    icon: '🎭',
    description: '인물 배경 흐리기 (곧 출시)',
    path: '/image/portrait-blur',
    available: false,
  },
  {
    title: 'Background Remove',
    icon: '✨',
    description: '배경 제거 (곧 출시)',
    path: '/image/bg-remove',
    available: false,
  },
];

const ImageHome = () => {
  return (
    <div className="image-home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">🖼️ 이미지 도구</h1>
        <p className="hero-subtitle">브라우저에서 안전하게 편집하세요</p>
        <span className="beta-badge">BETA</span>
      </section>

      {/* Feature Grid */}
      <section className="features">
        <h2 className="features-title">편집 기능</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.path} className="feature-card-wrapper">
              {feature.available ? (
                <Link to={feature.path} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </Link>
              ) : (
                <div className="feature-card feature-card-disabled">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <span className="coming-soon">곧 출시</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="coming-soon-notice">
        <div className="notice-card">
          <h3>🚀 곧 만나요!</h3>
          <p>이미지 편집 기능을 열심히 준비하고 있습니다.</p>
          <p>조금만 기다려주세요! 😊</p>
        </div>
      </section>
    </div>
  );
};

export default ImageHome;

