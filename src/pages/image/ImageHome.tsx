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
  // 사용 가능
  {
    title: 'Portrait Blur',
    icon: '🎭',
    description: '인물 배경 흐리기',
    path: '/image/portrait-blur',
    available: true,
  },
  {
    title: 'Background Remove',
    icon: '✨',
    description: '이미지 배경 제거',
    path: '/image/bg-remove',
    available: true,
  },
  // 향후 개발 예정
  {
    title: 'Image Resize',
    icon: '📐',
    description: '이미지 크기 조정',
    path: '/image/resize',
    available: false,
  },
  {
    title: 'Image Compress',
    icon: '📦',
    description: '이미지 용량 압축',
    path: '/image/compress',
    available: false,
  },
  {
    title: 'Format Convert',
    icon: '🔄',
    description: 'PNG/JPG/WebP 변환',
    path: '/image/convert',
    available: false,
  },
  {
    title: 'Image Crop',
    icon: '✂️',
    description: '이미지 자르기',
    path: '/image/crop',
    available: false,
  },
];

const ImageHome = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">🖼️ 이미지 도구</h1>
        <p className="hero-subtitle">브라우저에서 안전하게 편집하세요</p>
      </section>

      {/* Feature Grid */}
      <section className="features">
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

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefit-card">
          <div className="benefit-icon">✅</div>
          <h3>100% 클라이언트 사이드</h3>
          <p>서버 업로드 없이 브라우저에서 직접 처리</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🔒</div>
          <h3>개인정보 보호</h3>
          <p>모든 파일은 사용자의 브라우저에서만 처리</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">💰</div>
          <h3>무료 무제한</h3>
          <p>제한 없이 무료로 사용 가능</p>
        </div>
      </section>
    </div>
  );
};

export default ImageHome;
