import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartPage = () => {
  // Cart page with editable items and order summary
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { t } = useLanguage();

  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const FREE_SHIPPING_THRESHOLD = 300000;

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
            <p className="text-gray-600 mb-8">
              {t('cart.emptySubtitle')}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-primary-green text-white font-semibold rounded-full hover:bg-primary-green/90 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
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
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair">{t('cart.title')}</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{t('cart.itemsCount').replace('{count}', String(items.length))}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="xl:col-span-2">
            {/* Table header (desktop) */}
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
                  <div key={item.id} className="relative bg-white rounded-xl border border-gray-100 max-md:border-amber-200 shadow-sm px-3 sm:px-4 md:px-6 max-[320px]:px-2 py-3 md:py-4">
                    {/* Mobile delete (absolute) */}
                    <button
                      aria-label="Xóa sản phẩm khỏi giỏ hàng"
                      onClick={() => removeFromCart(item.id)}
                      className="md:hidden absolute top-2 right-2 inline-flex items-center p-2 max-[320px]:p-1.5 text-gray-400 hover:text-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200 transition"
                      title="Xóa"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    <div className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr_120px_160px_140px_40px] items-center gap-3 sm:gap-4">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={t(item.name) || item.originalName || item.name}
                        className="w-16 h-16 max-[320px]:w-14 max-[320px]:h-14 md:w-24 md:h-24 object-cover rounded-lg"
                      />

                      {/* Name and meta */}
                      <div className="flex flex-col gap-1">
                        <h3 className="font-playfair text-sm sm:text-base md:text-lg text-warm-brown leading-snug line-clamp-1 md:line-clamp-2 uppercase tracking-wide">{t(item.name) || item.originalName || item.name}</h3>
                        <div className="hidden md:flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">{item.weight}</span>
                        </div>
                        {/* Mobile inline price and total */}
                        <div className="mt-2 flex md:hidden items-center justify-between max-[320px]:justify-start max-[320px]:gap-2">
                          <span className="text-amber-600 font-semibold text-sm">{formatPrice(item.price)}</span>
                          <span className="text-sm font-semibold max-[320px]:hidden">{formatPrice(lineTotal)}</span>
                        </div>
                      </div>

                      {/* Price (desktop) */}
                      <div className="hidden md:block text-center font-semibold text-amber-600">{formatPrice(item.price)}</div>

                      {/* Quantity controls (desktop) */}
                      <div className="hidden md:block col-start-3 md:col-start-auto justify-self-end self-center">
                        <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm min-w-[160px] justify-between">
                          <button
                            aria-label={t('cart.decreaseQty')}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={!canDecrement}
                            className="h-9 w-9 flex items-center justify-center text-gray-600 hover:text-primary-green disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-green/40 transition"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1.5 font-semibold min-w-[3rem] text-center select-none">{item.quantity}</span>
                          <button
                            aria-label={t('cart.increaseQty')}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-9 w-9 flex items-center justify-center text-gray-600 hover:text-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/40 transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Line total (desktop) */}
                      <div className="hidden md:block text-right font-semibold">{formatPrice(lineTotal)}</div>

                      {/* Remove (desktop) */}
                      <button
                        aria-label={t('cart.removeItem')}
                        onClick={() => removeFromCart(item.id)}
                        className="col-start-3 md:col-start-auto justify-self-end hidden md:inline-flex items-center p-2 text-gray-400 hover:text-red-600 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200 transition"
                        title="Xóa"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    {/* Quantity controls (mobile bottom) */}
                    <div className="md:hidden flex justify-end mt-2 border-t border-gray-100 pt-2">
                      <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm min-w-[120px] max-[320px]:min-w-[112px] justify-between">
                        <button
                          aria-label={t('cart.decreaseQty')}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={!canDecrement}
                          className="h-8 w-8 max-[320px]:h-7 max-[320px]:w-7 flex items-center justify-center text-gray-600 hover:text-primary-green disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-green/40 transition"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1.5 font-semibold min-w-[2.5rem] text-center select-none max-[320px]:text-sm">{item.quantity}</span>
                        <button
                          aria-label={t('cart.increaseQty')}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 max-[320px]:h-7 max-[320px]:w-7 flex items-center justify-center text-gray-600 hover:text-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/40 transition"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear cart */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-medium">{t('cart.clearAll')}</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-4">
            {/* Free shipping banner */}
    <div className="rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-2 text-sm">
              {total < FREE_SHIPPING_THRESHOLD ? (
                <span>
                  {t('cart.freeShipRemain')}
                  <span className="font-semibold underline decoration-emerald-500">{formatPrice(FREE_SHIPPING_THRESHOLD - total)}</span>
                  {t('cart.freeShipRemainTail')}
                </span>
              ) : (
                <span>{t('cart.freeShipQualified')}</span>
              )}
            </div>

            {/* Notes collapsible */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <button
                type="button"
                onClick={() => setNoteOpen((v) => !v)}
                aria-expanded={noteOpen}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4"
              >
                <span className="font-semibold text-warm-brown">{t('cart.addNote')}</span>
                <span
                  className="inline-flex items-center justify-center h-6 w-6 rounded-full border border-gray-300 text-gray-600"
                  aria-hidden
                >
                  {noteOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </span>
              </button>
              {noteOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <label htmlFor="order-note" className="sr-only">{t('cart.noteLabel')}</label>
                  <textarea
                    id="order-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder={t('cart.notePlaceholder')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green/40"
                  />
                  <p className="mt-2 text-xs text-gray-500">{t('cart.noteHelp')}</p>
                </div>
              )}
            </div>

            {/* Summary card */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-700 mb-4">
                {t('cart.taxShipping')}
              </p>
              <button
        className="w-full bg-[#1f2a44] text-white font-bold py-4 rounded-lg hover:brightness-110 transition-colors uppercase tracking-wide"
              >
                {t('cart.checkout')} • {formatPrice(total)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;