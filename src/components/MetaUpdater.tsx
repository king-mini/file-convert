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

    if (path === '/') {
      return {
        title: lang === 'ko'
          ? 'Lokit - 무료 온라인 PDF 및 이미지 도구'
          : 'Lokit - Free Online PDF Converter & Image Tools',
        description: lang === 'ko'
          ? '무료 PDF 변환, 병합, 분할, 압축 및 이미지 배경 제거, 흐림 효과 도구. 설치 없이 브라우저에서 안전하게 파일을 편집하세요.'
          : 'Free online PDF & Image tools. Convert, merge, split, compress PDFs and edit images securely in your browser. No signup required.',
        ogTitle: lang === 'ko' ? 'Lokit - 무료 온라인 파일 도구' : 'Lokit - Free Online File Tools',
        ogDescription: lang === 'ko'
          ? 'PDF 변환, 이미지 편집을 위한 무료 온라인 도구 모음'
          : 'All-in-one free online tools for PDF and Images.',
        ogImage: '/og-home.png',
      };
    }

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

    // PDF Pages - Apply og-pdf.png to all PDF routes
    if (path.startsWith('/pdf') || path.startsWith('/guide/pdf')) {
      // We can set a default first, then specific overrides if needed.
      // However, the current structure uses specific if blocks. 
      // I'll add ogImage to each specific return or handle it generally.
      // Let's modify the specific blocks to include ogImage: '/og-pdf.png' 
      // OR simpler: set a defaultOgImage variable at the start of getMetaInfo?
      // Let's stick to modifying the specific blocks for clarity and safety in this file structure.
    }

    // 주요 도구 페이지별 SEO 최적화된 메타 태그
    if (path === '/pdf/to-jpg') {
      return {
        title: 'PDF to JPG - Convert PDF to High Quality JPG Images | Lokit',
        description: 'Free online PDF to JPG converter. Convert PDF pages to high-quality JPG images with adjustable quality and resolution. No signup required, 100% secure.',
        ogTitle: 'PDF to JPG Converter - Free Online Tool',
        ogDescription: 'Convert PDF to JPG images instantly in your browser. Secure, fast, and free.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/pdf/to-png') {
      return {
        title: 'PDF to PNG - Convert PDF to PNG Images with Transparency | Lokit',
        description: 'Free online PDF to PNG converter. Convert PDF pages to PNG images with optional transparency support. High quality, no signup required.',
        ogTitle: 'PDF to PNG Converter - Free Online Tool',
        ogDescription: 'Convert PDF to PNG images with transparency support. Secure, fast, and free.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/pdf/compress') {
      return {
        title: 'Compress PDF - Reduce PDF File Size Online | Lokit',
        description: 'Free online PDF compressor. Reduce PDF file size while maintaining quality. Adjustable compression settings, no signup required.',
        ogTitle: 'Compress PDF - Free Online PDF Compression Tool',
        ogDescription: 'Reduce PDF file size instantly. Secure, fast, and free compression tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/pdf/merge') {
      return {
        title: 'Merge PDF - Combine Multiple PDF Files into One | Lokit',
        description: 'Free online PDF merger. Combine multiple PDF files into one document. Reorder pages, no signup required, 100% secure.',
        ogTitle: 'Merge PDF - Free Online PDF Merger Tool',
        ogDescription: 'Combine multiple PDF files into one. Secure, fast, and free.',
        ogImage: '/og-pdf.png',
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
    if (path === '/guide/pdf-to-jpg') {
      return {
        title: lang === 'ko'
          ? 'PDF → JPG 가이드 - 고화질 이미지 변환 | Lokit'
          : 'PDF to JPG Guide - Export Pages as High-Quality Images | Lokit',
        description: lang === 'ko'
          ? '슬라이드와 영수증을 JPG로 바꾸는 단계별 방법과 도구 바로가기를 확인하세요.'
          : 'Step-by-step instructions for turning PDF pages into JPG files with a direct link to the converter.',
        ogTitle: lang === 'ko' ? 'PDF → JPG 가이드' : 'PDF to JPG Guide',
        ogDescription: lang === 'ko'
          ? 'JPG 품질·해상도 설정법과 도구 링크를 한 번에 제공합니다.'
          : 'Quality tips plus a shortcut to the PDF to JPG tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/pdf-to-png') {
      return {
        title: lang === 'ko'
          ? 'PDF → PNG 가이드 - 투명 배경 변환 | Lokit'
          : 'PDF to PNG Guide - Convert with Transparency | Lokit',
        description: lang === 'ko'
          ? '투명 배경과 해상도를 제어하면서 PDF를 PNG로 바꾸는 과정을 소개합니다.'
          : 'Learn how to export PDF pages as crisp PNG files with optional transparency and a link to the tool.',
        ogTitle: lang === 'ko' ? 'PDF → PNG 가이드' : 'PDF to PNG Guide',
        ogDescription: lang === 'ko'
          ? '아이콘·스티커 제작에 필요한 PNG 변환 팁을 제공합니다.'
          : 'Tips for producing pixel-perfect PNG exports.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/pdf-to-text') {
      return {
        title: lang === 'ko'
          ? 'PDF → Text 가이드 - 텍스트 추출 | Lokit'
          : 'PDF to Text Guide - Extract Editable Copy | Lokit',
        description: lang === 'ko'
          ? 'PDF에서 텍스트를 복사하고 TXT로 저장하는 과정을 단계별로 안내합니다.'
          : 'Follow this guide to copy PDF text or download a TXT file with a link to the extraction tool.',
        ogTitle: lang === 'ko' ? 'PDF → Text 가이드' : 'PDF to Text Guide',
        ogDescription: lang === 'ko'
          ? '텍스트 추출 팁과 도구 바로가기를 제공합니다.'
          : 'Extraction best practices plus a shortcut to the tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/image-to-pdf') {
      return {
        title: lang === 'ko'
          ? '이미지 → PDF 가이드 - 사진 묶음 만들기 | Lokit'
          : 'Image to PDF Guide - Package Photos into One File | Lokit',
        description: lang === 'ko'
          ? '이미지를 순서대로 정리하고 PDF로 내보내는 방법을 안내합니다.'
          : 'How to reorder, configure, and export multiple images into a single PDF with tool access.',
        ogTitle: lang === 'ko' ? '이미지 → PDF 가이드' : 'Image to PDF Guide',
        ogDescription: lang === 'ko'
          ? '이미지 묶음을 PDF로 만드는 팁과 도구 링크.'
          : 'Packaging tips and a link to the Image to PDF tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/merge-pdf') {
      return {
        title: lang === 'ko'
          ? 'PDF 병합 가이드 - 브라우저에서 한 번에 | Lokit'
          : 'Merge PDF Guide - Combine Files Securely | Lokit',
        description: lang === 'ko'
          ? '여러 PDF를 순서대로 정리하고 합치는 방법과 도구 링크를 제공합니다.'
          : 'Learn how to reorder and merge PDFs entirely in the browser with a direct tool link.',
        ogTitle: lang === 'ko' ? 'PDF 병합 가이드' : 'Merge PDF Guide',
        ogDescription: lang === 'ko'
          ? '병합 팁과 PDF 병합 도구 바로가기를 함께 확인하세요.'
          : 'Merging checklist plus a shortcut to the Merge PDF tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/split-pdf') {
      return {
        title: lang === 'ko'
          ? 'PDF 분할 가이드 - 페이지 범위 추출 | Lokit'
          : 'Split PDF Guide - Extract the Pages You Need | Lokit',
        description: lang === 'ko'
          ? '범위/추출 모드를 활용해 필요한 페이지만 나누는 과정을 안내합니다.'
          : 'Step-by-step instructions for splitting or extracting PDF pages with a link to the tool.',
        ogTitle: lang === 'ko' ? 'PDF 분할 가이드' : 'Split PDF Guide',
        ogDescription: lang === 'ko'
          ? '분할 팁과 PDF 분할 도구 바로가기 제공.'
          : 'Splitting tips and a shortcut to the Split PDF tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/rotate-pdf') {
      return {
        title: lang === 'ko'
          ? 'PDF 회전 가이드 - 스캔본 방향 맞추기 | Lokit'
          : 'Rotate PDF Guide - Fix Upside-Down Scans | Lokit',
        description: lang === 'ko'
          ? '잘못 스캔된 페이지를 90°/180°로 돌리는 방법과 도구 링크를 제공합니다.'
          : 'Learn how to rotate PDFs locally and keep scans readable, plus a link to the rotation tool.',
        ogTitle: lang === 'ko' ? 'PDF 회전 가이드' : 'Rotate PDF Guide',
        ogDescription: lang === 'ko'
          ? '회전 팁과 도구 바로가기를 확인하세요.'
          : 'Rotation best practices plus a shortcut to the Rotate PDF tool.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/guide/compress-pdf') {
      return {
        title: lang === 'ko'
          ? 'PDF 압축 가이드 - 용량 줄이고 품질 지키기 | Lokit'
          : 'Compress PDF Guide - Shrink Files Without Losing Clarity | Lokit',
        description: lang === 'ko'
          ? '이메일·LMS 제한을 통과하도록 PDF 용량을 줄이는 방법과 도구 링크를 제공합니다.'
          : 'Guide to balancing PDF size and quality with direct access to the compression tool.',
        ogTitle: lang === 'ko' ? 'PDF 압축 가이드' : 'Compress PDF Guide',
        ogDescription: lang === 'ko'
          ? '압축 팁과 PDF 압축 도구 바로가기 제공.'
          : 'Compression checklist plus a shortcut to the Compress PDF tool.',
        ogImage: '/og-pdf.png',
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
        ogImage: '/og-pdf.png',
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
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/pdf/image-to-pdf') {
      return {
        title: 'Image to PDF - Convert JPG, PNG to PDF | Lokit',
        description: 'Convert images to PDF online. Support JPG, PNG, WebP. Merge multiple images into one PDF.',
        ogTitle: 'Image to PDF Converter - Free Online Tool',
        ogDescription: 'Convert images to PDF instantly. Secure, fast, and free.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/pdf/split') {
      return {
        title: 'Split PDF - Separate PDF Pages Online | Lokit',
        description: 'Split PDF files online. Extract pages or split into multiple files. Free online PDF splitter.',
        ogTitle: 'Split PDF - Free Online Tool',
        ogDescription: 'Split PDF files instantly. Secure, fast, and free.',
        ogImage: '/og-pdf.png',
      };
    }
    if (path === '/pdf/rotate') {
      return {
        title: 'Rotate PDF - Rotate PDF Pages Permanently | Lokit',
        description: 'Rotate PDF pages 90 or 180 degrees. Save permanently. Free online PDF rotator.',
        ogTitle: 'Rotate PDF - Free Online Tool',
        ogDescription: 'Rotate PDF pages instantly. Secure, fast, and free.',
        ogImage: '/og-pdf.png',
      };
    }

    // 기본값
    return {
      title: 'Lokit - File Tools',
      description: t('meta.description'),
      ogImage: '/og-default.png', // Default image (Person photo)
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

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    // Use the provided ogImage or a default. 
    // Ideally this should be an absolute URL.
    const imageUrl = metaInfo.ogImage
      ? (metaInfo.ogImage.startsWith('http') ? metaInfo.ogImage : `https://lokit.tools${metaInfo.ogImage}`)
      : 'https://lokit.tools/lokit-logo.svg'; // Fallback to logo if nothing else
    ogImage.setAttribute('content', imageUrl);


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
  }, [metaInfo.title, metaInfo.description, metaInfo.ogTitle, metaInfo.ogDescription, metaInfo.ogImage, locale, lang, location.pathname, t]);

  return null;
};

export default MetaUpdater;
