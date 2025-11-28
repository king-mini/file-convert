import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './PdfHome.css';

interface FeatureCard {
  title: string;
  icon: string;
  description: string;
  path: string;
  available: boolean;
}

const PdfHome = () => {
  const { t } = useTranslation();
  const features: FeatureCard[] = useMemo(
    () => [
      {
        title: t('pages.pdf.home.features.toJpg.title'),
        icon: '🖼️',
        description: t('pages.pdf.home.features.toJpg.description'),
        path: '/pdf/to-jpg',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.toPng.title'),
        icon: '🎨',
        description: t('pages.pdf.home.features.toPng.description'),
        path: '/pdf/to-png',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.toText.title'),
        icon: '📝',
        description: t('pages.pdf.home.features.toText.description'),
        path: '/pdf/to-text',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.imageToPdf.title'),
        icon: '🖼️',
        description: t('pages.pdf.home.features.imageToPdf.description'),
        path: '/pdf/image-to-pdf',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.merge.title'),
        icon: '🔗',
        description: t('pages.pdf.home.features.merge.description'),
        path: '/pdf/merge',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.split.title'),
        icon: '✂️',
        description: t('pages.pdf.home.features.split.description'),
        path: '/pdf/split',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.rotate.title'),
        icon: '🔄',
        description: t('pages.pdf.home.features.rotate.description'),
        path: '/pdf/rotate',
        available: true,
      },
      {
        title: t('pages.pdf.home.features.compress.title'),
        icon: '📦',
        description: t('pages.pdf.home.features.compress.description'),
        path: '/pdf/compress',
        available: true,
      },
    ],
    [t]
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">{t('pages.pdf.home.hero.title')}</h1>
        <p className="hero-subtitle">{t('pages.pdf.home.hero.subtitle')}</p>
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

      {/* Features Section */}
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

export default PdfHome;

