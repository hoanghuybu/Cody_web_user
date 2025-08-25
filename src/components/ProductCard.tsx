import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-cream/30 group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* View Detail Button - Hidden by default, shows on hover */}
          <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-primary-green text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-primary-green/90 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-4/5 border border-white/20">
              {t('product.viewDetail')}
            </button>
          </div>
          
          {product.badge && (
            <span className="absolute top-4 left-4 bg-primary-green text-white px-3 py-1 text-xs font-bold tracking-wide rounded">
              {(() => {
                const map: Record<string,string> = {
                  'Mới': t('badges.new'),
                  'Bán chạy': t('badges.bestSeller'),
                  'Khuyến mãi': t('badges.promo')
                };
                const upper = map[product.badge] || product.badge;
                return upper.toUpperCase();
              })()}
            </span>
          )}
        </div>
        
        <div className="p-6 text-center bg-white">
          <h3 className="text-lg font-bold text-warm-brown mb-3 group-hover:text-primary-green transition-colors font-inter tracking-wide leading-tight">
            {t(`p.${product.id}.name`) || product.name}
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-xl font-bold text-warm-brown font-inter">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm font-inter">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {t(`p.${product.id}.desc`) || ''}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;