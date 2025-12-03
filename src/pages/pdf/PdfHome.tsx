import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import FeatureHighlights from '../../components/FeatureHighlights';
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

  // Schema.org ItemList markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online PDF Tools",
    "description": "8 powerful tools to process PDFs securely in your browser",
    "numberOfItems": 8,
    "itemListElement": features.map((feature, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": feature.title,
      "description": feature.description,
      "url": `https://lokit.tools${feature.path}`
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

      <FeatureHighlights className="seo-highlights" />
    </div>
  );
};

export default PdfHome;

