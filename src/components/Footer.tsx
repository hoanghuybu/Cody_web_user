import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import footerImg from '../assets/images/footer.jpg';
import logoCody from '../assets/images/logo-cody.png';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Preload ảnh footer để đảm bảo load sẵn trong bộ nhớ
    const img = new Image();
    img.src = footerImg;
  }, []);
  return (
    <footer className="relative overflow-hidden">
      {/* Beach Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${footerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      ></div>

      <div className="relative pt-[260px] pb-[80px] md:pt-[300px] md:pb-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={logoCody}
                  alt="Cody Coconut Candy logo"
                  className="h-12 lg:h-14 w-auto"
                />
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-white/70" />
                  <p className="text-white/90 text-sm">
                    123 Đường Dừa, Bến Tre
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-white/70" />
                  <p className="text-white/90 text-sm">0275 123 456</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-white/70" />
                  <p className="text-white/90 text-sm">hello@cody.vn</p>
                </div>
              </div>
            </div>

            {/* About Us Column */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 tracking-wider">
                {t('footer.aboutUs')}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/brand-story"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.philosophy')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.candy')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brand-story"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.culture')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/custom"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.gift')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.mind')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service Column */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 tracking-wider">
                {t('footer.customerService')}
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/faq"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.faqs')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.terms')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.shipping')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white/80 hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {t('footer.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Column */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 tracking-wider">
                {t('footer.followUs')}
              </h4>
              <div className="flex space-x-4 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-primary-green transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-primary-green transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('footer.followDescription')}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-white/70 text-sm tracking-wide">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
