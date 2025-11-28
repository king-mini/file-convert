import { useTranslation } from 'react-i18next';
import './Policy.css';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">{t('policy.terms.title')}</h1>
        <p className="policy-updated">{t('policy.terms.updated')}</p>

        <section className="policy-section">
          <h2>{t('policy.terms.sections.acceptance.title')}</h2>
          <p>{t('policy.terms.sections.acceptance.content')}</p>
        </section>

        <section className="policy-section">
          <h2>{t('policy.terms.sections.service.title')}</h2>
          <p>{t('policy.terms.sections.service.content')}</p>
          <ul>
            <li>{t('policy.terms.sections.service.item1')}</li>
            <li>{t('policy.terms.sections.service.item2')}</li>
            <li>{t('policy.terms.sections.service.item3')}</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>{t('policy.terms.sections.restrictions.title')}</h2>
          <p>{t('policy.terms.sections.restrictions.content')}</p>
          <ul>
            <li>{t('policy.terms.sections.restrictions.item1')}</li>
            <li>{t('policy.terms.sections.restrictions.item2')}</li>
            <li>{t('policy.terms.sections.restrictions.item3')}</li>
            <li>{t('policy.terms.sections.restrictions.item4')}</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>{t('policy.terms.sections.disclaimer.title')}</h2>
          <p>{t('policy.terms.sections.disclaimer.content')}</p>
          <ul>
            <li>{t('policy.terms.sections.disclaimer.item1')}</li>
            <li>{t('policy.terms.sections.disclaimer.item2')}</li>
            <li>{t('policy.terms.sections.disclaimer.item3')}</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>{t('policy.terms.sections.changes.title')}</h2>
          <p>{t('policy.terms.sections.changes.content')}</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;

