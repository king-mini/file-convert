import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { splitPdf } from '../../utils/pdfSplitter';
import type { SplitMode, SplitOptions, SplitProgress } from '../../utils/pdfSplitter';
import PasswordModal from '../../components/PasswordModal';
import FeatureHighlights from '../../components/FeatureHighlights';
import ToolBreadcrumb from '../../components/ToolBreadcrumb';
import './SplitPdf.css';

const SplitPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitting, setSplitting] = useState(false);
  const [progress, setProgress] = useState<SplitProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const { t } = useTranslation();

  // 분할 옵션
  const [splitMode, setSplitMode] = useState<SplitMode>('each');
  const [rangesInput, setRangesInput] = useState('');
  const [extractInput, setExtractInput] = useState('');


  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined);

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setProgress(null);
    } else if (selectedFile) {
      alert(t('common.validation.pdfOnly'));
    }
  }, [t]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelect(droppedFile);
    },
    [handleFileSelect]
  );

  const parseRanges = (input: string): { start: number; end: number }[] => {
    const ranges = input.split(',').map((s) => s.trim());
    const result: { start: number; end: number }[] = [];

    for (const range of ranges) {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          result.push({ start, end });
        }
      }
    }

    return result;
  };

  const parsePages = (input: string): number[] => {
    const parts = input.split(',').map((s) => s.trim());
    const result = new Set<number>();

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            result.add(i);
          }
        }
      } else {
        const num = parseInt(part);
        if (!isNaN(num)) {
          result.add(num);
        }
      }
    }

    return Array.from(result).sort((a, b) => a - b);
  };

  const handleSplit = useCallback(async (password?: string) => {
    if (!file) return;

    const options: SplitOptions = {
      mode: splitMode,
      password: password || currentPassword
    };

    if (splitMode === 'range') {
      const ranges = parseRanges(rangesInput);
      if (ranges.length === 0) {
        alert(t('common.validation.validRanges', { example: '1-5, 6-10' }));
        return;
      }
      options.ranges = ranges;
    } else if (splitMode === 'extract') {
      const pages = parsePages(extractInput);
      if (pages.length === 0) {
        alert(t('common.validation.validPages', { example: '1,3,5-7' }));
        return;
      }
      options.extractPages = pages;
    }

    setSplitting(true);
    setProgress({ current: 0, total: 1, status: t('common.status.starting') });

    try {
      await splitPdf(file, options, setProgress);
      alert(t('common.success.split'));
      setIsPasswordModalOpen(false);
      setPasswordError(false);
      setCurrentPassword(options.password);
    } catch (error: any) {
      console.error('분할 실패:', error);
      if (error.message.includes('Password') || error.name === 'PasswordException' || error.message.includes('Encrypted')) {
        setIsPasswordModalOpen(true);
        if (password) {
          setPasswordError(true);
        }
      } else {
        alert(t('common.errors.split'));
      }
    } finally {
      setSplitting(false);
    }
  }, [file, splitMode, rangesInput, extractInput, t, currentPassword]);

  const handlePasswordSubmit = (password: string) => {
    handleSplit(password);
  };

  return (
    <div className="split-pdf">
      <ToolBreadcrumb
        currentLabel={t('breadcrumbs.pdfSplit')}
        categoryPath="/pdf"
        categoryLabel={t('breadcrumbs.pdfTools')}
        guidePath="/guide/split-pdf"
      />
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h1>{t('pages.pdf.split.hero.title')}</h1>
        <p>{t('pages.pdf.split.hero.description')}</p>
      </div>

      {/* 파일 업로드 영역 */}
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        {!file ? (
          <>
            <div className="upload-icon">📁</div>
            <p>{t('common.dropzone.pdf')}</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="btn btn-primary">
              {t('common.buttons.selectFile')}
            </label>
          </>
        ) : (
          <>
            <div className="file-info">
              <span className="file-icon">📄</span>
              <span className="file-name">{file.name}</span>
              <button className="btn-remove" onClick={() => setFile(null)}>
                ✕
              </button>
            </div>
          </>
        )}
      </div>

      {/* 분할 옵션 */}
      {file && (
        <div className="options">
          <h3>{t('pages.pdf.split.options.title')}</h3>

          <div className="option-group">
            <label>{t('pages.pdf.split.options.mode')}</label>
            <div className="split-modes">
              <button
                className={`mode-btn ${splitMode === 'each' ? 'active' : ''}`}
                onClick={() => setSplitMode('each')}
                disabled={splitting}
              >
                <span className="mode-icon">📄</span>
                <span className="mode-title">{t('pages.pdf.split.options.modes.each.title')}</span>
                <span className="mode-desc">
                  {t('pages.pdf.split.options.modes.each.description')}
                </span>
              </button>
              <button
                className={`mode-btn ${splitMode === 'range' ? 'active' : ''}`}
                onClick={() => setSplitMode('range')}
                disabled={splitting}
              >
                <span className="mode-icon">📚</span>
                <span className="mode-title">{t('pages.pdf.split.options.modes.range.title')}</span>
                <span className="mode-desc">
                  {t('pages.pdf.split.options.modes.range.description')}
                </span>
              </button>
              <button
                className={`mode-btn ${splitMode === 'extract' ? 'active' : ''}`}
                onClick={() => setSplitMode('extract')}
                disabled={splitting}
              >
                <span className="mode-icon">📑</span>
                <span className="mode-title">
                  {t('pages.pdf.split.options.modes.extract.title')}
                </span>
                <span className="mode-desc">
                  {t('pages.pdf.split.options.modes.extract.description')}
                </span>
              </button>
            </div>
          </div>

          {splitMode === 'range' && (
            <div className="option-group">
              <label>{t('pages.pdf.split.options.rangeLabel')}</label>
              <input
                type="text"
                placeholder={t('pages.pdf.split.options.rangePlaceholder')}
                value={rangesInput}
                onChange={(e) => setRangesInput(e.target.value)}
                disabled={splitting}
              />
              <small>{t('pages.pdf.split.options.rangeHint')}</small>
            </div>
          )}

          {splitMode === 'extract' && (
            <div className="option-group">
              <label>{t('pages.pdf.split.options.extractLabel')}</label>
              <input
                type="text"
                placeholder={t('pages.pdf.split.options.extractPlaceholder')}
                value={extractInput}
                onChange={(e) => setExtractInput(e.target.value)}
                disabled={splitting}
              />
              <small>{t('pages.pdf.split.options.extractHint')}</small>
            </div>
          )}

          <button className="btn btn-convert" onClick={() => handleSplit()} disabled={splitting}>
            {splitting
              ? t('pages.pdf.split.actions.splitting')
              : t('pages.pdf.split.actions.split')}
          </button>
        </div>
      )}

      {/* 진행률 */}
      {progress && (
        <div className="progress">
          <p>{progress.status}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <p className="progress-text">
            {progress.current} / {progress.total}
          </p>
        </div>
      )}

      <PasswordModal
        isOpen={isPasswordModalOpen}
        isError={passwordError}
        onSubmit={handlePasswordSubmit}
        onCancel={() => {
          setIsPasswordModalOpen(false);
          setPasswordError(false);
          setSplitting(false);
        }}
      />
      <FeatureHighlights className="seo-highlights" />
    </div>
  );
};

export default SplitPdf;

