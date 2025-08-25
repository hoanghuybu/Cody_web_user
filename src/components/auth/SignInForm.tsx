import React, { useState } from "react";
import { LoginDTO, validateLogin } from "../../dto/auth/login.dto";
import { useLanguage } from "../../context/LanguageContext";

interface SignInFormProps {
  onSubmit?: (data: LoginDTO) => Promise<void> | void;
  onSwitchToSignUp?: () => void;
  forgotPassword?: () => void;
  compact?: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  onSwitchToSignUp,
  forgotPassword
}) => {
  const { t } = useLanguage();
  const [form, setForm] = useState<LoginDTO>({ email: "", password: "" });
  const [errors, setErrors] =
    useState<Partial<Record<keyof LoginDTO, string>>>({});
  const [loading, setLoading] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateLogin(form);
    setErrors(errors);
    if (!valid) return;
    try {
      setLoading(true);
      await onSubmit?.({ email: form.email.trim(), password: form.password });
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
        {t('auth.signIn')}
      </h2>
      <p className="text-sm text-neutral-600 mb-5">{t('auth.loginSubtitle')}</p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1">{t('auth.email')}</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={change}
            className={`${inputCls} ${
              errors.email ? "border-red-400" : "border-neutral-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">{t('auth.password')}</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={change}
            className={`${inputCls} ${
              errors.password ? "border-red-400" : "border-neutral-300"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
          {forgotPassword && (
            <button
              type="button"
              onClick={forgotPassword}
              className="mt-1 text-xs text-green-700 hover:underline"
            >
              {t('auth.forgotPassword')}
            </button>
          )}
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
          {loading ? t('auth.signingIn') : t('auth.signIn')}

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
          {t('auth.noAccount')}{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-green-700 font-semibold hover:underline"
          >
            {t('auth.registerHere')}
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.24 10.285v3.6h5.09c-.206 1.34-1.537 3.932-5.09 3.932-3.064 0-5.564-2.54-5.564-5.671 0-3.132 2.5-5.671 5.563-5.671 1.74 0 2.91.74 3.58 1.38l2.44-2.356C16.73 3.64 14.7 2.7 12.24 2.7 6.84 2.7 2.5 7.04 2.5 12.546c0 5.505 4.34 9.846 9.74 9.846 5.63 0 9.36-3.966 9.36-9.566 0-.64-.07-1.13-.16-1.64H12.24z" />
  </svg>
);