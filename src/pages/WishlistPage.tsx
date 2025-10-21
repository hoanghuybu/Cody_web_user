import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import Toast from '../components/Toast';

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const [toast, setToast] = useState({
    open: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

  const showToast = (
    type: 'success' | 'error',
    title: string,
    message: string
  ) => {
    setToast({ open: true, type, title, message });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast('success', t('wishlist.addCart'), `${product.name} đã được thêm vào giỏ hàng.`);
  };

  const handleRemove = (product: Product) => {
    removeFromWishlist(product.id);
    showToast('success', t('wishlist.removed'), `${product.name} đã được xóa khỏi yêu thích.`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-light pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-8">
            {t('wishlist.title')}
          </h1>
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {t('wishlist.empty')}
            </h2>
            <p className="text-gray-500 mb-6">
              {t('wishlist.emptyDesc')}
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              {t('wishlist.browseProd')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair">
            {t('wishlist.title')}
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {t('wishlist.items')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.images?.[0]?.imageUrl || product.image || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-warm-brown mb-2 hover:text-primary-green transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary-green">
                    {product.price.toLocaleString('vi-VN')} VNĐ
                  </span>
                  {product.stockQuantity > 0 ? (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      {t('wishlist.inStock')}
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                      {t('wishlist.outStock')}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stockQuantity === 0}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary-green text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {t('wishlist.addCart')}
                  </button>
                  <button
                    onClick={() => handleRemove(product)}
                    className="p-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title={t('wishlist.remove')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default WishlistPage;
