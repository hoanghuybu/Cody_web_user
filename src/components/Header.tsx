import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Globe, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { items, openCart } = useCart();
  const { language, setLanguage, t } = useLanguage();

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
        className={`sticky z-40 transition-all duration-300 bg-white ${showBanner ? 'top-8' : 'top-0'}`}
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

                <button className="p-2 text-warm-brown hover:text-primary-green transition-colors">
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

        {/* Mobile Navigation Sidebar */}
        {isMenuOpen && isMobile && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Dark overlay */}
            <div
              className="fixed inset-0 bg-black/30 transition-opacity"
              onClick={toggleMenu}
            ></div>

            {/* Right Sidebar - Dynamic positioning based on banner visibility */}
            <div
              className={`pt-2 fixed right-0 w-[80vw] max-w-xs bg-white shadow-xl overflow-y-auto z-50 transform transition-all duration-300 ${showBanner
                  ? 'top-[72px] h-[calc(100%-72px)]'
                  : 'top-0 h-full'
                }`}
            >
              <div className="pt-8 pb-4 px-4 flex items-center justify-between border-b border-gray-200">
                <h2 className="font-bold text-lg text-primary-green">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-warm-brown transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu content */}
              <div className="flex flex-col px-4 pt-2 pb-8">
                {/* Navigation */}
                <nav className="flex flex-col space-y-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-base font-medium tracking-wider transition-colors hover:text-primary-green ${isActive(item.href) ? 'text-primary-green' : 'text-warm-brown'
                        }`}
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-gray-200 my-6"></div>

                {/* User actions */}
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => { toggleMenu(); openCart(); }}
                    className="flex items-center space-x-3 text-warm-brown hover:text-primary-green transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-base font-medium">Cart ({totalItems})</span>
                  </button>

                  <button className="flex items-center space-x-3 text-warm-brown hover:text-primary-green transition-colors">
                    <User className="h-5 w-5" />
                    <span className="text-base font-medium">Account</span>
                  </button>

                  <button
                    onClick={() => setLanguage(language === 'en' ? 'vn' : 'en')}
                    className="flex items-center space-x-3 text-warm-brown hover:text-primary-green transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="text-base font-medium">
                      {language === 'en' ? 'Tiếng Việt' : 'English'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;