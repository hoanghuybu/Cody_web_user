import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export interface AlertProps {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({
  open,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, autoClose, duration, onClose]);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [open, onClose]);

  if (!open) return null;

  const alertStyles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      title: "text-green-800",
      message: "text-green-700",
      button: "bg-green-600 hover:bg-green-700"
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200", 
      icon: "text-red-600",
      title: "text-red-800",
      message: "text-red-700",
      button: "bg-red-600 hover:bg-red-700"
    }
  };

  const styles = alertStyles[type];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative w-full max-w-md ${styles.bg} ${styles.border} rounded-2xl shadow-xl border p-6 animate-fadeIn`}>
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4">
          {type === "success" ? (
            <svg
              className={`w-8 h-8 ${styles.icon}`}
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
              className={`w-8 h-8 ${styles.icon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 id="alert-title" className={`text-lg font-semibold mb-2 ${styles.title}`}>
            {title}
          </h3>
          <p className={`text-sm mb-6 ${styles.message}`}>
            {message}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full ${styles.button} text-white font-semibold py-2.5 rounded-md transition`}
        >
          {t('common.ok')}
        </button>
      </div>
    </div>
  );
};

export default Alert;
