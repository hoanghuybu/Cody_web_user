import React, { useState } from "react";
import {
    RegisterDTO,
    validateRegister
} from "../../dto/auth/register.dto";
import { useLanguage } from "../../context/LanguageContext";

interface SignUpFormProps {
  onSubmit?: (data: Omit<RegisterDTO, "confirmPassword">) => Promise<void> | void;
  onSwitchToSignIn?: () => void;
  compact?: boolean;
  onFieldErrors?: (errors: Partial<Record<keyof RegisterDTO, string>>) => void;
}

const initial: RegisterDTO = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onSwitchToSignIn,
  onFieldErrors
}) => {
  const { t } = useLanguage();
  const [form, setForm] = useState<RegisterDTO>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterDTO, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegisterDTO, boolean>>>({});
  const [loading, setLoading] = useState(false);

  const validateSingle = (name: keyof RegisterDTO, value: string, next: RegisterDTO): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name required';
        return;
      case 'lastName':
        if (!value.trim()) return 'Last name required';
        return;
      case 'email': {
        if (!value.trim()) return 'Email required';
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) return 'Invalid email';
        return;
      }
      case 'password':
        if (!value) return 'Password required';
        if (value.length < 8) return 'Min 8 characters';
        return;
      case 'confirmPassword':
        if (!value) return 'Confirm password';
        if (value !== next.password) return 'Passwords do not match';
        return;
      default:
        return;
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof RegisterDTO; value: string };
    setForm(prev => {
      const next = { ...prev, [name]: value } as RegisterDTO;
      // mark touched
      setTouched(t => ({ ...t, [name]: true }));
      // validate this field
      const fieldError = validateSingle(name, value, next);
      setErrors(errs => ({ ...errs, [name]: fieldError }));
      // if password changes, revalidate confirmPassword
      if (name === 'password' && touched.confirmPassword) {
        const confirmError = validateSingle('confirmPassword', next.confirmPassword, next);
        setErrors(errs => ({ ...errs, confirmPassword: confirmError }));
      }
      if (name === 'confirmPassword' && touched.password) {
        const confirmError = validateSingle('confirmPassword', value, next);
        setErrors(errs => ({ ...errs, confirmPassword: confirmError }));
      }
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors: submitErrors } = validateRegister(form);
    setErrors(submitErrors);
    // mark all touched on submit attempt
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirmPassword: true });
    if (!valid) {
      onFieldErrors?.(submitErrors);
      return;
    }
    try {
      setLoading(true);
      await onSubmit?.({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div>
      <h2 id="auth-modal-title" className="text-2xl font-bold text-green-700 mb-2">
        {t('auth.createAccount')}
      </h2>
      <p className="text-sm text-neutral-600 mb-5">{t('auth.signupSubtitle')}</p>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">{t('auth.firstName')}</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={change}
              autoComplete="given-name"
              className={`${inputCls} ${
                errors.firstName ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">{t('auth.lastName')}</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={change}
              autoComplete="family-name"
              className={`${inputCls} ${
                errors.lastName ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">{t('auth.email')}</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={change}
            autoComplete="email"
            className={`${inputCls} ${
              errors.email ? "border-red-400" : "border-neutral-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">{t('auth.password')}</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={change}
              autoComplete="new-password"
              className={`${inputCls} ${
                errors.password ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">
              {t('auth.confirmPassword')}
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={change}
              autoComplete="new-password"
              className={`${inputCls} ${
                errors.confirmPassword ? "border-red-400" : "border-neutral-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-green-300 text-white"
              : "bg-green-700 hover:bg-green-600 text-white"
          } font-semibold py-2.5 rounded-md transition shadow-sm border border-green-500/50 disabled:cursor-not-allowed disabled:opacity-90`}
        >
          {loading ? t('auth.creating') : t('auth.signUp')}
        </button>

        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex-1 h-px bg-neutral-200" />
          {t('auth.or')}
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        <div className="flex justify-center">
          <button 
            type="button" 
            className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
            title={t('auth.continueWithGoogle')}
          >
            <GoogleIcon />
          </button>
        </div>

        <p className="text-xs text-center text-neutral-600">
          {t('auth.haveAccount')}{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-green-700 font-semibold hover:underline"
          >
            {t('auth.loginHere')}
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;

const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);