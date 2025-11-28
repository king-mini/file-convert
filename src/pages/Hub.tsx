import { Link } from 'react-router-dom';
import './Hub.css';

const Hub = () => {
  return (
    <div className="hub">
      <section className="hub-hero">
        <h1 className="hub-title">무엇을 도와드릴까요?</h1>
      </section>

      <section className="categories">
        <div className="category-grid">
          <Link to="/pdf" className="category-card">
            <div className="category-icon">📄</div>
            <div className="category-content">
              <div className="category-header">
                <h2 className="category-title">PDF 작업</h2>
              </div>
              <p className="category-description">PDF 변환, 병합, 분할, 압축 등</p>
              <span className="category-count">8개 도구</span>
            </div>
          </Link>

          <Link to="/image" className="category-card">
            <div className="category-icon">🖼️</div>
            <div className="category-content">
              <div className="category-header">
                <h2 className="category-title">이미지 편집</h2>
              </div>
              <p className="category-description">배경 흐리기, 배경 제거 등</p>
              <span className="category-count">6개 도구</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="hub-features">
        <div className="feature-item">
          <div className="feature-icon">✅</div>
          <h3>100% 클라이언트 사이드</h3>
          <p>서버 업로드 없이 브라우저에서 직접 처리</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h3>개인정보 보호</h3>
          <p>모든 파일은 사용자의 브라우저에서만 처리</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💰</div>
          <h3>무료 제공</h3>
          <p>제한 없이 무료로 사용 가능</p>
        </div>
      </section>
    </div>
  );
};

export default Hub;

