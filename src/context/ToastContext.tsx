import React, { createContext, useCallback, useContext, useState } from 'react';
import Toast, { ToastProps } from '../components/Toast';

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'open' | 'onClose'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<Omit<ToastProps, 'onClose'> | null>(null);

  const showToast = useCallback(
    (toastData: Omit<ToastProps, 'open' | 'onClose'>) => {
      setToast({ ...toastData, open: true });
    },
    []
  );

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} open={toast.open} onClose={handleClose} />}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
