import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const { lang } = useParams<{ lang: string }>();
    const langPrefix = lang ? `/${lang}` : '/en';

    return (
        <footer className="footer">
            <p>{t('footer.notice')}</p>
            <div className="footer-links">
                <Link to={`${langPrefix}/privacy-policy`}>{t('footer.privacy')}</Link>
                <span className="footer-separator">·</span>
                <Link to={`${langPrefix}/terms`}>{t('footer.terms')}</Link>
                <span className="footer-separator">·</span>
                <Link to={`${langPrefix}/licenses`}>{t('footer.licenses')}</Link>
                <span className="footer-separator">·</span>
                <span className="footer-version">v{import.meta.env.PACKAGE_VERSION}</span>
            </div>
        </footer>
    );
};

export default Footer;
