import { useTranslation } from 'react-i18next';
import './Policy.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">{t('policy.privacy.title')}</h1>
        <p className="policy-updated">{t('policy.privacy.updated')}</p>

        <section className="policy-section">
          <h2>{t('policy.privacy.sections.overview.title')}</h2>
          <p>{t('policy.privacy.sections.overview.content')}</p>
        </section>

        <section className="policy-section">
          <h2>{t('policy.privacy.sections.fileProcessing.title')}</h2>
          <p>{t('policy.privacy.sections.fileProcessing.content')}</p>
          <ul>
            <li>{t('policy.privacy.sections.fileProcessing.item1')}</li>
            <li>{t('policy.privacy.sections.fileProcessing.item2')}</li>
            <li>{t('policy.privacy.sections.fileProcessing.item3')}</li>
            <li>{t('policy.privacy.sections.fileProcessing.item4')}</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>{t('policy.privacy.sections.dataCollection.title')}</h2>
          <p>{t('policy.privacy.sections.dataCollection.content')}</p>
          <h3>{t('policy.privacy.sections.dataCollection.analytics.title')}</h3>
          <p>{t('policy.privacy.sections.dataCollection.analytics.content')}</p>
          <h3>{t('policy.privacy.sections.dataCollection.ads.title')}</h3>
          <p>{t('policy.privacy.sections.dataCollection.ads.content')}</p>
        </section>

        <section className="policy-section">
          <h2>{t('policy.privacy.sections.cookies.title')}</h2>
          <p>{t('policy.privacy.sections.cookies.content')}</p>
          <ul>
            <li>{t('policy.privacy.sections.cookies.item1')}</li>
            <li>{t('policy.privacy.sections.cookies.item2')}</li>
            <li>{t('policy.privacy.sections.cookies.item3')}</li>
          </ul>
          <p>{t('policy.privacy.sections.cookies.note')}</p>
        </section>

        <section className="policy-section">
          <h2>{t('policy.privacy.sections.contact.title')}</h2>
          <p>{t('policy.privacy.sections.contact.content')}</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

