import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PdfToJpg from './pages/PdfToJpg';
import PdfToPng from './pages/PdfToPng';
import PdfToText from './pages/PdfToText';
import ImageToPdf from './pages/ImageToPdf';
import MergePdf from './pages/MergePdf';
import SplitPdf from './pages/SplitPdf';
import RotatePdf from './pages/RotatePdf';
import CompressPdf from './pages/CompressPdf';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="pdf-to-png" element={<PdfToPng />} />
          <Route path="pdf-to-text" element={<PdfToText />} />
          <Route path="image-to-pdf" element={<ImageToPdf />} />
          <Route path="merge-pdf" element={<MergePdf />} />
          <Route path="split-pdf" element={<SplitPdf />} />
          <Route path="rotate-pdf" element={<RotatePdf />} />
          <Route path="compress-pdf" element={<CompressPdf />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
