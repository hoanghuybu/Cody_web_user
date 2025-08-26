import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, total, updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 300000;
  const shippingFee = total >= FREE_SHIPPING_THRESHOLD ? 0 : 30000;
  const finalTotal = total + shippingFee;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className={`fixed inset-0 z-[60] ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'} `} aria-hidden={!isCartOpen}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeCart}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold tracking-wide text-warm-brown">Giỏ hàng</h2>
          <button onClick={closeCart} aria-label="Đóng" className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col h-full min-h-0">
          {/* Items */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-16">Chưa có sản phẩm nào.</p>
            ) : (
              items.map((item) => {
                const line = item.price * item.quantity;
                const canDec = item.quantity > 1;
                return (
                  <div key={item.id} className="grid grid-cols-[64px_1fr_auto] gap-3 p-3 border border-gray-100 rounded-lg">
                    <img src={item.image} alt={t(item.name) || item.originalName || item.name} className="w-16 h-16 rounded object-cover" />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-warm-brown truncate">{t(item.name) || item.originalName || item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.weight}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            aria-label="Giảm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={!canDec}
                            className="h-7 w-7 flex items-center justify-center text-gray-600 disabled:opacity-40"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-sm font-semibold select-none">{item.quantity}</span>
                          <button
                            aria-label="Tăng"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 flex items-center justify-center text-gray-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          aria-label="Xóa"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-warm-brown">{formatPrice(item.price)}</div>
                      <div className="mt-1 inline-flex px-2 py-0.5 rounded-full bg-primary-green/10 text-primary-green text-xs font-semibold">
                        {formatPrice(line)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Summary */}
          <div
            className="border-t border-gray-200 p-4 space-y-3 bg-white sticky bottom-0"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-semibold">{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-base font-bold">Tổng</span>
              <span className="text-base font-bold text-primary-green">{formatPrice(finalTotal)}</span>
            </div>
            <button
              className="w-full bg-primary-green text-white font-semibold py-3 rounded-full hover:bg-primary-green/90 transition-colors"
              onClick={() => { closeCart(); navigate('/cart'); }}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
