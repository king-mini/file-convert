import { useTranslation } from 'react-i18next';
import './Policy.css';

const Licenses = () => {
  const { t } = useTranslation();

  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">{t('policy.licenses.title')}</h1>
        <p className="policy-updated">{t('policy.licenses.updated')}</p>

        <section className="policy-section">
          <p>{t('policy.licenses.intro')}</p>
        </section>

        <section className="policy-section">
          <h2>PDF.js</h2>
          <p><strong>라이선스:</strong> Apache 2.0</p>
          <p><strong>저장소:</strong> <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer">https://mozilla.github.io/pdf.js/</a></p>
          <p>PDF 렌더링 및 텍스트 추출에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>pdf-lib</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer">https://pdf-lib.js.org/</a></p>
          <p>PDF 생성, 수정, 병합에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>jsPDF</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://github.com/parallax/jsPDF" target="_blank" rel="noopener noreferrer">https://github.com/parallax/jsPDF</a></p>
          <p>이미지를 PDF로 변환하는 데 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>JSZip</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://stuk.github.io/jszip/" target="_blank" rel="noopener noreferrer">https://stuk.github.io/jszip/</a></p>
          <p>ZIP 파일 생성에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>FileSaver.js</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://github.com/eligrey/FileSaver.js" target="_blank" rel="noopener noreferrer">https://github.com/eligrey/FileSaver.js</a></p>
          <p>파일 다운로드에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>@mediapipe/selfie_segmentation</h2>
          <p><strong>라이선스:</strong> Apache 2.0</p>
          <p><strong>저장소:</strong> <a href="https://google.github.io/mediapipe/" target="_blank" rel="noopener noreferrer">https://google.github.io/mediapipe/</a></p>
          <p>인물 세그멘테이션(배경 흐리기, 배경 제거)에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>React</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">https://react.dev/</a></p>
          <p>UI 프레임워크로 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>React Router</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">https://reactrouter.com/</a></p>
          <p>라우팅에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>react-i18next</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://react.i18next.com/" target="_blank" rel="noopener noreferrer">https://react.i18next.com/</a></p>
          <p>다국어 지원에 사용됩니다.</p>
        </section>

        <section className="policy-section">
          <h2>Vite</h2>
          <p><strong>라이선스:</strong> MIT</p>
          <p><strong>저장소:</strong> <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">https://vitejs.dev/</a></p>
          <p>빌드 도구로 사용됩니다.</p>
        </section>
      </div>
    </div>
  );
};

export default Licenses;

