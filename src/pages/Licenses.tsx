import './Policy.css';

const Licenses = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Open Source Licenses</h1>

        <section className="policy-section">
          <p>This Service uses the following open source libraries. Each library follows its respective project license.</p>
        </section>

        <section className="policy-section">
          <h2>PDF.js</h2>
          <p><strong>License:</strong> Apache 2.0</p>
          <p><strong>Repository:</strong> <a href="https://mozilla.github.io/pdf.js/" target="_blank" rel="noopener noreferrer">https://mozilla.github.io/pdf.js/</a></p>
          <p>Used for PDF rendering and text extraction.</p>
        </section>

        <section className="policy-section">
          <h2>pdf-lib</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://pdf-lib.js.org/" target="_blank" rel="noopener noreferrer">https://pdf-lib.js.org/</a></p>
          <p>Used for PDF creation, modification, and merging.</p>
        </section>

        <section className="policy-section">
          <h2>jsPDF</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://github.com/parallax/jsPDF" target="_blank" rel="noopener noreferrer">https://github.com/parallax/jsPDF</a></p>
          <p>Used for converting images to PDF.</p>
        </section>

        <section className="policy-section">
          <h2>JSZip</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://stuk.github.io/jszip/" target="_blank" rel="noopener noreferrer">https://stuk.github.io/jszip/</a></p>
          <p>Used for ZIP file creation.</p>
        </section>

        <section className="policy-section">
          <h2>FileSaver.js</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://github.com/eligrey/FileSaver.js" target="_blank" rel="noopener noreferrer">https://github.com/eligrey/FileSaver.js</a></p>
          <p>Used for file downloads.</p>
        </section>

        <section className="policy-section">
          <h2>@mediapipe/selfie_segmentation</h2>
          <p><strong>License:</strong> Apache 2.0</p>
          <p><strong>Repository:</strong> <a href="https://google.github.io/mediapipe/" target="_blank" rel="noopener noreferrer">https://google.github.io/mediapipe/</a></p>
          <p>Used for portrait segmentation (background blur, background removal).</p>
        </section>

        <section className="policy-section">
          <h2>React</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">https://react.dev/</a></p>
          <p>Used as a UI framework.</p>
        </section>

        <section className="policy-section">
          <h2>React Router</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">https://reactrouter.com/</a></p>
          <p>Used for routing.</p>
        </section>

        <section className="policy-section">
          <h2>react-i18next</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://react.i18next.com/" target="_blank" rel="noopener noreferrer">https://react.i18next.com/</a></p>
          <p>Used for internationalization support.</p>
        </section>

        <section className="policy-section">
          <h2>Vite</h2>
          <p><strong>License:</strong> MIT</p>
          <p><strong>Repository:</strong> <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">https://vitejs.dev/</a></p>
          <p>Used as a build tool.</p>
        </section>
      </div>
    </div>
  );
};

export default Licenses;

