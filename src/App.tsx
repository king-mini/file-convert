import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PdfToJpg from './pages/PdfToJpg';
import PdfToPng from './pages/PdfToPng';
import PdfToText from './pages/PdfToText';
import ImageToPdf from './pages/ImageToPdf';

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
          {/* 추가 라우트는 여기에 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
