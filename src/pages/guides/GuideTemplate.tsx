import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './GuideTemplate.css';

type GuideTemplateProps = {
  guideKey: string;
};

type GuideContent = {
  shortTitle: string;
  toolName: string;
  toolPath: string;
  title: string;
  subtitle: string;
  stepsTitle: string;
  stepsSubtitle: string;
  steps: string[];
  useCasesTitle: string;
  useCasesSubtitle: string;
  useCases: string[];
  tipsTitle: string;
  tipsSubtitle: string;
  tips: string[];
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  ctaUseTool: string;
  ctaViewAll: string;
};

const GuideTemplate = ({ guideKey }: GuideTemplateProps) => {
  const { t } = useTranslation();
  const content = t(`guides.${guideKey}`, { returnObjects: true }) as GuideContent;

  return (
    <div className="guide-page">
      <div className="guide-hero">
        <div className="guide-breadcrumb">
          <Link to="/image">{t('breadcrumbs.imageTools')}</Link>
          <span aria-hidden="true">›</span>
          <Link to={content.toolPath}>{content.toolName}</Link>
          <span aria-hidden="true">›</span>
          <span className="guide-current">{content.shortTitle}</span>
        </div>
        <h1>{content.title}</h1>
        <p className="guide-subtitle">{content.subtitle}</p>
        <div className="guide-cta-group">
          <Link className="guide-cta-primary" to={content.toolPath}>
            {content.ctaUseTool}
          </Link>
          <Link className="guide-cta-secondary" to="/image">
            {content.ctaViewAll}
          </Link>
        </div>
      </div>

      <div className="guide-body">
        <section className="guide-section">
          <div className="section-header">
            <h2>{content.stepsTitle}</h2>
            <p>{content.stepsSubtitle}</p>
          </div>
          <ol className="guide-list">
            {content.steps.map((item, index) => (
              <li key={item}>
                <span className="list-index">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="guide-section">
          <div className="section-header">
            <h2>{content.useCasesTitle}</h2>
            <p>{content.useCasesSubtitle}</p>
          </div>
          <div className="pill-list">
            {content.useCases.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="guide-section">
          <div className="section-header">
            <h2>{content.tipsTitle}</h2>
            <p>{content.tipsSubtitle}</p>
          </div>
          <ul className="guide-bullets">
            {content.tips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="guide-section guide-cta">
          <div>
            <h2>{content.finalCtaTitle}</h2>
            <p>{content.finalCtaSubtitle}</p>
          </div>
          <div className="guide-cta-group">
            <Link className="guide-cta-primary" to={content.toolPath}>
              {content.ctaUseTool}
            </Link>
            <Link className="guide-cta-secondary" to="/image">
              {content.ctaViewAll}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuideTemplate;
