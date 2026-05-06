import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';
import { ToastContext } from './useToast';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...message, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC<{ toasts: ToastMessage[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  if (typeof window === 'undefined') return null;
  
  return createPortal(
    <div className="qasah-toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} removeToast={removeToast} />
      ))}
    </div>,
    document.body
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; removeToast: (id: string) => void }> = ({ toast, removeToast }) => {
  const { id, title, description, variant = 'info', duration = 3000 } = toast;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, removeToast]);

  return (
    <div className={`qasah-toast qasah-toast--${variant}`} role="alert">
      <div className="qasah-toast-content">
        <h4 className="qasah-toast-title">{title}</h4>
        {description && <p className="qasah-toast-desc">{description}</p>}
      </div>
      <button className="qasah-toast-close" onClick={() => removeToast(id)} aria-label="Close Toast">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};
