import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ToolBreadcrumb.css';

type ToolBreadcrumbProps = {
  currentLabel: string;
  guidePath?: string;
  guideLabel?: string;
  categoryPath?: string;
  categoryLabel?: string;
  className?: string;
};

const ToolBreadcrumb = ({
  currentLabel,
  guidePath,
  guideLabel,
  categoryPath = '/image',
  categoryLabel,
  className,
}: ToolBreadcrumbProps) => {
  const { t } = useTranslation();

  const resolvedCategoryLabel = categoryLabel ?? t('breadcrumbs.imageTools');
  const resolvedGuideLabel = guideLabel ?? t('common.links.seeGuide');
  const containerClass = ['tool-breadcrumb', className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <Link to={categoryPath} className="tool-breadcrumb-link">
        {resolvedCategoryLabel}
      </Link>
      <span className="tool-breadcrumb-separator" aria-hidden="true">
        ›
      </span>
      <span className="tool-breadcrumb-current">{currentLabel}</span>

      {guidePath && (
        <div className="tool-breadcrumb-actions">
          <Link to={guidePath} className="tool-breadcrumb-cta">
            {resolvedGuideLabel}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ToolBreadcrumb;
