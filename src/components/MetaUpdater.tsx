import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MetaUpdater = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const description = t('meta.description');
  const lang = (i18n.language || 'ko').split('-')[0];

  useEffect(() => {
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    document.documentElement.setAttribute('lang', lang);
  }, [description, lang, location.pathname]);

  return null;
};

export default MetaUpdater;
