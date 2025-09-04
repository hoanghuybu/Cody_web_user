import React, { useEffect, useCallback } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useLanguage } from "../../context/LanguageContext";

export interface AuthModalProps {
  open: boolean;
  mode: "signin" | "signup";
  onClose: () => void;
  onSwitch: (m: "signin" | "signup") => void;
  onSignIn?: (data: { email: string; password: string }) => Promise<void> | void;
  onSignUp?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void> | void;
  onSignUpFieldErrors?: (errors: Partial<Record<'firstName'|'lastName'|'email'|'password'|'confirmPassword', string>>) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  mode,
  onClose,
  onSwitch,
  onSignIn,
  onSignUp,
  onSignUpFieldErrors
}) => {
  const { t } = useLanguage();
  const escHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [open, escHandler]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200 p-6 animate-fadeIn">
        <button
          onClick={onClose}
          aria-label={t('auth.close')}
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700"
        >
          ✕
        </button>
        
        {mode === "signin" ? (
          <SignInForm
            compact
            onSubmit={onSignIn}
            onSwitchToSignUp={() => onSwitch("signup")}
            forgotPassword={() => console.log("forgot password")}
          />
        ) : (
          <SignUpForm
            compact
            onSubmit={onSignUp}
            onFieldErrors={onSignUpFieldErrors}
            onSwitchToSignIn={() => onSwitch("signin")}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;