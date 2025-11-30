import './Policy.css';

const Terms = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Terms of Service</h1>

        <section className="policy-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By using this Service, you agree to these Terms of Service. If you do not agree, you may not use the Service.</p>
        </section>

        <section className="policy-section">
          <h2>2. Service Provision</h2>
          <p>This Service is provided as follows:</p>
          <ul>
            <li>This Service is provided "AS-IS"</li>
            <li>We do not guarantee the quality or results of conversions</li>
            <li>Please backup important documents before processing</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Usage Restrictions</h2>
          <p>The following activities are prohibited:</p>
          <ul>
            <li>Processing illegal content</li>
            <li>Processing content that infringes copyright</li>
            <li>Excessive use that harms service stability</li>
            <li>Attempts to bypass technical security of the Service</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Disclaimer</h2>
          <p>This Service is not responsible for:</p>
          <ul>
            <li>Data loss or conversion failures</li>
            <li>Service interruptions or errors</li>
            <li>Direct or indirect damages resulting from use of the Service</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Changes to Terms</h2>
          <p>These Terms may be changed without prior notice. Changes will be posted on this page, and continued use of the Service constitutes acceptance of the modified Terms.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;

