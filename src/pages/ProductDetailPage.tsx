import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Truck, Shield, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { useProduct, useProductSearch } from '../hooks/useProducts';
import { ProductUtils } from '../utils/product';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { t } = useLanguage();
  
  // Fetch product by ID from API
  const { data: productResponse, isLoading: productLoading, error: productError } = useProduct(id || '');
  
  // Fetch related products (same category)
  const { data: relatedProductsData } = useProductSearch({
    page: 0,
    size: 8,
    sortBy: 'name',
    sortDirection: 'ASC'
  });

  // Convert API product to legacy format
  const product = productResponse?.data ? ProductUtils.toLegacyFormat(productResponse.data) : null;
  
  // Get related products (filter out current product and limit to 4)
  const relatedProducts = relatedProductsData?.data?.content
    ?.map(ProductUtils.toLegacyFormat)
    .filter(p => p.id !== id)
    .slice(0, 4) || [];

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-green mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (productError || !product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-brown mb-4">{t('productDetail.notFound')}</h2>
          <Link to="/products" className="text-primary-green hover:underline">
            {t('productDetail.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  // Get all gallery images from product
  const galleryImages = ProductUtils.getAllImages(product);
  
  // Ensure we have at least one image (fallback to main image)
  const displayImages = galleryImages.length > 0 ? galleryImages : [ProductUtils.getMainImage(product)];

  const formatPrice = (price: number) => {
    return ProductUtils.formatPrice(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const badgeKeyMap: Record<string, string> = {
    'Mới': 'badges.new',
    'Bán chạy': 'badges.bestSeller',
    'Khuyến mãi': 'badges.promo'
  };

  const translatedBadge = product.badge ? (badgeKeyMap[product.badge] ? t(badgeKeyMap[product.badge]) : product.badge) : null;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-green">{t('productDetail.breadcrumbHome')}</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-green">{t('productDetail.breadcrumbProducts')}</Link>
          <span>/</span>
          <span className="text-warm-brown">{t(product.name) || product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-primary-green hover:text-primary-green/80 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t('productDetail.backToList')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white">
              <img
                src={displayImages[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === index
                      ? 'border-primary-green'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {translatedBadge && (
              <span className="inline-block bg-accent-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                {translatedBadge}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair">
              {t(product.name) || product.name}
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {t(product.description) || product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-primary-green">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-warm-brown mb-2">{t('productDetail.ingredients')}:</h3>
                <ul className="text-gray-600 space-y-1">
                  {(product.ingredients || []).map((ingredient, index) => (
                    <li key={index}>• {t(ingredient) || ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <span className="font-semibold text-warm-brown">{t('productDetail.weight')}: </span>
                <span className="text-gray-600">{product.weight}</span>
              </div>
              <div>
                <span className="font-semibold text-warm-brown">{t('productDetail.category')}: </span>
                <span className="text-gray-600">{ProductUtils.getPrimaryCategory(product)}</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-primary-green"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-primary-green"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-8 py-3 bg-primary-green text-white font-semibold rounded-full hover:bg-primary-green/90 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('productDetail.addToCart')}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 mr-2" />
                {t('productDetail.favorite')}
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                {t('productDetail.share')}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary-green" />
                <span className="text-sm text-gray-600">{t('productDetail.featureFreeShip')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary-green" />
                <span className="text-sm text-gray-600">{t('productDetail.featureQuality')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-primary-green" />
                <span className="text-sm text-gray-600">{t('productDetail.featureNatural')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-warm-brown font-playfair mb-8">{t('productDetail.related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;