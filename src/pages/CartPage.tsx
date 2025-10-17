import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUtils } from '../utils/auth';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from '../components/auth/AuthModal';
import useLogin from '../hook/useLogin';
import useRegister from '../hook/useRegister';
import { isApiError } from '../lib/ApiError';

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { mutateAsync: doLogin } = useLogin();
  const { mutateAsync: doRegister } = useRegister();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);

  const FREE_SHIPPING_THRESHOLD = 300000;

  useEffect(() => {
    const token = AuthUtils.getAccessToken();
    if (!token) return;
  }, []);

  // 🔐 Handle sign in
  const handleSignIn = async (d: { email: string; password: string }) => {
    try {
      const res = (await doLogin(d)) as any;
      console.log('Login response:', res);
      console.log('User info saved:', res?.data?.user);
      
      if (res?.status === 200 && res?.data?.accessToken) {
        AuthUtils.saveAuthData(
          res.data.accessToken,
          res.data.refreshToken,
          res.data.user
        );
        setShowLoginModal(false);
      } else {
        alert('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (e: any) {
      let msg = 'Đăng nhập thất bại.';
      if (isApiError(e)) {
        const detail = (e.data as any)?.error?.detail || (e.data as any)?.message;
        if (detail) msg = detail;
      }
      alert(msg);
    }
  };

  // 🔐 Handle sign up
  const handleSignUp = async (d: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const registerData = {
        ...d,
        confirmPassword: d.password,
      };
      const res = (await doRegister(registerData)) as any;
      
      if (res?.status === 200) {
        alert('Đăng kí thành công! Đang chuyển sang đăng nhập...');
        // Auto-switch to signin mode
        setAuthMode('signin');
      } else {
        alert('Đăng kí thất bại. Vui lòng thử lại.');
      }
    } catch (e: any) {
      let msg = 'Đăng kí thất bại.';
      if (isApiError(e)) {
        const data: any = e.data;
        const fieldErrors = data?.errors || data?.error?.fields;
        if (fieldErrors && typeof fieldErrors === 'object') {
          const firstKey = Object.keys(fieldErrors)[0];
          if (firstKey) {
            msg = fieldErrors[firstKey];
          }
        } else {
          const detail = data?.error?.detail || data?.message;
          if (detail) msg = detail;
        }
      }
      alert(msg);
    }
  };

  // 🧾 Handle checkout
  const handleCheckout = async () => {
    const token = AuthUtils.getAccessToken();
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const userInfo = AuthUtils.getUserInfo();
    if (!userInfo) {
      alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.');
      AuthUtils.clearAuthData();
      setShowLoginModal(true);
      return;
    }

    console.log('User info from AuthUtils:', userInfo);

    const orderPayload = {
      buyerName: `${userInfo.lastName || ''} ${userInfo.firstName || ''}`.trim(),
      buyerPhone: userInfo.phone || userInfo.phoneNumber || '',
      addressUrl: userInfo.address || '',
      paymentMethod: 'COD',
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      totalPrice: total,
      note,
    };

    try {
      const res = await fetch('https://www.cody-be.online/api/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      console.log('Order payload being sent:', orderPayload);
      const text = await res.text();
      console.log('Order response status:', res.status);
      console.log('Order response body:', text);
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          console.error('Response parse error:', text);
        }
      }

      if (res.ok) {
        const orderId =
          data?.data?.orderId || data?.orderId || data?.data?.id || data?.id;
        clearCart();
        navigate(orderId ? `/order/${orderId}` : '/order-success');
      } else {
        const msg = data?.message || text || 'Đặt hàng thất bại.';
        alert(msg);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    }
  };

  // 🪄 Login modal with working auth
  const renderLoginModal = () => {
    if (!showLoginModal) return null;
    return (
      <AuthModal
        open={true}
        onClose={() => setShowLoginModal(false)}
        mode={authMode}
        onSwitch={(m) => setAuthMode(m)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  };

  // 🛒 Empty cart view
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-warm-brown mb-4 font-playfair">
              {t('cart.emptyTitle')}
            </h2>
            <p className="text-gray-600 mb-8">{t('cart.emptySubtitle')}</p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-primary-green text-white font-semibold rounded-full hover:bg-primary-green/90 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
        {renderLoginModal()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-primary-green hover:text-primary-green/80 mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('cart.continueShopping')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair">
            {t('cart.title')}
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {t('cart.itemsCount').replace('{count}', String(items.length))}
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2">
            <div className="hidden md:grid grid-cols-[96px_1fr_120px_160px_140px_40px] px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div></div>
              <div></div>
              <div className="text-center">{t('cart.price')}</div>
              <div className="text-center">{t('cart.quantity')}</div>
              <div className="text-right">{t('cart.total')}</div>
              <div></div>
            </div>

            <div className="space-y-4">
              {items.map((item) => {
                const lineTotal = item.price * item.quantity;
                const canDecrement = item.quantity > 1;
                return (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-xl border border-gray-100 shadow-sm px-4 md:px-6 py-3 md:py-4"
                  >
                    {/* Delete (mobile) */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="md:hidden absolute top-2 right-2 inline-flex items-center p-2 text-gray-400 hover:text-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200"
                      title={t('cart.removeItem')}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr_120px_160px_140px_40px] items-center gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.originalName || item.name}
                        className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-playfair text-sm sm:text-base md:text-lg text-warm-brown uppercase tracking-wide">
                          {item.originalName || item.name}
                        </h3>
                        <div className="mt-2 flex md:hidden items-center justify-between">
                          <span className="text-amber-600 font-semibold text-sm">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-sm font-semibold">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>
                      </div>

                      <div className="hidden md:block text-center font-semibold text-amber-600">
                        {formatPrice(item.price)}
                      </div>

                      <div className="hidden md:block justify-self-end">
                        <div className="flex items-center border border-gray-200 rounded-md min-w-[160px] justify-between">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={!canDecrement}
                            className="h-9 w-9 flex items-center justify-center text-gray-600 hover:text-primary-green disabled:opacity-40"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-9 w-9 flex items-center justify-center text-gray-600 hover:text-primary-green"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="hidden md:block text-right font-semibold">
                        {formatPrice(lineTotal)}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hidden md:inline-flex items-center p-2 text-gray-400 hover:text-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200"
                        title={t('cart.removeItem')}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear cart */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                {t('cart.clearAll')}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-4">
            {/* Free shipping */}
            <div className="rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-2 text-sm">
              {total < FREE_SHIPPING_THRESHOLD ? (
                <span>
                  {t('cart.freeShipRemain')}
                  <span className="font-semibold underline decoration-emerald-500">
                    {formatPrice(FREE_SHIPPING_THRESHOLD - total)}
                  </span>
                  {t('cart.freeShipRemainTail')}
                </span>
              ) : (
                <span>{t('cart.freeShipQualified')}</span>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <button
                type="button"
                onClick={() => setNoteOpen((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4"
              >
                <span className="font-semibold text-warm-brown">
                  {t('cart.addNote')}
                </span>
                {noteOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
              {noteOpen && (
                <div className="px-5 pb-5">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder={t('cart.notePlaceholder')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-green/40"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {t('cart.noteHelp')}
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-700 mb-4">
                {t('cart.taxShipping')}
              </p>
              <button
                className="w-full bg-[#1f2a44] text-white font-bold py-4 rounded-lg hover:brightness-110 transition-colors uppercase tracking-wide"
                onClick={handleCheckout}
              >
                {t('cart.checkout')} • {formatPrice(total)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Modal đăng nhập */}
      {renderLoginModal()}
    </div>
  );
};

export default CartPage;
