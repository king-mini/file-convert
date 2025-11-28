import { useTranslation } from 'react-i18next';
import './Loading.css';

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="page-loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="loading-text">{t('common.loading')}</p>
    </div>
  );
};

export default Loading;
