import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Globe, Leaf, ChevronRight } from 'lucide-react';
import { FlagIcon } from './FlagIcon';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './auth/AuthModal';
import Toast from './Toast';
import useLogin from "../hook/useLogin";
import useRegister from "../hook/useRegister";
import { AuthUtils } from '../utils/auth';
import { isApiError } from '../lib/ApiError';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { items, openCart } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  
  const showToast = (type: "success" | "error", title: string, message: string) => {
    setToastType(type);
    setToastTitle(title);
    setToastMessage(message);
    setToastOpen(true);
  };
  
  const openAuth = (mode: "signin" | "signup" = "signin") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const { mutateAsync: doLogin } = useLogin();
  const { mutateAsync: doRegister } = useRegister();

  const handleLogout = () => {
    AuthUtils.clearAuthData();
    showToast("success", t('auth.logoutSuccess'), t('auth.logoutSuccessMessage'));
  };

  const handleSignIn = async (d: { email: string; password: string }) => {
    try {
      console.log('Login payload:', d); 
      const res = await doLogin(d) as any;
      console.log('Login response:', res); 
      
      if (res?.status === 200 && res?.data?.accessToken) {
        AuthUtils.saveAuthData(
          res.data.accessToken,
          res.data.refreshToken,
          res.data.user
        );
        
        const userName = AuthUtils.getUserFullName();
        if (userName) {
          showToast("success", t('auth.loginSuccess'), `${t('auth.welcome')} ${userName}!`);
        } else {
          showToast("success", t('auth.loginSuccess'), t('auth.loginSuccessMessage'));
        }
        
        setAuthOpen(false);
      } else if (res?.status && res?.status !== 200) {
        // Always show generic invalid credentials message (do not expose backend detail)
        showToast("error", t('auth.loginFailed'), t('auth.invalidCredentials'));
      } else {
        console.warn('Unexpected response structure:', res);
        showToast("error", t('auth.loginFailed'), t('auth.networkError'));
      }
    } catch (e: any) {
      // Extract server detail (e.g., "Bad credentials") for optional logging
      let serverDetail: string | undefined;
      if (isApiError(e)) {
        serverDetail = (e.data as any)?.error?.detail || (e.data as any)?.message;
      }
      if (serverDetail) {
        console.warn('Login error detail:', serverDetail);
      }
      const message = serverDetail && serverDetail.toLowerCase().includes('credential')
        ? t('auth.invalidCredentials')
        : (!e?.status && !isApiError(e) ? t('auth.networkError') : t('auth.invalidCredentials'));
      showToast("error", t('auth.loginFailed'), message);
    }
  };
  const handleSignUp = async (d: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const registerData = {
        ...d,
        confirmPassword: d.password
      };
      console.log('Register payload:', registerData); 
      const res = await doRegister(registerData) as any; 
      console.log('Register response:', res);
      if (res?.status === 200) {
        setAuthOpen(false);
        const successMsg = res?.message || t('auth.registrationSuccessMessage');
        showToast("success", t('auth.registrationSuccess'), successMsg);
      } else if (res?.status && res?.status !== 200) {
        showToast("error", t('auth.registrationFailed'), t('auth.registrationGenericError'));
      } else {
        console.warn('Unexpected registration response:', res);
        showToast("error", t('auth.registrationFailed'), t('auth.networkError'));
      }
    } catch (e: any) {
      if (isApiError(e)) {
        const data: any = e.data;
        const fieldErrors = data?.errors || data?.error?.fields; // attempt common shapes
        if (fieldErrors && typeof fieldErrors === 'object') {
          // Show first field error via toast
          const firstKey = Object.keys(fieldErrors)[0];
          if (firstKey) {
            showToast('error', t('auth.registrationFailed'), fieldErrors[firstKey] || t('auth.registrationGenericError'));
          } else {
            showToast('error', t('auth.registrationFailed'), t('auth.registrationGenericError'));
          }
          return;
        }
        const detail = data?.error?.detail || data?.message;
        if (detail) {
          console.warn('Register error detail:', detail);
        }
        showToast('error', t('auth.registrationFailed'), t('auth.registrationGenericError'));
      } else {
        showToast('error', t('auth.registrationFailed'), t('auth.networkError'));
      }
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBanner(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('nav.shop'), href: '/products' },
    { name: t('nav.culture'), href: '/brand-story' },
    { name: t('nav.special'), href: '/products/gift-box' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);

    if (isMobile) {
      setTimeout(() => {
      }, 50);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isMobile) return; // only lock on mobile
    const originalOverflow = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen, isMobile]);


  return (
    <>
      {/* Discount Banner */}
      <div
        className={`text-white py-2 sticky top-0 z-50 transition-transform duration-300 ${showBanner ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ backgroundColor: '#d4ae57' }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold tracking-wider">
            GET FREE DELIVERY OVER 1.000.000 VND
          </p>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky z-40 transition-all duration-300 bg-white ${showBanner ? 'top-8' : 'top-0'} relative`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden xl:flex justify-between items-center h-16 lg:h-20">
            {/* Left Navigation */}
            <nav className="flex items-center space-x-4 lg:space-x-12 flex-1 justify-start">
              {navigation.slice(0, 2).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`whitespace-nowrap text-sm font-medium tracking-tight lg:tracking-wide transition-colors hover:text-primary-green ${isActive(item.href) ? 'text-primary-green' : 'text-warm-brown'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary-green rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-primary-green font-montserrat tracking-normal lg:tracking-wider">CODY</h1>
                <p className="text-[11px] lg:text-xs text-warm-brown -mt-1 tracking-wide lg:tracking-widest">COCONUT CANDY</p>
              </div>
            </Link>

            {/* Right Navigation */}
            <nav className="flex items-center space-x-4 lg:space-x-12 flex-1 justify-end">
              {navigation.slice(2, 3).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`whitespace-nowrap text-sm font-medium tracking-tight lg:tracking-wide transition-colors hover:text-primary-green ${isActive(item.href) ? 'text-primary-green' : 'text-warm-brown'}`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Icons */}
              <div className="flex items-center space-x-2 lg:space-x-4 ml-2 lg:ml-8">
                <button className="p-2 text-warm-brown hover:text-primary-green transition-colors">
                  <Search className="h-5 w-5" />
                </button>

                <button
                  onClick={openCart}
                  className="relative p-2 text-warm-brown hover:text-primary-green transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => openAuth("signin")}
                  className="p-2 text-warm-brown hover:text-primary-green transition-colors"
                >
                  <User className="h-5 w-5" />
                </button>

                <button
                  onClick={() => setLanguage(language === 'en' ? 'vn' : 'en')}
                  className="p-2 text-warm-brown hover:text-primary-green transition-colors relative group"
                >
                  <Globe className="h-5 w-5" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-warm-brown text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {language === 'en' ? 'Tiếng Việt' : 'English'}
                  </span>
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Header */}
          <div className="xl:hidden flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 min-w-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-green rounded-full flex items-center justify-center">
                <Leaf className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-center min-w-0">
                <h1 className="text-sm sm:text-xl font-bold text-primary-green font-montserrat tracking-wider truncate">
                  CODY
                </h1>
              </div>
            </Link>

            {/* Icons for Mobile - Improved spacing */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              <button className="p-1 sm:p-2 text-warm-brown hover:text-primary-green transition-colors">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <button
                onClick={openCart}
                className="relative p-1 sm:p-2 text-warm-brown hover:text-primary-green transition-colors"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-accent-green text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="p-1 sm:p-2 text-warm-brown hover:text-primary-green transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobile && (
          <div
            className={`absolute left-0 right-0 top-full xl:hidden z-50 transition-all duration-300 ease-out origin-top
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none overflow-hidden'}`}
            aria-hidden={!isMenuOpen}
          >
            <div
              className={`mx-2 mt-1 rounded-xl border border-gray-200 shadow-lg bg-white overflow-hidden origin-top transform transition-[transform,opacity] duration-300 ease-out
              ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
              {/* Header row inside dropdown (icons removed per request) */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-xs font-semibold tracking-wider text-gray-500">MENU</span>
                <button
                  onClick={toggleMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-warm-brown hover:bg-gray-100 transition"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">
                {navigation.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-5 py-4 text-sm font-semibold tracking-wider transition-colors
                      ${isActive(item.href) ? 'bg-primary-green/5 text-primary-green' : 'text-warm-brown hover:bg-primary-green/5 hover:text-primary-green'}`}
                  >
                    <span className="truncate">{item.name.toUpperCase()}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </Link>
                ))}
                <button
                  onClick={() => { openAuth('signin'); setIsMenuOpen(false); }}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold tracking-wider text-warm-brown hover:bg-primary-green/5 hover:text-primary-green transition"
                >
                  <span>{t('auth.login')}</span>
                  <ChevronRight className="h-4 w-4 opacity-60" />
                </button>
                <button
                  onClick={() => { setLanguage(language === 'en' ? 'vn' : 'en'); setIsMenuOpen(false); }}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold tracking-wider text-warm-brown hover:bg-primary-green/5 hover:text-primary-green transition"
                >
                  <span className="flex items-center gap-2">
                    {language === 'en' ? <><FlagIcon code="vn" className="w-6 h-4" /> TIẾNG VIỆT</> : <><FlagIcon code="us" className="w-6 h-4" /> ENGLISH</>}
                  </span>
                  <span className="text-lg" aria-hidden>
                    {language === 'en' ? <FlagIcon code="vn" className="w-7 h-5" /> : <FlagIcon code="us" className="w-7 h-5" />}
                  </span>
                </button>
              </nav>
              <div className="px-5 py-3 border-t border-gray-100 text-[11px] text-gray-500 tracking-wide bg-gray-50">
                © {new Date().getFullYear()} CODY
              </div>
            </div>
          </div>
        )}
      </header>
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitch={(m) => setAuthMode(m)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignUpFieldErrors={(errs) => {
          // Show first field validation error via toast for quick feedback
          const firstKey = Object.keys(errs)[0] as keyof typeof errs | undefined;
            if (firstKey) {
              showToast('error', t('auth.registrationFailed'), errs[firstKey] || t('auth.registrationGenericError'));
            }
        }}
      />
      
      <Toast
        open={toastOpen}
        type={toastType}
        title={toastTitle}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};

export default Header;