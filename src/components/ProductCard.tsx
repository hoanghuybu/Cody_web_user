import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ProductUtils } from '../utils/product';

interface ProductCardProps {
  product: Product;
  hoverActionText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, hoverActionText }) => {
  const { t } = useLanguage();
  const [qty, setQty] = useState<number>(1);
  const { addToCart, openCart } = useCart();

  const formatPrice = (price: number) => ProductUtils.formatPrice(price);

  return (
    <div className="transition-all duration-300 rounded-md relative bg-transparent shadow-none">
      <Link to={`/product/${product.id}`} className="block bg-transparent focus:outline-none">
        {/* Shared group: hovering image OR title will trigger group-hover effects */}
        <div className="group">
          <div className="relative overflow-hidden aspect-square bg-cream/30 rounded-md flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Overlay area - either 'View detail' or Add to Cart controls depending on hoverActionText */}
            <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {hoverActionText === t('product.addToCart') ? (
                <div className="pointer-events-auto w-4/5 bg-white/95 rounded-md p-2 flex flex-col items-center shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={(e) => { e.preventDefault(); setQty(Math.max(1, qty - 1)); }}
                      className="px-3 py-1 bg-gray-100 rounded-md"
                    >
                      -
                    </button>
                    <div className="px-4 py-1 font-semibold">{qty}</div>
                    <button
                      onClick={(e) => { e.preventDefault(); setQty(qty + 1); }}
                      className="px-3 py-1 bg-gray-100 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Use quantity-aware addToCart API once
                      addToCart(product, qty);
                      // Open the cart drawer/UI
                      openCart();
                    }}
                    className="w-full bg-primary-green text-white px-4 py-2 rounded-md font-semibold"
                  >
                    {hoverActionText}
                  </button>
                </div>
              ) : (
                <button className="pointer-events-auto bg-white text-primary-green px-6 py-2 rounded-md font-semibold text-sm transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200 shadow-md">
                  {hoverActionText || t('product.viewDetail')}
                </button>
              )}
            </div>

            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary-green text-white px-3 py-1 text-xs font-bold tracking-wide rounded">
                {(() => {
                  const map: Record<string, string> = {
                    Mới: t('badges.new'),
                    'Bán chạy': t('badges.bestSeller'),
                    'Khuyến mãi': t('badges.promo'),
                  } as any;
                  const upper = map[product.badge] || product.badge;
                  return String(upper).toUpperCase();
                })()}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4 text-center bg-transparent">
            <h3 className="text-lg font-bold text-warm-brown mb-2 transition-colors font-inter tracking-wide leading-tight cursor-pointer">
              {product.originalName || product.name}
            </h3>

            <div className="mb-3">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl font-bold text-warm-brown font-inter">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm font-inter mt-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {product.originalDescription || product.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;