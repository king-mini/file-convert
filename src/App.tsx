import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PdfToJpg from './pages/PdfToJpg';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pdf-to-jpg" element={<PdfToJpg />} />
          {/* 추가 라우트는 여기에 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
