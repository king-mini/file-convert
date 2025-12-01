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

    // 주요 도구 페이지별 SEO 최적화된 메타 태그
    if (path === '/pdf/to-jpg') {
      return {
        title: 'PDF to JPG - Convert PDF to High Quality JPG Images | Lokit',
        description: 'Free online PDF to JPG converter. Convert PDF pages to high-quality JPG images with adjustable quality and resolution. No signup required, 100% secure.',
        ogTitle: 'PDF to JPG Converter - Free Online Tool',
        ogDescription: 'Convert PDF to JPG images instantly in your browser. Secure, fast, and free.',
      };
    }
    if (path === '/pdf/to-png') {
      return {
        title: 'PDF to PNG - Convert PDF to PNG Images with Transparency | Lokit',
        description: 'Free online PDF to PNG converter. Convert PDF pages to PNG images with optional transparency support. High quality, no signup required.',
        ogTitle: 'PDF to PNG Converter - Free Online Tool',
        ogDescription: 'Convert PDF to PNG images with transparency support. Secure, fast, and free.',
      };
    }
    if (path === '/pdf/compress') {
      return {
        title: 'Compress PDF - Reduce PDF File Size Online | Lokit',
        description: 'Free online PDF compressor. Reduce PDF file size while maintaining quality. Adjustable compression settings, no signup required.',
        ogTitle: 'Compress PDF - Free Online PDF Compression Tool',
        ogDescription: 'Reduce PDF file size instantly. Secure, fast, and free compression tool.',
      };
    }
    if (path === '/pdf/merge') {
      return {
        title: 'Merge PDF - Combine Multiple PDF Files into One | Lokit',
        description: 'Free online PDF merger. Combine multiple PDF files into one document. Reorder pages, no signup required, 100% secure.',
        ogTitle: 'Merge PDF - Free Online PDF Merger Tool',
        ogDescription: 'Combine multiple PDF files into one. Secure, fast, and free.',
      };
    }
    if (path === '/image/blur-background') {
      return {
        title: 'Portrait Background Blur - AI Blur Photo Background | Lokit',
        description: 'Free AI-powered portrait background blur tool. Blur backgrounds in people photos automatically. Perfect for portrait photography. Adjustable blur strength, no signup required.',
        ogTitle: 'Portrait Background Blur - AI Photo Background Blur Tool',
        ogDescription: 'Blur photo backgrounds for portraits automatically with AI. Keep people sharp, blur the background. Secure, fast, and free.',
      };
    }
    if (path === '/image/bg-remove') {
      return {
        title: 'Background Remover - Remove Image Background AI | Lokit',
        description: 'Remove image background automatically with AI. Free online tool. Support JPG, PNG, WebP.',
        ogTitle: 'Background Remover - Free Online AI Tool',
        ogDescription: 'Remove image background automatically with AI. Secure, fast, and free.',
      };
    }
    if (path === '/image/resize') {
      return {
        title: 'Image Resizer - Resize JPG, PNG, WebP | Lokit',
        description: 'Resize images online. Change dimensions and file size. Free online image resizer tool.',
        ogTitle: 'Image Resizer - Free Online Tool',
        ogDescription: 'Resize images online instantly. Secure, fast, and free.',
      };
    }
    if (path === '/image/compress') {
      return {
        title: 'Image Compressor - Reduce Image Size | Lokit',
        description: 'Compress JPG, PNG, WebP images. Reduce file size without losing quality. Free online image compressor.',
        ogTitle: 'Image Compressor - Free Online Tool',
        ogDescription: 'Reduce image file size instantly. Secure, fast, and free.',
      };
    }
    if (path === '/image/format') {
      return {
        title: 'Image Converter - Convert JPG, PNG, WebP | Lokit',
        description: 'Convert image formats online. JPG to PNG, PNG to JPG, WebP support. Free online image converter.',
        ogTitle: 'Image Converter - Free Online Tool',
        ogDescription: 'Convert image formats instantly. Secure, fast, and free.',
      };
    }
    if (path === '/image/crop') {
      return {
        title: 'Image Cropper - Crop Images Online | Lokit',
        description: 'Crop images online. Cut specific areas of your photos. Free online image cropper.',
        ogTitle: 'Image Cropper - Free Online Tool',
        ogDescription: 'Crop images online instantly. Secure, fast, and free.',
      };
    }

    // PDF Tools (Remaining)
    if (path === '/pdf/to-text') {
      return {
        title: 'PDF to Text - Extract Text from PDF Online | Lokit',
        description: 'Free online PDF to text converter. Extract text content from PDF files instantly. No signup required.',
        ogTitle: 'PDF to Text Converter - Free Online Tool',
        ogDescription: 'Extract text from PDF files instantly. Secure, fast, and free.',
      };
    }
    if (path === '/pdf/image-to-pdf') {
      return {
        title: 'Image to PDF - Convert JPG, PNG to PDF | Lokit',
        description: 'Convert images to PDF online. Support JPG, PNG, WebP. Merge multiple images into one PDF.',
        ogTitle: 'Image to PDF Converter - Free Online Tool',
        ogDescription: 'Convert images to PDF instantly. Secure, fast, and free.',
      };
    }
    if (path === '/pdf/split') {
      return {
        title: 'Split PDF - Separate PDF Pages Online | Lokit',
        description: 'Split PDF files online. Extract pages or split into multiple files. Free online PDF splitter.',
        ogTitle: 'Split PDF - Free Online Tool',
        ogDescription: 'Split PDF files instantly. Secure, fast, and free.',
      };
    }
    if (path === '/pdf/rotate') {
      return {
        title: 'Rotate PDF - Rotate PDF Pages Permanently | Lokit',
        description: 'Rotate PDF pages 90 or 180 degrees. Save permanently. Free online PDF rotator.',
        ogTitle: 'Rotate PDF - Free Online Tool',
        ogDescription: 'Rotate PDF pages instantly. Secure, fast, and free.',
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
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', metaInfo.ogTitle || metaInfo.title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', metaInfo.ogDescription || metaInfo.description);

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
  }, [metaInfo.title, metaInfo.description, metaInfo.ogTitle, metaInfo.ogDescription, locale, lang, location.pathname, t]);

  return null;
};

export default MetaUpdater;
