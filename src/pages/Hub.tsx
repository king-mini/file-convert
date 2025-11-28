import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hub.css';

const Hub = () => {
  const { t } = useTranslation();

  return (
    <div className="hub">
      <section className="hub-hero">
        <h1 className="hub-title">{t('hub.hero.title')}</h1>
      </section>

      <section className="categories">
        <div className="category-grid">
          <Link to="/pdf" className="category-card">
            <div className="category-icon">📄</div>
            <div className="category-content">
              <div className="category-header">
                <h2 className="category-title">{t('hub.categories.pdf.title')}</h2>
              </div>
              <p className="category-description">{t('hub.categories.pdf.desc')}</p>
              <span className="category-count">{t('hub.categories.pdf.count')}</span>
            </div>
          </Link>

          <Link to="/image" className="category-card">
            <div className="category-icon">🖼️</div>
            <div className="category-content">
              <div className="category-header">
                <h2 className="category-title">{t('hub.categories.image.title')}</h2>
              </div>
              <p className="category-description">{t('hub.categories.image.desc')}</p>
              <span className="category-count">{t('hub.categories.image.count')}</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="hub-features">
        <div className="feature-item">
          <div className="feature-icon">✅</div>
          <h3>{t('hub.features.client.title')}</h3>
          <p>{t('hub.features.client.desc')}</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h3>{t('hub.features.privacy.title')}</h3>
          <p>{t('hub.features.privacy.desc')}</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💰</div>
          <h3>{t('hub.features.free.title')}</h3>
          <p>{t('hub.features.free.desc')}</p>
        </div>
      </section>
    </div>
  );
};

export default Hub;

