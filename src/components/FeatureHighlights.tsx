import { useTranslation } from 'react-i18next';
import './FeatureHighlights.css';

type FeatureHighlightsProps = {
  className?: string;
};

const FeatureHighlights = ({ className }: FeatureHighlightsProps) => {
  const { t } = useTranslation();
  const features = [
    {
      icon: '🖥️',
      title: t('hub.features.client.title'),
      description: t('hub.features.client.desc'),
    },
    {
      icon: '🔒',
      title: t('hub.features.privacy.title'),
      description: t('hub.features.privacy.desc'),
    },
    {
      icon: '💡',
      title: t('hub.features.free.title'),
      description: t('hub.features.free.desc'),
    },
  ];

  const sectionClass = ['feature-highlights', className].filter(Boolean).join(' ');

  return (
    <section className={sectionClass}>
      {features.map((feature) => (
        <div className="feature-highlight-item" key={feature.title}>
          <div className="feature-highlight-icon" aria-hidden="true">
            {feature.icon}
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default FeatureHighlights;
