import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import { urlCodeToLang } from './i18n';

const Hub = lazy(() => import('./pages/Hub'));

// PDF
const PdfHome = lazy(() => import('./pages/pdf/PdfHome'));
const PdfToJpg = lazy(() => import('./pages/pdf/PdfToJpg'));
const PdfToPng = lazy(() => import('./pages/pdf/PdfToPng'));
const PdfToText = lazy(() => import('./pages/pdf/PdfToText'));
const ImageToPdf = lazy(() => import('./pages/pdf/ImageToPdf'));
const MergePdf = lazy(() => import('./pages/pdf/MergePdf'));
const SplitPdf = lazy(() => import('./pages/pdf/SplitPdf'));
const RotatePdf = lazy(() => import('./pages/pdf/RotatePdf'));
const CompressPdf = lazy(() => import('./pages/pdf/CompressPdf'));

// Image
const ImageHome = lazy(() => import('./pages/image/ImageHome'));
const BackgroundBlur = lazy(() => import('./pages/image/BackgroundBlur'));
const BlurFace = lazy(() => import('./pages/image/BlurFace'));
const RedactImage = lazy(() => import('./pages/image/RedactImage'));
const BackgroundRemove = lazy(() => import('./pages/image/BackgroundRemove'));
const ImageResize = lazy(() => import('./pages/image/ImageResize'));
const ImageCompress = lazy(() => import('./pages/image/ImageCompress'));
const FormatConvert = lazy(() => import('./pages/image/FormatConvert'));
const ImageCrop = lazy(() => import('./pages/image/ImageCrop'));
const BackgroundBlurGuide = lazy(() => import('./pages/guides/BackgroundBlurGuide'));
const BackgroundRemoveGuide = lazy(() => import('./pages/guides/BackgroundRemoveGuide'));
const ImageResizeGuide = lazy(() => import('./pages/guides/ImageResizeGuide'));
const ImageCompressGuide = lazy(() => import('./pages/guides/ImageCompressGuide'));
const FormatConvertGuide = lazy(() => import('./pages/guides/FormatConvertGuide'));
const ImageCropGuide = lazy(() => import('./pages/guides/ImageCropGuide'));
const PdfToJpgGuide = lazy(() => import('./pages/guides/PdfToJpgGuide'));
const PdfToPngGuide = lazy(() => import('./pages/guides/PdfToPngGuide'));
const PdfToTextGuide = lazy(() => import('./pages/guides/PdfToTextGuide'));
const ImageToPdfGuide = lazy(() => import('./pages/guides/ImageToPdfGuide'));
const MergePdfGuide = lazy(() => import('./pages/guides/MergePdfGuide'));
const SplitPdfGuide = lazy(() => import('./pages/guides/SplitPdfGuide'));
const RotatePdfGuide = lazy(() => import('./pages/guides/RotatePdfGuide'));
const CompressPdfGuide = lazy(() => import('./pages/guides/CompressPdfGuide'));
const BlurFaceGuide = lazy(() => import('./pages/guides/BlurFaceGuide'));
const RedactImageGuide = lazy(() => import('./pages/guides/RedactImageGuide'));

// Policy
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Licenses = lazy(() => import('./pages/Licenses'));

// 언어 변경을 감지하고 i18n에 적용하는 래퍼 컴포넌트
const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      const i18nLang = urlCodeToLang(lang);
      if (i18n.language !== i18nLang) {
        i18n.changeLanguage(i18nLang);
      }
    }
  }, [lang, i18n]);

  return <>{children}</>;
};

// 브라우저 언어에 따라 기본 언어로 리다이렉트
// ?lang= 쿼리 파라미터가 있으면 해당 언어로 리다이렉트
const DefaultRedirect = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const queryLang = searchParams.get('lang');

  // ?lang= 쿼리 파라미터 처리
  if (queryLang) {
    const validLangs = ['en', 'pt', 'es', 'ko'];
    const targetLang = validLangs.includes(queryLang) ? queryLang : 'en';
    // 프로덕션에서는 한국어 비활성화
    const finalLang = (targetLang === 'ko' && import.meta.env.PROD) ? 'en' : targetLang;
    return <Navigate to={`/${finalLang}`} replace />;
  }

  // 브라우저 언어 기반 리다이렉트
  const browserLang = navigator.language?.toLowerCase() || '';
  let targetLang = 'en';

  if (browserLang.startsWith('pt')) targetLang = 'pt';
  else if (browserLang.startsWith('es')) targetLang = 'es';
  else if (browserLang.startsWith('ko') && !import.meta.env.PROD) targetLang = 'ko';

  return <Navigate to={`/${targetLang}`} replace />;
};

