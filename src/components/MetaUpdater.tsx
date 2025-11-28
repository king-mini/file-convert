import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MetaUpdater = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const locale = t('locale');
  const lang = (i18n.language || 'en').split('-')[0];

  // 경로별 메타 정보 결정
  const getMetaInfo = () => {
    const path = location.pathname;
    
    if (path === '/privacy-policy') {
      return {
        title: t('meta.privacy.title'),
        description: t('meta.privacy.description'),
      };
    }
    if (path === '/terms') {
      return {
        title: t('meta.terms.title'),
        description: t('meta.terms.description'),
      };
    }
    if (path === '/licenses') {
      return {
        title: t('meta.licenses.title'),
        description: t('meta.licenses.description'),
      };
    }
    
    // 기본값
    return {
      title: 'Lokit - File Tools',
      description: t('meta.description'),
    };
  };

  const metaInfo = getMetaInfo();

  useEffect(() => {
    // Title 업데이트
    document.title = metaInfo.title;

    // Description 업데이트
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', metaInfo.description);
    }

    // OG Tags 업데이트
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', metaInfo.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', metaInfo.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://lokit.tools${location.pathname}`);
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
  }, [metaInfo.title, metaInfo.description, locale, lang, location.pathname, t]);

  return null;
};

export default MetaUpdater;
