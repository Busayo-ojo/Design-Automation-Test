import React, { useEffect } from 'react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  className = '',
  size = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fmdqui-modal-overlay" onClick={closeOnBackdropClick ? onClose : undefined}>
      <div 
        className={`fmdqui-modal-dialog fmdqui-modal-dialog--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export const ModalHeader: React.FC<{ title: string; onClose?: () => void; className?: string }> = ({ title, onClose, className = '' }) => (
  <div className={`fmdqui-modal-header ${className}`}>
    <h3 className="fmdqui-modal-title">{title}</h3>
    {onClose && (
      <button className="fmdqui-modal-close-btn" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    )}
  </div>
);

export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-modal-body ${className}`} {...props}>
    {children}
  </div>
);

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-modal-footer ${className}`} {...props}>
    {children}
  </div>
);