const App = () => {
  // ?lang= 쿼리 파라미터가 있으면 리다이렉트
  const searchParams = new URLSearchParams(window.location.search);
  const queryLang = searchParams.get('lang');

  if (queryLang) {
    const validLangs = ['en', 'pt', 'es', 'ko'];
    let targetLang = validLangs.includes(queryLang) ? queryLang : 'en';
    if (targetLang === 'ko' && import.meta.env.PROD) targetLang = 'en';

    const pathname = window.location.pathname;
    const pathWithoutLang = pathname.replace(/^\/(en|pt|es|ko)/, '') || '/';
    const newPath = `/${targetLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    window.location.replace(newPath);
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect based on browser language */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Language-prefixed routes */}
        <Route path="/:lang" element={<LanguageWrapper><Layout /></LanguageWrapper>}>
          {/* Hub - Main Page */}
          <Route index element={<Hub />} />

          {/* PDF Routes */}
          <Route path="pdf" element={<PdfHome />} />
          <Route path="pdf/to-jpg" element={<PdfToJpg />} />
          <Route path="pdf/to-png" element={<PdfToPng />} />
          <Route path="pdf/to-text" element={<PdfToText />} />
          <Route path="pdf/image-to-pdf" element={<ImageToPdf />} />
          <Route path="pdf/merge" element={<MergePdf />} />
          <Route path="pdf/split" element={<SplitPdf />} />
          <Route path="pdf/rotate" element={<RotatePdf />} />
          <Route path="pdf/compress" element={<CompressPdf />} />

          {/* Image Routes */}
          <Route path="image" element={<ImageHome />} />
          <Route path="image/blur-background" element={<BackgroundBlur />} />
          <Route path="image/bg-remove" element={<BackgroundRemove />} />
          <Route path="image/resize" element={<ImageResize />} />
          <Route path="image/compress" element={<ImageCompress />} />
          <Route path="image/format" element={<FormatConvert />} />
          <Route path="image/crop" element={<ImageCrop />} />
          <Route path="guide/blur-background" element={<BackgroundBlurGuide />} />
          <Route path="guide/background-remove" element={<BackgroundRemoveGuide />} />
          <Route path="guide/image-resize" element={<ImageResizeGuide />} />
          <Route path="guide/image-compress" element={<ImageCompressGuide />} />
          <Route path="guide/format-convert" element={<FormatConvertGuide />} />
          <Route path="guide/image-crop" element={<ImageCropGuide />} />
          <Route path="guide/pdf-to-jpg" element={<PdfToJpgGuide />} />
          <Route path="guide/pdf-to-png" element={<PdfToPngGuide />} />
          <Route path="guide/pdf-to-text" element={<PdfToTextGuide />} />
          <Route path="guide/image-to-pdf" element={<ImageToPdfGuide />} />
          <Route path="guide/merge-pdf" element={<MergePdfGuide />} />
          <Route path="guide/split-pdf" element={<SplitPdfGuide />} />
          <Route path="guide/rotate-pdf" element={<RotatePdfGuide />} />
          <Route path="guide/compress-pdf" element={<CompressPdfGuide />} />

          {/* Dev Only Routes */}
          {!import.meta.env.PROD && (
            <>
              <Route path="image/blur-face" element={<BlurFace />} />
              <Route path="image/redact" element={<RedactImage />} />
              <Route path="guide/blur-face" element={<BlurFaceGuide />} />
              <Route path="guide/redact" element={<RedactImageGuide />} />
            </>
          )}

          {/* Policy Routes */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="licenses" element={<Licenses />} />
        </Route>

        {/* Legacy URL redirects (for SEO - redirect old URLs to /en/) */}
        <Route path="/pdf/*" element={<Navigate to={`/en/pdf/${window.location.pathname.replace('/pdf/', '')}`} replace />} />
        <Route path="/image/*" element={<Navigate to={`/en/image/${window.location.pathname.replace('/image/', '')}`} replace />} />
        <Route path="/guide/*" element={<Navigate to={`/en/guide/${window.location.pathname.replace('/guide/', '')}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
