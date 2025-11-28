import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ImageHome.css';

interface FeatureCard {
  title: string;
  icon: string;
  description: string;
  path: string;
  available: boolean;
}

const ImageHome = () => {
  const { t } = useTranslation();

  const features: FeatureCard[] = [
    {
      title: t('imageHome.features.portraitBlur.title'),
      icon: '🎭',
      description: t('imageHome.features.portraitBlur.description'),
      path: '/image/portrait-blur',
      available: true,
    },
    {
      title: t('imageHome.features.backgroundRemove.title'),
      icon: '✨',
      description: t('imageHome.features.backgroundRemove.description'),
      path: '/image/bg-remove',
      available: true,
    },
    {
      title: t('imageHome.features.imageResize.title'),
      icon: '📐',
      description: t('imageHome.features.imageResize.description'),
      path: '/image/resize',
      available: true,
    },
    {
      title: t('imageHome.features.imageCompress.title'),
      icon: '🗜️',
      description: t('imageHome.features.imageCompress.description'),
      path: '/image/compress',
      available: true,
    },
    {
      title: t('imageHome.features.formatConvert.title'),
      icon: '🔄',
      description: t('imageHome.features.formatConvert.description'),
      path: '/image/format',
      available: true,
    },
    {
      title: t('imageHome.features.imageCrop.title'),
      icon: '✂️',
      description: t('imageHome.features.imageCrop.description'),
      path: '/image/crop',
      available: true,
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">{t('imageHome.heroTitle')}</h1>
        <p className="hero-subtitle">{t('imageHome.heroSubtitle')}</p>
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
                  <span className="coming-soon">{t('common.comingSoon')}</span>
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
          <h3>{t('hub.features.client.title')}</h3>
          <p>{t('hub.features.client.desc')}</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🔒</div>
          <h3>{t('hub.features.privacy.title')}</h3>
          <p>{t('hub.features.privacy.desc')}</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">💰</div>
          <h3>{t('hub.features.free.title')}</h3>
          <p>{t('hub.features.free.desc')}</p>
        </div>
      </section>
    </div>
  );
};

export default ImageHome;
