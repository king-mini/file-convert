import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MetaUpdater = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const description = t('meta.description');
  const locale = t('locale');
  const lang = (i18n.language || 'en').split('-')[0];

  useEffect(() => {
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', locale.replace('-', '_'));
    }

    const ogAlternate = document.querySelector('meta[property="og:locale:alternate"]');
    if (ogAlternate) {
      const alternate = lang === 'ko' ? 'en-US' : 'ko-KR';
      ogAlternate.setAttribute('content', alternate.replace('-', '_'));
    }

    document.documentElement.setAttribute('lang', lang);
  }, [description, locale, lang, location.pathname]);

  return null;
};

export default MetaUpdater;
