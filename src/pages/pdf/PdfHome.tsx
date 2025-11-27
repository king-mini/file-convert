import { Link } from 'react-router-dom';
import './PdfHome.css';

interface FeatureCard {
  title: string;
  icon: string;
  description: string;
  path: string;
  available: boolean;
}

const features: FeatureCard[] = [
  {
    title: 'PDF → JPG',
    icon: '🖼️',
    description: 'PDF를 JPG 이미지로 변환',
    path: '/pdf/to-jpg',
    available: true,
  },
  {
    title: 'PDF → PNG',
    icon: '🎨',
    description: 'PDF를 PNG 이미지로 변환',
    path: '/pdf/to-png',
    available: true,
  },
  {
    title: 'PDF → Text',
    icon: '📝',
    description: 'PDF에서 텍스트 추출',
    path: '/pdf/to-text',
    available: true,
  },
  {
    title: 'Image → PDF',
    icon: '🖼️',
    description: '이미지를 PDF로 변환',
    path: '/pdf/image-to-pdf',
    available: true,
  },
  {
    title: 'PDF 병합',
    icon: '🔗',
    description: '여러 PDF 파일 병합',
    path: '/pdf/merge',
    available: true,
  },
  {
    title: 'PDF 분할',
    icon: '✂️',
    description: 'PDF 페이지 분할',
    path: '/pdf/split',
    available: true,
  },
  {
    title: 'PDF 회전',
    icon: '🔄',
    description: 'PDF 페이지 회전',
    path: '/pdf/rotate',
    available: true,
  },
  {
    title: 'PDF 압축',
    icon: '📦',
    description: 'PDF 파일 크기 압축',
    path: '/pdf/compress',
    available: true,
  },
];

const PdfHome = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">📄 PDF 도구</h1>
        <p className="hero-subtitle">브라우저에서 안전하게 변환하세요</p>
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

      {/* Features Section */}
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

export default PdfHome;

