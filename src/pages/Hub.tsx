import { Link } from 'react-router-dom';
import './Hub.css';

interface CategoryCard {
  icon: string;
  title: string;
  description: string;
  count: string;
  path: string;
  badge?: string;
}

const categories: CategoryCard[] = [
  {
    icon: '📄',
    title: 'PDF 작업',
    description: 'PDF 변환, 병합, 분할, 압축 등',
    count: '8개 도구',
    path: '/pdf',
  },
  {
    icon: '🖼️',
    title: '이미지 편집',
    description: '배경 흐리기, 배경 제거 등',
    count: '준비 중',
    path: '/image',
    badge: 'BETA',
  },
];

const Hub = () => {
  return (
    <div className="hub">
      <section className="hub-hero">
        <h1 className="hub-title">무엇을 도와드릴까요?</h1>
      </section>

      <section className="categories">
        <div className="category-grid">
          {categories.map((category) => (
            <Link 
              key={category.path} 
              to={category.path} 
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-content">
                <div className="category-header">
                  <h2 className="category-title">{category.title}</h2>
                  {category.badge && (
                    <span className="category-badge">{category.badge}</span>
                  )}
                </div>
                <p className="category-description">{category.description}</p>
                <span className="category-count">{category.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-features">
        <div className="feature-item">
          <div className="feature-icon">✅</div>
          <h3>클라이언트 사이드</h3>
          <p>브라우저에서 직접 처리</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h3>개인정보 보호</h3>
          <p>파일 업로드 없음</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💰</div>
          <h3>무료 무제한</h3>
          <p>제한 없이 사용 가능</p>
        </div>
      </section>
    </div>
  );
};

export default Hub;

