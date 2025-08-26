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
  onSwitchToSignIn
}) => {
  const { t } = useLanguage();
  const [form, setForm] = useState<RegisterDTO>(initial);
  const [errors, setErrors] =
    useState<Partial<Record<keyof RegisterDTO, string>>>({});
  const [loading, setLoading] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateRegister(form);
    setErrors(errors);
    if (!valid) return;
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
  const socialBtn =
    "flex items-center justify-center gap-2 border rounded-md py-2 text-sm font-medium hover:bg-neutral-50 transition";

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
          <button type="button" className={socialBtn}>
            <GoogleIcon /> {t('auth.continueWithGoogle')}
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
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.24 10.285v3.6h5.09c-.206 1.34-1.537 3.932-5.09 3.932-3.064 0-5.564-2.54-5.564-5.671 0-3.132 2.5-5.671 5.563-5.671 1.74 0 2.91.74 3.58 1.38l2.44-2.356C16.73 3.64 14.7 2.7 12.24 2.7 6.84 2.7 2.5 7.04 2.5 12.546c0 5.505 4.34 9.846 9.74 9.846 5.63 0 9.36-3.966 9.36-9.566 0-.64-.07-1.13-.16-1.64H12.24z" />
  </svg>
);