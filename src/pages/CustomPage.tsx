/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heart,
  Loader2,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingCart,
  Star,
  User,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthModal from '../components/auth/AuthModal';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import useLogin from '../hook/useLogin';
import useRegister from '../hook/useRegister';
import { useCreateCombo, useProductSearch } from '../hooks/useProducts';
import { isApiError } from '../lib/ApiError';
import { AuthUtils } from '../utils/auth';

interface CartItem {
  id: string;
  type: 'sticker' | 'product';
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const CustomPage: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const location = useLocation();
  const state = location.state as { tab?: 'gift' | 'sticker' };
  const [activeTab, setActiveTab] = useState<'gift' | 'sticker'>('gift');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [page, setPage] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState('CANDY');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    // name: '',
    note: '',
    items: '',
    buyerName: '',
    buyerPhone: '',
    addressUrl: '',
  });

  const [buyerInfo, setBuyerInfo] = useState({
    buyerName: '',
    buyerPhone: '',
    addressUrl: '',
  });
  const size = 6;
  const { data: productsData, isLoading: productsLoading } = useProductSearch({
    page,
    size,
    sortBy: 'name',
    sortDirection: 'ASC',
    categoryId: selectedCategoryId || undefined,
  });
  const { onCreateCombo, isLoading: isLoadingCreate } = useCreateCombo();

  const products = productsData?.data?.content ?? [];
  const totalPages = productsData?.data?.totalPages ?? 1;
  const currentPage = productsData?.data?.number ?? 0;

  // Form data for each tab (preserved when switching)
  const [giftData, setGiftData] = useState({
    // name: '',
    selectedStickers: [] as string[],
    selectedProducts: [] as string[],
  });

  const [stickerData, setStickerData] = useState({
    // name: '',
    selectedStickers: [] as string[],
    selectedProducts: [] as string[],
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [note, setNote] = useState('');

  const { mutateAsync: doLogin } = useLogin();
  const { mutateAsync: doRegister } = useRegister();

  const getCurrentData = () => (activeTab === 'gift' ? giftData : stickerData);
  const setCurrentData = (data: any) => {
    if (activeTab === 'gift') {
      setGiftData(data);
    } else {
      setStickerData(data);
    }
  };

  const handleStickerSelect = (stickerId: string) => {
    const currentData = getCurrentData();
    const isSelected = currentData.selectedStickers.includes(stickerId);

    if (isSelected) {
      setCurrentData({
        ...currentData,
        selectedStickers: currentData.selectedStickers.filter(
          (id) => id !== stickerId
        ),
      });
      removeFromCart(stickerId);
    } else {
      setCurrentData({
        ...currentData,
        selectedStickers: [...currentData.selectedStickers, stickerId],
      });
      const sticker = products?.find((s) => s.id === stickerId);
      if (sticker) {
        addToCart({
          id: sticker.id,
          type: 'sticker',
          name: sticker.name,
          image: sticker?.image ?? '',
          price: sticker.price,
          quantity: 1,
        });
      }
    }
  };

  const handleProductSelect = (productId: string) => {
    const currentData = getCurrentData();
    const isSelected = currentData.selectedProducts.includes(productId);

    if (isSelected) {
      setCurrentData({
        ...currentData,
        selectedProducts: currentData.selectedProducts.filter(
          (id) => id !== productId
        ),
      });
      removeFromCart(productId);
    } else {
      setCurrentData({
        ...currentData,
        selectedProducts: [...currentData.selectedProducts, productId],
      });
      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart({
          id: product.id,
          type: 'product',
          name: product.name,
          image: product.isCombo
            ? product.comboImageUrl || ''
            : product?.images?.[0]?.imageUrl || '',
          price: product.price,
          quantity: 1,
        });
      }
    }
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      // Also update selection state
      const currentData = getCurrentData();
      setCurrentData({
        ...currentData,
        selectedStickers: currentData.selectedStickers.filter(
          (id) => id !== itemId
        ),
        selectedProducts: currentData.selectedProducts.filter(
          (id) => id !== itemId
        ),
      });
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleOrder = () => {
    const token = AuthUtils.getAccessToken();
    // validate currentData.name, note, items
    const currentData = getCurrentData();
    // const totalItems = getTotalItems();
    const newErrors: any = { name: '', note: '', items: '' };
    let hasError = false;
    let errortext = '';

    // if (!currentData.name.trim()) {
    //   newErrors.name = t('error.nameCombo');
    //   errortext += `${t('error.nameCombo')}\n`;
    //   hasError = true;
    // }

    if (!note.trim()) {
      newErrors.note = t('error.noteCombo');
      errortext += `${t('error.noteCombo')}\n`;
      hasError = true;
    }

    setErrors(newErrors);

    if (!token) {
      setAuthOpen(true);
      return;
    }

    if (!hasError) {
      setIsModalOpen(true);
    } else {
      showToast({
        type: 'error',
        title: t('common.error'),
        message: errortext,
      });
    }
  };

  const handleConfirm = async () => {
    const currentData = getCurrentData();
    const newErrors: any = { buyerName: '', buyerPhone: '', addressUrl: '' };
    let hasError = false;

    if (!buyerInfo.buyerName.trim()) {
      newErrors.buyerName = t('error.buyerName');
      hasError = true;
    }

    if (!buyerInfo.buyerPhone.trim()) {
      newErrors.buyerPhone = t('error.buyerPhone');
      hasError = true;
    }

    if (!buyerInfo.addressUrl.trim()) {
      newErrors.addressUrl = t('error.addressUrl');
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      const body = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        buyerName: buyerInfo.buyerName,
        buyerPhone: buyerInfo.buyerPhone,
        addressUrl: buyerInfo.addressUrl,
        customComboName: 'Combo custom order',
        note: note,
        isCombo: true,
        paymentMethod: 'COD',
        sellerId: 'S9R2-005242',
      };

      try {
        await onCreateCombo(body);

        setBuyerInfo({
          buyerName: '',
          buyerPhone: '',
          addressUrl: '',
        });

        // ✅ Reset current tab’s data
        if (activeTab === 'gift') {
          setGiftData({
            // name: '',
            selectedStickers: [],
            selectedProducts: [],
          });
        } else {
          setStickerData({
            // name: '',
            selectedStickers: [],
            selectedProducts: [],
          });
        }

        // ✅ Reset common form state
        setNote('');
        setCart([]);
        setErrors({
          // name: '',
          note: '',
          items: '',
          buyerName: '',
          buyerPhone: '',
          addressUrl: '',
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error creating combo:', error);
      }
    }
  };

  const handleSignIn = async (d: { email: string; password: string }) => {
    try {
      const res = (await doLogin(d)) as any;

      if (res?.status === 200 && res?.data?.accessToken) {
        AuthUtils.saveAuthData(res.data.accessToken, res.data.refreshToken);

        // Save user info to sessionStorage for CartPage
        if (res.data.info) {
          sessionStorage.setItem('user_info', JSON.stringify(res.data.info));
        }

        const userName =
          res.data.info?.name ||
          `${res.data.info?.lastName || ''} ${
            res.data.info?.firstName || ''
          }`.trim();
        if (userName) {
          showToast({
            type: 'success',
            title: t('auth.loginSuccess'),
            message: `${t('auth.welcome')} ${userName}!`,
          });
        } else {
          showToast({
            type: 'success',
            title: t('auth.loginSuccess'),
            message: t('auth.loginSuccessMessage'),
          });
        }

        setAuthOpen(false);
        // Reload page after successful login
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (res?.status && res?.status !== 200) {
        // Show generic error message instead of backend details
        showToast({
          type: 'error',
          title: t('auth.loginFailed'),
          message: t('auth.genericError'),
        });
      } else {
        showToast({
          type: 'error',
          title: t('auth.loginFailed'),
          message: t('auth.genericError'),
        });
      }
    } catch (e: any) {
      // Show generic message to user
      showToast({
        type: 'error',
        title: t('auth.loginFailed'),
        message: t('auth.genericError'),
      });
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
        confirmPassword: d.password,
      };
      const res = (await doRegister(registerData)) as any;
      if (res?.status === 200) {
        setAuthMode('signin');
        showToast({
          type: 'success',
          title: t('auth.registrationSuccess'),
          message: t('auth.registrationSuccessMessage'),
        });
      } else if (res?.status && res?.status !== 200) {
        showToast({
          type: 'error',
          title: t('auth.registrationFailed'),
          message: t('auth.genericError'),
        });
      } else {
        showToast({
          type: 'error',
          title: t('auth.registrationFailed'),
          message: t('auth.genericError'),
        });
      }
    } catch (e: any) {
      if (isApiError(e)) {
        const data: any = e.data;
        const fieldErrors = data?.errors || data?.error?.fields;
        if (fieldErrors && typeof fieldErrors === 'object') {
          const firstKey = Object.keys(fieldErrors)[0];
          if (firstKey) {
            // Field validation error occurred
            showToast({
              type: 'error',
              title: t('auth.registrationFailed'),
              message: t('auth.genericError'),
            });
          } else {
            showToast({
              type: 'error',
              title: t('auth.registrationFailed'),
              message: t('auth.genericError'),
            });
          }
          return;
        }
        const detail = data?.error?.detail || data?.message;
        if (detail) {
          // Error detail received
        }
        showToast({
          type: 'error',
          title: t('auth.registrationFailed'),
          message: t('auth.genericError'),
        });
      } else {
        showToast({
          type: 'error',
          title: t('auth.registrationFailed'),
          message: t('auth.genericError'),
        });
      }
    }
  };

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const renderDescription = () => {
    const isGift = activeTab === 'gift';
    const title = isGift ? t('personalize.heroSubtitle') : t('sticker.intro');
    const subTitle = isGift ? t('personalize.intro') : t('sticker.introDes');
    const content = isGift
      ? {
          intro: t('personalize.reasonsTitle'),
          introDes1: t('sticker.finalDes'),
          introDes2: t('sticker.finalDes'),

          features: t('personalize.customTitle'),
          reason: t('personalize.whyTitle'),
        }
      : {
          intro: t('sticker.finalTitle'),
          introDes1: t('sticker.finalDes'),
          introDes2: t('sticker.cta'),
          features: t('sticker.customizationTitle'),
          reason: t('sticker.reasonTitle'),
        };

    const whyItems = isGift
      ? [
          {
            title: t('personalize.why.p1.title'),
            desc: t('personalize.why.p1.desc'),
          },
          {
            title: t('personalize.why.p2.title'),
            desc: t('personalize.why.p2.desc'),
          },
          {
            title: t('personalize.why.p3.title'),
            desc: t('personalize.why.p3.desc'),
          },
        ]
      : [
          {
            title: t('sticker.reasonCustomize'),
            desc: t('sticker.reasonCustomizeDes'),
          },
          {
            title: t('sticker.reasonMessage'),
            desc: t('sticker.reasonMessageDes'),
          },
          {
            title: t('sticker.reasonQuality'),
            desc: t('sticker.reasonQualityDes'),
          },
        ];
    const featuresItems = isGift
      ? [
          {
            title: t('personalize.custom.p1.title'),
            desc: t('personalize.custom.p1.desc'),
          },
          {
            title: t('personalize.custom.p2.title'),
            desc: t('personalize.custom.p2.desc'),
          },
          {
            title: t('personalize.custom.p3.title'),
            desc: t('personalize.custom.p3.desc'),
          },
        ]
      : [
          {
            title: t('sticker.chooseDesign'),
            desc: t('sticker.chooseDesignDes'),
          },
          {
            title: t('sticker.addToGift'),
            desc: t('sticker.addToGiftDes'),
          },
          {
            title: t('sticker.addPersonalMessage'),
            desc: t('sticker.addPersonalMessageDes'),
          },
        ];

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {subTitle}
          </p>
          <div className="w-4/5 h-1 bg-primary-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {/* 1️⃣ WHY SECTION */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-accent-green" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              {content.reason}
            </h3>
            <div className="space-y-4">
              {whyItems.map((item, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800 mb-1">
                    • {item.title}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2️⃣ FEATURES SECTION */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-light-green/10 rounded-xl flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-light-green" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              {content.features}
            </h3>
            <div className="space-y-4">
              {featuresItems.map((item, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800 mb-1">
                    • {item.title}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3️⃣ FINAL / CTA SECTION */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary-green" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              {activeTab === 'gift'
                ? t('personalize.reasonsTitle')
                : t('sticker.finalTitle')}
            </h3>
            <div className="space-y-4">
              {activeTab === 'gift' ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <p className="font-semibold text-gray-800 mb-1">
                        • {t(`personalize.reasons.p${i}.title`)}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {t(`personalize.reasons.p${i}.desc`)}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      • {t('sticker.finalDes')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed">
                      • {t('sticker.cta')}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    const currentData = getCurrentData();

    return (
      <div className="space-y-8">
        {/* Name Input */}
        {/* <div className=" rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-warm-brown mb-4 font-playfair">
            {activeTab === 'gift'
              ? t('custom.name.gift')
              : t('custom.name.sticker')}
          </h3>
          <input
            type="text"
            value={currentData.name}
            onChange={(e) =>
              setCurrentData({ ...currentData, name: e.target.value })
            }
            placeholder={`${
              activeTab === 'gift'
                ? t('custom.placeholder.gift')
                : t('custom.placeholder.sticker')
            } `}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div> */}

        {/* Stickers Selection */}
        {activeTab === 'sticker' && (
          <>
            <div className=" rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-warm-brown mb-4 font-playfair">
                {t('custom.name.sticker')} (
                {currentData.selectedStickers.length} {t('custom.selected')})
              </h3>

              {productsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-200 rounded-xl animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {products?.map((sticker) => (
                    <div
                      key={sticker.id}
                      onClick={() => handleStickerSelect(sticker.id)}
                      className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        currentData.selectedStickers.includes(sticker.id)
                          ? 'ring-4 ring-primary-green shadow-lg'
                          : 'hover:ring-2 hover:ring-primary-green/50'
                      }`}
                    >
                      <div className="aspect-square">
                        <img
                          src={sticker.images?.[0]?.imageUrl}
                          alt={sticker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-3 text-white">
                          <p className="font-semibold text-sm">
                            {sticker.name}
                          </p>
                          <p className="text-xs opacity-90">
                            {formatPrice(sticker.price)}
                          </p>
                        </div>
                      </div>
                      {currentData.selectedStickers.includes(sticker.id) && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                          <Plus className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Products Selection */}
        {activeTab === 'gift' && (
          <div className=" rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-warm-brown mb-4 font-playfair">
              {t('custom.name.gift')} ({currentData.selectedProducts.length}{' '}
              {t('custom.selected')})
            </h3>

            {productsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="flex space-x-4 p-4 bg-gray-100 rounded-xl animate-pulse"
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products?.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className={`flex space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      currentData.selectedProducts.includes(product.id)
                        ? 'bg-primary-green/10 ring-2 ring-primary-green shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <img
                      src={
                        product.isCombo
                          ? product.comboImageUrl
                          : product.images?.[0]?.imageUrl
                      }
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-warm-brown mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-primary-green font-bold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    {currentData.selectedProducts.includes(product.id) && (
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                          <Plus className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!productsLoading && products.length > 0 && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            {/* Trang trước */}
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Trang trước
            </button>

            {/* Số trang */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`px-3 py-1 rounded ${
                    i === currentPage
                      ? 'bg-primary-green text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Trang sau */}
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (activeTab && activeTab === 'gift') {
      setPage(0);
      setSelectedCategoryId('CANDY');
    } else {
      setPage(0);
      setSelectedCategoryId('STICKER');
    }
  }, [activeTab]);

  useEffect(() => {
    if (state?.tab) {
      setActiveTab(state.tab);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12  rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-warm-brown font-playfair mb-4">
            {activeTab === 'gift'
              ? t('personalize.heroTitle')
              : t('sticker.title')}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className=" rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('gift')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'gift'
                    ? 'bg-primary-green text-white shadow-lg transform scale-105'
                    : 'text-warm-brown hover:bg-gray-50'
                }`}
              >
                PERSONALIZED GIFT
              </button>
              <button
                onClick={() => setActiveTab('sticker')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'sticker'
                    ? 'bg-primary-green text-white shadow-lg transform scale-105'
                    : 'text-warm-brown hover:bg-gray-50'
                }`}
              >
                CUSTOMIZE STICKERS
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              key={activeTab}
              className="animate-fade-in"
              style={{
                animation: 'fadeIn 0.5s ease-in-out',
              }}
            >
              {/* Description Section */}
              <div className="mb-12">{renderDescription()}</div>

              {/* Form Section */}
              <div>{renderForm()}</div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className=" rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-warm-brown font-playfair">
                    {t('cart')}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-primary-green" />
                    <span className="bg-primary-green text-white text-sm px-2 py-1 rounded-full">
                      {getTotalItems()}
                    </span>
                  </div>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{t('noItem')}</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-warm-brown truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {item.type === 'sticker' ? 'Sticker' : 'Sản phẩm'}
                          </p>
                          <p className="text-sm text-primary-green font-bold">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-primary-green/80 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => updateCartQuantity(item.id, 0)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Note Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('specialNotes')}
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t('placeholder.note')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent resize-none text-sm"
                  />
                  {errors.note && (
                    <p className="text-red-500 text-sm mt-2">{errors.note}</p>
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-warm-brown">
                      {t('cart.total')}
                    </span>
                    <span className="text-xl font-bold text-primary-green">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>

                  <button
                    disabled={cart.length === 0}
                    onClick={handleOrder}
                    className="w-full bg-primary-green text-white py-3 rounded-xl font-semibold hover:bg-primary-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {t('custom.button.order')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitch={(m) => setAuthMode(m)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onSignUpFieldErrors={(errs) => {
          // Field validation errors - show generic message to user
          const firstKey = Object.keys(errs)[0] as
            | keyof typeof errs
            | undefined;
          if (firstKey) {
            // Field validation error occurred
            showToast({
              type: 'error',
              title: t('auth.registrationFailed'),
              message: t('auth.genericError'),
            });
          }
        }}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              {t('order.info.title')}
            </h2>

            {/* Form fields */}
            <div className="space-y-5">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('order.buyer.name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('order.buyer.name.placeholder')}
                    value={buyerInfo.buyerName}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, buyerName: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all placeholder-gray-400"
                  />
                </div>
                {errors.buyerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.buyerName}
                  </p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('order.buyer.phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('order.buyer.phone.placeholder')}
                    value={buyerInfo.buyerPhone}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, buyerPhone: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all placeholder-gray-400"
                  />
                </div>
                {errors.buyerPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.buyerPhone}
                  </p>
                )}
              </div>

              {/* Địa chỉ nhận hàng */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('order.address.url')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('order.address.url.placeholder')}
                    value={buyerInfo.addressUrl}
                    onChange={(e) =>
                      setBuyerInfo({ ...buyerInfo, addressUrl: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all placeholder-gray-400"
                  />
                </div>
                {errors.addressUrl && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.addressUrl}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                disabled={isLoadingCreate}
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-60"
              >
                {isLoadingCreate ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t('common.cancel')
                )}
              </button>
              <button
                disabled={isLoadingCreate}
                onClick={handleConfirm}
                className="px-5 py-2.5 text-sm font-medium bg-primary-green text-white rounded-xl hover:bg-primary-green/90 shadow-sm transition-all disabled:opacity-60"
              >
                {isLoadingCreate ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t('common.confirm')
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CustomPage;
