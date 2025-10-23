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
import Toast from '../components/Toast';
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  
  // Address selection states
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const [houseNumber, setHouseNumber] = useState('');
  
  const [userInfo, setUserInfo] = useState<any>(null);
  const [toast, setToast] = useState<{
    open: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    open: false,
    type: 'success',
    title: '',
    message: '',
  });
  const { mutateAsync: doLogin } = useLogin();
  const { mutateAsync: doRegister } = useRegister();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);

  const FREE_SHIPPING_THRESHOLD = 300000;

  const showToast = (type: 'success' | 'error', title: string, message: string) => {
    setToast({ open: true, type, title, message });
  };

  useEffect(() => {
    const token = AuthUtils.getAccessToken();
    if (!token) return;
    
    // Load user info from sessionStorage if exists
    const savedUserInfo = sessionStorage.getItem('user_info');
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        setUserInfo(parsed);
      } catch (error) {
        // Silent error handling
      }
    }
  }, []);

  // Fetch provinces on mount
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(data => {
        console.log('Provinces data:', data); // Debug log
        setProvinces(data || []);
      })
      .catch(err => console.error('Error fetching provinces:', err));
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
      return;
    }
    
    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
      .then(res => res.json())
      .then(data => {
        console.log('Districts data:', data); // Debug log
        setDistricts(data.districts || []);
        setSelectedDistrict(null);
        setWards([]);
        setSelectedWard(null);
      })
      .catch(err => console.error('Error fetching districts:', err));
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard(null);
      return;
    }
    
    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
      .then(res => res.json())
      .then(data => {
        console.log('Wards data:', data); // Debug log
        setWards(data.wards || []);
        setSelectedWard(null);
      })
      .catch(err => console.error('Error fetching wards:', err));
  }, [selectedDistrict]);

  // Build complete address whenever any part changes
  useEffect(() => {
    const parts = [];
    if (houseNumber.trim()) parts.push(houseNumber.trim());
    if (selectedWard) parts.push(selectedWard.name);
    if (selectedDistrict) parts.push(selectedDistrict.name);
    if (selectedProvince) parts.push(selectedProvince.name);
    
    setBuyerAddress(parts.join(', '));
  }, [houseNumber, selectedWard, selectedDistrict, selectedProvince]);

  // 🔐 Handle sign in
  const handleSignIn = async (d: { email: string; password: string }) => {
    try {
      const res = (await doLogin(d)) as any;
      
      if (res?.status === 200 && res?.data?.accessToken) {
        // Save tokens
        AuthUtils.saveAuthData(
          res.data.accessToken,
          res.data.refreshToken
        );
        // Save user info to sessionStorage AND state
        if (res.data.info) {
          sessionStorage.setItem('user_info', JSON.stringify(res.data.info));
          setUserInfo(res.data.info);
        }
        setShowLoginModal(false);
        showToast('success', 'Đăng nhập thành công', `Chào mừng ${res.data.info?.name || 'bạn'} đến với Cody!`);
        // Reload page after successful login
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        showToast('error', 'Đăng nhập thất bại', 'Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    } catch (e: any) {
      let msg = 'Đăng nhập thất bại.';
      if (isApiError(e)) {
        const detail = (e.data as any)?.error?.detail || (e.data as any)?.message;
        if (detail) msg = detail;
      }
      showToast('error', 'Đăng nhập thất bại', msg);
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
        showToast('success', 'Đăng ký thành công!', 'Vui lòng đăng nhập để tiếp tục mua sắm.');
        // Auto-switch to signin mode
        setAuthMode('signin');
      } else {
        showToast('error', 'Đăng ký thất bại', 'Vui lòng thử lại sau.');
      }
    } catch (e: any) {
      let msg = 'Đăng ký thất bại.';
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
      showToast('error', 'Đăng ký thất bại', msg);
    }
  };

  // 🧾 Handle checkout
  const handleCheckout = async () => {
    const token = AuthUtils.getAccessToken();
    
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    
    if (!userInfo) {
      showToast('error', 'Chưa đăng nhập', 'Vui lòng đăng nhập để tiếp tục đặt hàng.');
      AuthUtils.clearAuthData();
      setShowLoginModal(true);
      return;
    }

    // Validate phone and address
    if (!buyerPhone.trim()) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng nhập số điện thoại.');
      return;
    }

    if (!houseNumber.trim()) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng nhập số nhà, tên đường.');
      return;
    }

    if (!selectedProvince) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng chọn Tỉnh/Thành phố.');
      return;
    }

    if (!selectedDistrict) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng chọn Quận/Huyện.');
      return;
    }

    if (!selectedWard) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng chọn Phường/Xã.');
      return;
    }

    if (!buyerAddress.trim()) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng nhập địa chỉ giao hàng đầy đủ.');
      return;
    }

    // Show confirmation modal
    setShowConfirmModal(true);
  };

  // 🧾 Confirm and create order
  const confirmCreateOrder = async () => {
    setShowConfirmModal(false);
    
    const token = AuthUtils.getAccessToken();

    const orderPayload = {
      buyerName: userInfo.name || `${userInfo.lastName || ''} ${userInfo.firstName || ''}`.trim(),
      buyerPhone: buyerPhone.trim(),
      addressUrl: buyerAddress.trim(),
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
      const res = await fetch('https://www.cody-be.online/api/v1/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const text = await res.text();
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          // Silent error handling
        }
      }

      if (res.ok) {
        const orderId =
          data?.data?.orderId || data?.orderId || data?.data?.id || data?.id;
        clearCart();
        showToast('success', 'Đặt hàng thành công!', 'Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn đã tin tùng Cody!');
        setTimeout(() => {
          navigate(orderId ? `/order/${orderId}` : '/order-success');
        }, 1500);
      } else {
        const msg = data?.message || text || 'Đặt hàng thất bại.';
        showToast('error', 'Đặt hàng thất bại', msg);
      }
    } catch (err) {
      showToast('error', 'Có lỗi xảy ra', 'Vui lòng thử lại hoặc liên hệ hỗ trợ.');
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

  // ✅ Confirmation modal
  const renderConfirmModal = () => {
    if (!showConfirmModal) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-slideInUp max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-2 font-playfair">
              Xác nhận đặt hàng
            </h3>
            <p className="text-gray-600 text-sm">
              Bạn có chắc chắn muốn đặt hàng với tổng giá trị <span className="font-semibold text-amber-600">{formatPrice(total)}</span>?
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3 text-sm">
            <div className="flex justify-between items-start gap-4">
              <span className="text-gray-600 whitespace-nowrap">Số lượng:</span>
              <span className="font-semibold text-right">{items.length} sản phẩm</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-gray-600 whitespace-nowrap">Người nhận:</span>
              <span className="font-semibold text-right">{userInfo?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-gray-600 whitespace-nowrap">Số điện thoại:</span>
              <span className="font-semibold text-right">{buyerPhone}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-start gap-4">
                <span className="text-gray-600 whitespace-nowrap">Địa chỉ:</span>
                <span className="font-semibold text-right flex-1 break-words">{buyerAddress}</span>
              </div>
            </div>
            {note && (
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-start gap-4">
                  <span className="text-gray-600 whitespace-nowrap">Ghi chú:</span>
                  <span className="font-semibold text-right flex-1 break-words italic text-gray-700">{note}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={confirmCreateOrder}
              className="flex-1 px-6 py-3 bg-primary-green text-white font-semibold rounded-lg hover:bg-primary-green/90 transition-colors"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
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
            <div className="hidden md:grid grid-cols-[96px_2fr_100px_140px_110px_40px] px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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

                    <div className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_2fr_100px_140px_110px_40px] items-center gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.originalName || item.name}
                        className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-playfair text-sm sm:text-base md:text-base text-warm-brown uppercase tracking-wide break-words">
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

                      <div className="hidden md:block text-center font-semibold text-amber-600 text-sm">
                        {formatPrice(item.price)}
                      </div>

                      <div className="hidden md:block justify-self-center">
                        <div className="flex items-center border border-gray-200 rounded-md min-w-[130px] justify-between">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={!canDecrement}
                            className="h-8 w-8 flex items-center justify-center text-gray-600 hover:text-primary-green disabled:opacity-40"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 flex items-center justify-center text-gray-600 hover:text-primary-green"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="hidden md:block text-right font-semibold text-sm">
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
              <h3 className="text-lg font-semibold text-warm-brown mb-4">
                Thông tin giao hàng
              </h3>
              
              {/* Buyer Name (from login) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên người nhận *
                </label>
                <input
                  type="text"
                  value={
                    userInfo?.name || 
                    `${userInfo?.lastName || ''} ${userInfo?.firstName || ''}`.trim() ||
                    ''
                  }
                  disabled
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                  placeholder="Đăng nhập để hiển thị tên"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Tên được lấy từ tài khoản đăng nhập
                </p>
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-green/40"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              {/* Address Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ giao hàng *
                </label>
                
                {/* House Number */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 50) {
                        setHouseNumber(value);
                      }
                    }}
                    maxLength={50}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-green/40"
                    placeholder="Số nhà, tên đường (tối đa 50 ký tự)"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {houseNumber.length}/50 ký tự
                  </p>
                </div>

                {/* Province Select */}
                <div className="mb-3">
                  <select
                    value={selectedProvince?.code || ''}
                    onChange={(e) => {
                      const province = provinces.find(p => p.code === Number(e.target.value));
                      setSelectedProvince(province || null);
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-green/40"
                    required
                  >
                    <option value="">-- Chọn Tỉnh/Thành phố --</option>
                    {provinces.map(province => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Select */}
                <div className="mb-3">
                  <select
                    value={selectedDistrict?.code || ''}
                    onChange={(e) => {
                      const district = districts.find(d => d.code === Number(e.target.value));
                      setSelectedDistrict(district || null);
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-green/40"
                    disabled={!selectedProvince}
                    required
                  >
                    <option value="">-- Chọn Quận/Huyện --</option>
                    {districts.map(district => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ward Select */}
                <div className="mb-3">
                  <select
                    value={selectedWard?.code || ''}
                    onChange={(e) => {
                      const ward = wards.find(w => w.code === Number(e.target.value));
                      setSelectedWard(ward || null);
                    }}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-green/40"
                    disabled={!selectedDistrict}
                    required
                  >
                    <option value="">-- Chọn Phường/Xã --</option>
                    {wards.map(ward => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display Full Address */}
                {buyerAddress && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Địa chỉ đầy đủ:</p>
                    <p className="text-sm text-gray-700 font-medium">{buyerAddress}</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-4">
                {t('cart.taxShipping')}
              </p>
              <button
                className="w-full bg-primary-green text-white font-bold py-4 rounded-lg hover:bg-primary-green/90 transition-colors uppercase tracking-wide"
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

      {/* ✅ Modal xác nhận đặt hàng */}
      {renderConfirmModal()}

      {/* 🎨 Toast Notification */}
      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default CartPage;
