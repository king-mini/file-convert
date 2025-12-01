import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Loading from './components/Loading';

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
const BackgroundRemove = lazy(() => import('./pages/image/BackgroundRemove'));
const ImageResize = lazy(() => import('./pages/image/ImageResize'));
const ImageCompress = lazy(() => import('./pages/image/ImageCompress'));
const FormatConvert = lazy(() => import('./pages/image/FormatConvert'));
const ImageCrop = lazy(() => import('./pages/image/ImageCrop'));

// Policy
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Licenses = lazy(() => import('./pages/Licenses'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
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

            {/* Policy Routes */}
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="licenses" element={<Licenses />} />

            {/* Redirects - Old URLs to New URLs */}
            <Route path="pdf-to-jpg" element={<Navigate to="/pdf/to-jpg" replace />} />
            <Route path="pdf-to-png" element={<Navigate to="/pdf/to-png" replace />} />
            <Route path="pdf-to-text" element={<Navigate to="/pdf/to-text" replace />} />
            <Route path="image-to-pdf" element={<Navigate to="/pdf/image-to-pdf" replace />} />
            <Route path="merge-pdf" element={<Navigate to="/pdf/merge" replace />} />
            <Route path="split-pdf" element={<Navigate to="/pdf/split" replace />} />
            <Route path="rotate-pdf" element={<Navigate to="/pdf/rotate" replace />} />
            <Route path="compress-pdf" element={<Navigate to="/pdf/compress" replace />} />
            <Route path="image/portrait-blur" element={<Navigate to="/image/blur-background" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
