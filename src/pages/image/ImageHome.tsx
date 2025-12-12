import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FeatureHighlights from '../../components/FeatureHighlights';
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
      path: '/image/blur-background',
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

  // Schema.org ItemList markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online Image Tools",
    "description": "6 free photo editing tools for professional results",
    "numberOfItems": 6,
    "itemListElement": features.map((feature, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": feature.title,
      "description": feature.description,
      "url": `https://lokit.tools${feature.path}`,
      "image": `https://lokit.tools/og-default.png`
    }))
  };

  return (
    <div className="home">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

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

      <FeatureHighlights className="seo-highlights" />
    </div>
  );
};

export default ImageHome;
