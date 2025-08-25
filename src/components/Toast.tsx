import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export interface ToastProps {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  open,
  type,
  title,
  message,
  onClose,
  duration = 4000
}) => {
  const { t } = useLanguage();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsAnimatingOut(false);
      
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      handleClose();
    }
  }, [open, duration]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShouldRender(false);
      setIsAnimatingOut(false);
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  const toastStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      title: "text-green-800",
      message: "text-green-700",
      progress: "bg-green-500"
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200", 
      icon: "text-red-600",
      title: "text-red-800",
      message: "text-red-700",
      progress: "bg-red-500"
    }
  };

  const styles = toastStyles[type];

  return (
    <div
      className={`fixed top-4 right-4 z-[200] w-80 transition-all duration-300 ${
        isAnimatingOut ? 'animate-slideOutRight' : 'animate-slideInRight'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={`${styles.bg} ${styles.border} rounded-lg shadow-lg border p-4 relative overflow-hidden backdrop-blur-sm`}>
        {/* Progress bar */}
        <div 
          className={`absolute bottom-0 left-0 h-1 ${styles.progress} ${!isAnimatingOut ? 'animate-shrink' : ''}`}
          style={{ animationDuration: `${duration}ms` }}
        />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
          aria-label={t('common.close')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex items-start gap-3 pr-6">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {type === "success" ? (
              <svg
                className={`w-5 h-5 ${styles.icon}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className={`w-5 h-5 ${styles.icon}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            )}
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold ${styles.title} mb-1`}>
              {title}
            </h4>
            <p className={`text-xs ${styles.message} leading-relaxed`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
