import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './PasswordModal.css';

interface PasswordModalProps {
  isOpen: boolean;
  isError: boolean;
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  isError,
  onSubmit,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  if (!isOpen) return null;

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <h2>{t('components.passwordModal.title')}</h2>
        <p>{t('components.passwordModal.description')}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="password-input-group">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('components.passwordModal.placeholder')}
              autoComplete="off"
            />
            {isError && (
              <span className="error-message">
                {t('components.passwordModal.error')}
              </span>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              {t('common.buttons.cancel')}
            </button>
            <button type="submit" className="btn-submit">
              {t('common.buttons.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
