import './Policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>

        <section className="policy-section">
          <h2>1. Overview</h2>
          <p>Lokit ("Service") takes your privacy very seriously. This Privacy Policy explains what information we collect when you use our Service and how we use it.</p>
        </section>

        <section className="policy-section">
          <h2>2. File Processing</h2>
          <p>This Service operates 100% client-side:</p>
          <ul>
            <li>All files are processed only in your browser</li>
            <li>Files are not uploaded to any server</li>
            <li>Files are immediately deleted from memory after processing</li>
            <li>Files are not stored in cookies or local storage</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Information We Collect</h2>
          <p>This Service may collect the following information:</p>
          <h3>Google Analytics</h3>
          <p>We collect anonymous analytics data such as page visits and usage patterns. No personally identifiable information is included.</p>
          <h3>Google AdSense</h3>
          <p>We collect information about ad impressions and clicks. Cookies may be used to collect advertising-related data.</p>
        </section>

        <section className="policy-section">
          <h2>4. Cookie Usage</h2>
          <p>This Service may use cookies for the following purposes:</p>
          <ul>
            <li>Analytics cookies: Usage pattern analysis through Google Analytics</li>
            <li>Advertising cookies: Personalized ads through Google AdSense</li>
            <li>Settings cookies: Storing user preferences (optional)</li>
          </ul>
          <p>You can delete or block cookies at any time through your browser settings.</p>
        </section>

        <section className="policy-section">
          <h2>5. Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through the GitHub repository issues.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

