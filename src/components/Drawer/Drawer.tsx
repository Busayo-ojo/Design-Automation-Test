import React, { useEffect } from 'react';
import './Drawer.css';

export interface DrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  className = '',
  position = 'right',
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
    <div className="fmdqui-drawer-overlay" onClick={closeOnBackdropClick ? onClose : undefined}>
      <div 
        className={`fmdqui-drawer-panel fmdqui-drawer-panel--${position} fmdqui-drawer-panel--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export const DrawerHeader: React.FC<{ title: string; onClose?: () => void; className?: string; children?: React.ReactNode }> = ({ title, onClose, className = '', children }) => (
  <div className={`fmdqui-drawer-header ${className}`}>
    <h3 className="fmdqui-drawer-title">{title}</h3>
    <div className="fmdqui-drawer-header-actions">
      {children}
      {onClose && (
        <button className="fmdqui-drawer-close-btn" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  </div>
);

export const DrawerBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-drawer-body ${className}`} {...props}>
    {children}
  </div>
);

export const DrawerFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`fmdqui-drawer-footer ${className}`} {...props}>
    {children}
  </div>
);
