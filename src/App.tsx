import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

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

// Policy
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Licenses = lazy(() => import('./pages/Licenses'));

const App = () => {
  return (
    <BrowserRouter>
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

          {/* Policy Routes */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="licenses" element={<Licenses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
