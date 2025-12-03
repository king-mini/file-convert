import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MetaUpdater = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const locale = t('locale');
  const searchParams = new URLSearchParams(location.search);
  const langParam = searchParams.get('lang');
  const lang = langParam || (i18n.language || 'en').split('-')[0];

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
        title: lang === 'ko'
          ? '무료 배경 흐림 도구 - 사진 배경 흐리기 | Lokit'
          : 'Free Online Background Blur Tool - Blur Photo Background Instantly | Lokit',
        description: lang === 'ko'
          ? '온라인에서 사진 배경을 흐리게 하세요. 프로필 사진, 증명사진 배경을 전문적으로 처리합니다. 무료, 회원가입 불필요.'
          : 'Blur photo backgrounds online. Perfect for portraits, profile photos, and headshots. Free, no signup required, 100% private.',
        ogTitle: lang === 'ko' ? '무료 배경 흐림 도구' : 'Free Background Blur Tool',
        ogDescription: lang === 'ko'
          ? '프로필 사진 배경을 전문적으로 흐리게 처리하세요'
          : 'Blur photo backgrounds for portraits automatically. Keep people sharp, blur the background.',
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
    if (path === '/guide/blur-background') {
      return {
        title: lang === 'ko'
          ? '배경 흐리기 가이드 - 단계별 튜토리얼 | Lokit'
          : 'How to Blur Background Online - Step-by-Step Guide | Lokit',
        description: lang === 'ko'
          ? '프로필·증명사진 배경 흐리기를 단계별로 따라하세요. 스크린샷과 팁, 도구 바로가기 포함.'
          : 'Follow this step-by-step guide to blur photo backgrounds online with screenshots, tips, and a link to the Background Blur tool.',
        ogTitle: lang === 'ko' ? '배경 흐리기 가이드' : 'Background Blur Guide',
        ogDescription: lang === 'ko'
          ? '배경 흐림 튜토리얼과 도구 링크로 바로 처리하세요.'
          : 'Tutorial for blurring backgrounds with a direct link to the tool.',
      };
    }
    if (path === '/guide/background-remove') {
      return {
        title: lang === 'ko'
          ? '배경 제거 가이드 - 투명 PNG 만들기 | Lokit'
          : 'Background Remove Guide - Create Transparent PNGs | Lokit',
        description: lang === 'ko'
          ? 'AI로 배경을 지우고 PNG로 내보내는 방법을 정리했습니다. 상품 사진, 프로필 컷에 활용하세요.'
          : 'Learn how to remove image backgrounds with AI and export clean PNG cutouts for products or profiles.',
        ogTitle: lang === 'ko' ? '배경 제거 가이드' : 'Background Remove Guide',
        ogDescription: lang === 'ko'
          ? '컷아웃 팁과 도구 바로가기를 한 번에 확인하세요.'
          : 'Follow the walkthrough and jump straight into the Background Remove tool.',
      };
    }
    if (path === '/guide/image-resize') {
      return {
        title: lang === 'ko'
          ? '이미지 리사이즈 가이드 - SNS/웹 규격 맞추기 | Lokit'
          : 'Image Resize Guide - Match SNS & Web Dimensions | Lokit',
        description: lang === 'ko'
          ? '링크드인, 쇼핑몰, 블로그 등 채널별 권장 크기를 맞추는 과정을 안내합니다.'
          : 'Step-by-step checklist for resizing images for LinkedIn, shops, and blogs without losing quality.',
        ogTitle: lang === 'ko' ? '이미지 리사이즈 가이드' : 'Image Resize Guide',
        ogDescription: lang === 'ko'
          ? '리사이즈 플로우와 도구 링크를 함께 제공합니다.'
          : 'Resize workflow plus a direct link to the Image Resize tool.',
      };
    }
    if (path === '/guide/image-compress') {
      return {
        title: lang === 'ko'
          ? '이미지 압축 가이드 - 용량 줄이고 품질 지키기 | Lokit'
          : 'Image Compress Guide - Shrink Files Without Losing Quality | Lokit',
        description: lang === 'ko'
          ? '웹/이메일 업로드 전 꼭 거쳐야 할 압축 방법을 정리했습니다.'
          : 'Optimize images for the web, email, and LMS submissions in minutes.',
        ogTitle: lang === 'ko' ? '이미지 압축 가이드' : 'Image Compress Guide',
        ogDescription: lang === 'ko'
          ? '품질 유지 팁과 도구를 함께 안내합니다.'
          : 'Compression tips plus the Image Compress tool link.',
      };
    }
    if (path === '/guide/format-convert') {
      return {
        title: lang === 'ko'
          ? '포맷 변환 가이드 - JPG/PNG/WebP 전환 | Lokit'
          : 'Format Convert Guide - JPG/PNG/WebP Workflow | Lokit',
        description: lang === 'ko'
          ? '투명 배경 유지, 용량 최적화 등 상황별 포맷 선택법을 제공합니다.'
          : 'Decide when to use JPG, PNG, or WebP and convert your assets instantly.',
        ogTitle: lang === 'ko' ? '포맷 변환 가이드' : 'Format Convert Guide',
        ogDescription: lang === 'ko'
          ? '포맷 선택 기준과 도구 사용법을 확인하세요.'
          : 'Format tips plus a shortcut to the Format Convert tool.',
      };
    }
    if (path === '/guide/image-crop') {
      return {
        title: lang === 'ko'
          ? '이미지 자르기 가이드 - 안전한 구도 만들기 | Lokit'
          : 'Image Crop Guide - Frame Shots for Every Channel | Lokit',
        description: lang === 'ko'
          ? 'SNS·광고·상품 페이지에서 필요한 비율과 구도 체크리스트를 제공합니다.'
          : 'Crop images to precise ratios for social, ads, and product detail pages.',
        ogTitle: lang === 'ko' ? '이미지 자르기 가이드' : 'Image Crop Guide',
        ogDescription: lang === 'ko'
          ? '크롭 노하우와 Image Crop 도구를 함께 살펴보세요.'
          : 'Cropping tips with a direct link to the Image Crop tool.',
      };
    }

    // Category Pages - PDF Tools
    if (path === '/pdf') {
      return {
        title: lang === 'ko'
          ? '무료 온라인 PDF 도구 - PDF 변환, 병합, 분할 | Lokit'
          : 'Free Online PDF Tools - Convert, Merge & Split PDFs | Lokit',
        description: lang === 'ko'
          ? '무료 PDF 병합, 분할, 변환 도구. 8가지 기능으로 PDF를 온라인에서 빠르게 처리하세요. 회원가입 불필요, 100% 안전.'
          : '8 free PDF tools: convert, merge, split, compress, and more. Process PDFs securely in your browser. No signup required.',
        ogTitle: lang === 'ko' ? '무료 온라인 PDF 도구' : 'Free Online PDF Tools',
        ogDescription: lang === 'ko'
          ? 'PDF 변환, 병합, 분할, 압축 등 8가지 무료 도구'
          : '8 powerful tools to convert, merge, split, and compress PDFs online',
      };
    }

    // Category Pages - Image Tools
    if (path === '/image') {
      return {
        title: lang === 'ko'
          ? '무료 온라인 이미지 도구 - 배경 흐림, 배경 제거 등 | Lokit'
          : 'Free Online Image Tools - Background Blur, Remove & More | Lokit',
        description: lang === 'ko'
          ? '배경 흐림, 배경 제거, 이미지 크기 변경, 압축 등 6가지 무료 사진 편집 도구. 회원가입 불필요, 100% 안전.'
          : '6 free image tools: background blur, background remove, resize, compress, format convert, and crop. Edit in your browser.',
        ogTitle: lang === 'ko' ? '무료 온라인 이미지 도구' : 'Free Online Image Tools',
        ogDescription: lang === 'ko'
          ? '배경 흐림, 배경 제거 등 6가지 무료 이미지 편집 도구'
          : '6 free photo editing tools for professional results',
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

    // Canonical URL
    let canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (!canonicalUrl) {
      canonicalUrl = document.createElement('link');
      canonicalUrl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalUrl);
    }
    const canonicalPath = `${location.pathname}${lang === 'ko' ? '?lang=ko' : ''}`;
    canonicalUrl.setAttribute('href', `https://lokit.tools${canonicalPath}`);

    // Hreflang Tags
    const updateHreflang = (hreflang: string, path: string) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', `https://lokit.tools${path}`);
    };

    updateHreflang('ko', `${location.pathname}?lang=ko`);
    updateHreflang('en', location.pathname);
    updateHreflang('x-default', location.pathname);

  }, [metaInfo.title, metaInfo.description, metaInfo.ogTitle, metaInfo.ogDescription, locale, lang, location.pathname, t]);

  return null;
};

export default MetaUpdater;
