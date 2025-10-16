/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heart,
  Minus,
  Package,
  Palette,
  Plus,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Mock data types
interface Sticker {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface CartItem {
  id: string;
  type: 'sticker' | 'product';
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Mock API functions
const fetchStickers = async (): Promise<Sticker[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: 'sticker-1',
      name: 'Coconut Palm Sticker',
      image:
        'https://images.pexels.com/photos/2872418/pexels-photo-2872418.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 15000,
    },
    {
      id: 'sticker-2',
      name: 'Ben Tre Logo Sticker',
      image:
        'https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 12000,
    },
    {
      id: 'sticker-3',
      name: 'Traditional Pattern Sticker',
      image:
        'https://images.pexels.com/photos/11406167/pexels-photo-11406167.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 18000,
    },
    {
      id: 'sticker-4',
      name: 'Coconut Candy Sticker',
      image:
        'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 20000,
    },
    {
      id: 'sticker-5',
      name: 'Vintage CODY Sticker',
      image:
        'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 25000,
    },
    {
      id: 'sticker-6',
      name: 'Eco-Friendly Sticker',
      image:
        'https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg?auto=compress&cs=tinysrgb&w=300',
      price: 22000,
    },
  ];
};

const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 'product-1',
      name: 'Kẹo Dừa Truyền Thống',
      image:
        'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Kẹo dừa nguyên chất theo công thức truyền thống',
      price: 45000,
    },
    {
      id: 'product-2',
      name: 'Kẹo Dừa Sầu Riêng',
      image:
        'https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Hương vị độc đáo của sầu riêng kết hợp dừa',
      price: 65000,
    },
    {
      id: 'product-3',
      name: 'Combo Mix 3 Vị',
      image:
        'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Combo 3 vị: truyền thống, cà phê và sầu riêng',
      price: 125000,
    },
    {
      id: 'product-4',
      name: 'Hộp Quà Cao Cấp',
      image:
        'https://images.pexels.com/photos/6697264/pexels-photo-6697264.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Hộp quà sang trọng với 6 loại kẹo dừa đặc biệt',
      price: 280000,
    },
    {
      id: 'product-5',
      name: 'Kẹo Dừa Cà Phê',
      image:
        'https://images.pexels.com/photos/8835098/pexels-photo-8835098.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Hương vị đậm đà của cà phê Arabica',
      price: 55000,
    },
    {
      id: 'product-6',
      name: 'Giỏ Quà Bến Tre',
      image:
        'https://images.pexels.com/photos/1028637/pexels-photo-1028637.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Giỏ quà đặc sản với nhiều sản phẩm từ dừa',
      price: 350000,
    },
  ];
};

const CustomPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gift' | 'sticker'>('gift');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingStickers, setLoadingStickers] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Form data for each tab (preserved when switching)
  const [giftData, setGiftData] = useState({
    name: '',
    selectedStickers: [] as string[],
    selectedProducts: [] as string[],
  });

  const [stickerData, setStickerData] = useState({
    name: '',
    selectedStickers: [] as string[],
    selectedProducts: [] as string[],
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [note, setNote] = useState('');

  // Load data on component mount
  useEffect(() => {
    loadStickers();
    loadProducts();
  }, []);

  const loadStickers = async () => {
    setLoadingStickers(true);
    try {
      const data = await fetchStickers();
      setStickers(data);
    } catch (error) {
      console.error('Error loading stickers:', error);
    } finally {
      setLoadingStickers(false);
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

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
      const sticker = stickers.find((s) => s.id === stickerId);
      if (sticker) {
        addToCart({
          id: sticker.id,
          type: 'sticker',
          name: sticker.name,
          image: sticker.image,
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
          image: product.image,
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
    const title = isGift ? 'PERSONALIZED GIFT' : 'CUSTOMIZE STICKERS';
    const content = isGift
      ? {
          intro:
            'Tạo những món quà độc đáo và ý nghĩa với dịch vụ cá nhân hóa của CODY. Chúng tôi giúp bạn biến những ý tưởng sáng tạo thành hiện thực.',
          why: 'Tại sao chọn quà tặng cá nhân hóa? Bởi vì mỗi người đều có câu chuyện riêng, và món quà tốt nhất là món quà mang dấu ấn cá nhân. Với CODY, bạn có thể tạo ra những món quà thật sự đặc biệt.',
          features:
            'Chúng tôi cung cấp dịch vụ thiết kế theo yêu cầu, in ấn chất lượng cao, và đóng gói sang trọng. Từ sticker cá nhân đến hộp quà hoàn chỉnh, mọi chi tiết đều được chăm chút tỉ mỉ.',
          reason:
            'Chọn CODY vì chúng tôi hiểu rằng món quà không chỉ là vật phẩm, mà là cách thể hiện tình cảm. Đội ngũ thiết kế chuyên nghiệp và quy trình sản xuất nghiêm ngặt đảm bảo sản phẩm hoàn hảo nhất.',
        }
      : {
          intro:
            'Thiết kế sticker độc đáo theo phong cách riêng của bạn. CODY mang đến dịch vụ tùy chỉnh sticker chất lượng cao với công nghệ in hiện đại.',
          why: 'Tại sao chọn sticker tùy chỉnh? Sticker không chỉ là vật dụng trang trí, mà còn là cách thể hiện cá tính và thương hiệu. Với sticker tùy chỉnh, bạn có thể tạo ra những thiết kế độc nhất.',
          features:
            'Chúng tôi sử dụng chất liệu cao cấp, chống nước, bền màu và dễ dán. Hỗ trợ nhiều kích thước và hình dạng khác nhau. Công nghệ in UV hiện đại đảm bảo màu sắc sống động.',
          reason:
            'Chọn CODY vì chúng tôi có kinh nghiệm lâu năm trong ngành in ấn, đội ngũ thiết kế sáng tạo và cam kết chất lượng. Giá cả hợp lý, giao hàng nhanh chóng trên toàn quốc.',
        };

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary-green" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              Lời mở đầu
            </h3>
            <p className="text-gray-600 leading-relaxed">{content.intro}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-accent-green" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              Tại sao chọn {isGift ? 'quà tặng' : 'sticker'} tùy chỉnh?
            </h3>
            <p className="text-gray-600 leading-relaxed">{content.why}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-light-green/10 rounded-xl flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-light-green" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              Tính năng nổi bật
            </h3>
            <p className="text-gray-600 leading-relaxed">{content.features}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-warm-brown/10 rounded-xl flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-warm-brown" />
            </div>
            <h3 className="text-xl font-bold text-warm-brown mb-3 font-playfair">
              Tại sao chọn CODY?
            </h3>
            <p className="text-gray-600 leading-relaxed">{content.reason}</p>
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
        <div className=" rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-warm-brown mb-4 font-playfair">
            Tên {activeTab === 'gift' ? 'quà tặng' : 'sticker'}
          </h3>
          <input
            type="text"
            value={currentData.name}
            onChange={(e) =>
              setCurrentData({ ...currentData, name: e.target.value })
            }
            placeholder={`Nhập tên ${
              activeTab === 'gift' ? 'quà tặng' : 'sticker'
            } của bạn...`}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
          />
        </div>

        {/* Stickers Selection */}
        <div className=" rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-warm-brown mb-4 font-playfair">
            Chọn Sticker ({currentData.selectedStickers.length} đã chọn)
          </h3>

          {loadingStickers ? (
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
              {stickers.map((sticker) => (
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
                      src={sticker.image}
                      alt={sticker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3 text-white">
                      <p className="font-semibold text-sm">{sticker.name}</p>
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

        {/* Products Selection */}
        <div className=" rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-warm-brown mb-4 font-playfair">
            Chọn Sản phẩm ({currentData.selectedProducts.length} đã chọn)
          </h3>

          {loadingProducts ? (
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
              {products.map((product) => (
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
                    src={product.image}
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12  rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-bold text-warm-brown font-playfair mb-4">
            Tùy Chỉnh Theo Ý Bạn
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tạo ra những sản phẩm độc đáo và cá nhân hóa với dịch vụ tùy chỉnh
            của CODY
          </p>
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
            <div className="sticky top-8">
              <div className=" rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-warm-brown font-playfair">
                    Giỏ hàng
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
                    <p className="text-gray-500">Chưa có sản phẩm nào</p>
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
                    Ghi chú đặc biệt
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Nhập yêu cầu đặc biệt của bạn..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent resize-none text-sm"
                  />
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-warm-brown">
                      Tổng cộng:
                    </span>
                    <span className="text-xl font-bold text-primary-green">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>

                  <button
                    disabled={cart.length === 0}
                    className="w-full bg-primary-green text-white py-3 rounded-xl font-semibold hover:bg-primary-green/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Đặt hàng ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
