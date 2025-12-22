import { Link, useParams } from 'react-router-dom';
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
  categoryPath = 'image',
  categoryLabel,
  className,
}: ToolBreadcrumbProps) => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const langPrefix = lang ? `/${lang}` : '/en';

  const resolvedCategoryLabel = categoryLabel ?? t('breadcrumbs.imageTools');
  const resolvedGuideLabel = guideLabel ?? t('common.links.seeGuide');
  const containerClass = ['tool-breadcrumb', className].filter(Boolean).join(' ');

  // categoryPath와 guidePath에 언어 prefix 추가
  const fullCategoryPath = categoryPath.startsWith('/')
    ? `${langPrefix}${categoryPath}`
    : `${langPrefix}/${categoryPath}`;

  const fullGuidePath = guidePath
    ? (guidePath.startsWith('/') ? `${langPrefix}${guidePath}` : `${langPrefix}/${guidePath}`)
    : undefined;

  return (
    <div className={containerClass}>
      <Link to={fullCategoryPath} className="tool-breadcrumb-link">
        {resolvedCategoryLabel}
      </Link>
      <span className="tool-breadcrumb-separator" aria-hidden="true">
        ›
      </span>
      <span className="tool-breadcrumb-current">{currentLabel}</span>

      {fullGuidePath && (
        <div className="tool-breadcrumb-actions">
          <Link to={fullGuidePath} className="tool-breadcrumb-cta">
            {resolvedGuideLabel}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ToolBreadcrumb;
