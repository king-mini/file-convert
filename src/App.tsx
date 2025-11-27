import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Hub from './pages/Hub';
import PdfHome from './pages/pdf/PdfHome';
import PdfToJpg from './pages/pdf/PdfToJpg';
import PdfToPng from './pages/pdf/PdfToPng';
import PdfToText from './pages/pdf/PdfToText';
import ImageToPdf from './pages/pdf/ImageToPdf';
import MergePdf from './pages/pdf/MergePdf';
import SplitPdf from './pages/pdf/SplitPdf';
import RotatePdf from './pages/pdf/RotatePdf';
import CompressPdf from './pages/pdf/CompressPdf';
import ImageHome from './pages/image/ImageHome';
import PortraitBlur from './pages/image/PortraitBlur';
import BackgroundRemove from './pages/image/BackgroundRemove';

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
          <Route path="image/portrait-blur" element={<PortraitBlur />} />
          <Route path="image/bg-remove" element={<BackgroundRemove />} />
          
          {/* Redirects - Old URLs to New URLs */}
          <Route path="pdf-to-jpg" element={<Navigate to="/pdf/to-jpg" replace />} />
          <Route path="pdf-to-png" element={<Navigate to="/pdf/to-png" replace />} />
          <Route path="pdf-to-text" element={<Navigate to="/pdf/to-text" replace />} />
          <Route path="image-to-pdf" element={<Navigate to="/pdf/image-to-pdf" replace />} />
          <Route path="merge-pdf" element={<Navigate to="/pdf/merge" replace />} />
          <Route path="split-pdf" element={<Navigate to="/pdf/split" replace />} />
          <Route path="rotate-pdf" element={<Navigate to="/pdf/rotate" replace />} />
          <Route path="compress-pdf" element={<Navigate to="/pdf/compress" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
