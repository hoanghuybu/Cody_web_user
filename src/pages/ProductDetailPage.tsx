import {
  ArrowLeft,
  Award,
  Heart,
  Share2,
  Shield,
  ShoppingCart,
  Truck,
  Link as LinkIcon,
  Facebook,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { useProduct, useProductSearch } from '../hooks/useProducts';
import { ProductUtils } from '../utils/product';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({ open: false, type: 'success', title: '', message: '' });

  const { t } = useLanguage();

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setToast({ open: true, type, title, message });
  };

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (shareMenuOpen && !target.closest('.share-dropdown-container')) {
        setShareMenuOpen(false);
      }
    };
    if (shareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareMenuOpen]);

  // Fetch product by ID from API
  const {
    data: productResponse,
    isLoading: productLoading,
    error: productError,
  } = useProduct(id || '');

  // Fetch related products (same category)
  const { data: relatedProductsData } = useProductSearch({
    page: 0,
    size: 8,
    sortBy: 'name',
    sortDirection: 'ASC',
  });

  // Convert API product to legacy format
  const product = productResponse?.data
    ? ProductUtils.toLegacyFormat(productResponse.data)
    : null;

  // Get related products (filter out current product and limit to 4)
  const relatedProducts =
    relatedProductsData?.data?.content
      ?.map(ProductUtils.toLegacyFormat)
      .filter((p) => p.id !== id)
      .slice(0, 4) || [];

  // Loading state
  if (productLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-brown mb-4">
            {t('productDetail.notFound')}
          </h2>
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
  const displayImages =
    galleryImages.length > 0
      ? galleryImages
      : [ProductUtils.getMainImage(product)];

  const formatPrice = (price: number) => {
    return ProductUtils.formatPrice(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast('success', 'Đã sao chép!', 'Link sản phẩm đã được sao chép vào clipboard.');
      setShareMenuOpen(false);
    });
  };

  const handleShareFacebook = () => {
    const currentUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShareMenuOpen(false);
  };

  const badgeKeyMap: Record<string, string> = {
    Mới: 'badges.new',
    'Bán chạy': 'badges.bestSeller',
    'Khuyến mãi': 'badges.promo',
  };

  const translatedBadge = product.badge
    ? badgeKeyMap[product.badge]
      ? t(badgeKeyMap[product.badge])
      : product.badge
    : null;

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Open Graph Meta Tags for Social Sharing */}
      <Helmet>
        <title>{product.originalName || product.name} - Cody Coconut Candy</title>
        <meta name="description" content={product.description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={`${product.originalName || product.name} - Cody Coconut Candy`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={ProductUtils.getMainImage(product)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Product specific */}
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="VND" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.href} />
        <meta name="twitter:title" content={`${product.originalName || product.name} - Cody Coconut Candy`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={ProductUtils.getMainImage(product)} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-green">
            {t('productDetail.breadcrumbHome')}
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-green">
            {t('productDetail.breadcrumbProducts')}
          </Link>
          <span>/</span>
          <span className="text-warm-brown">
            {product.originalName || product.name}
          </span>
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
              {product.originalName || product.name}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.originalDescription || product.description}
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
                <h3 className="font-semibold text-warm-brown mb-2">
                  {t('productDetail.ingredients')}:
                </h3>
                <ul className="text-gray-600 space-y-1">
                  {(product.ingredients || []).map((ingredient, index) => (
                    <li key={index}>• {t(ingredient) || ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-semibold text-warm-brown">
                  {t('productDetail.weight')}:{' '}
                </span>
                <span className="text-gray-600">{product.weight}</span>
              </div>
              <div>
                <span className="font-semibold text-warm-brown">
                  {t('productDetail.category')}:{' '}
                </span>
                <span className="text-gray-600">
                  {ProductUtils.getPrimaryCategory(product)}
                </span>
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
              <button 
                onClick={() => {
                  if (product) {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      showToast('success', t('wishlist.removed'), `${product.name} đã được xóa khỏi yêu thích.`);
                    } else {
                      addToWishlist(product);
                      showToast('success', t('wishlist.added'), `${product.name} đã được thêm vào yêu thích.`);
                    }
                  }
                }}
                className={`flex items-center px-4 py-2 border rounded-full transition-colors ${
                  product && isInWishlist(product.id)
                    ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart 
                  className={`h-4 w-4 mr-2 ${
                    product && isInWishlist(product.id) ? 'fill-red-500' : ''
                  }`} 
                />
                {product && isInWishlist(product.id) ? 'Đã yêu thích' : t('productDetail.favorite')}
              </button>
              
              {/* Share Button with Dropdown */}
              <div className="relative share-dropdown-container">
                <button 
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {t('productDetail.share')}
                </button>

                {/* Share Dropdown Menu */}
                {shareMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-warm-brown hover:bg-gray-50 transition-colors"
                    >
                      <LinkIcon className="h-5 w-5 text-gray-600" />
                      <span>Sao chép link</span>
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleShareFacebook}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-warm-brown hover:bg-blue-50 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span>Chia sẻ lên Facebook</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary-green" />
                <span className="text-sm text-gray-600">
                  {t('productDetail.featureFreeShip')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary-green" />
                <span className="text-sm text-gray-600">
                  {t('productDetail.featureQuality')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-primary-green" />
                <span className="text-sm text-gray-600">
                  {t('productDetail.featureNatural')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-warm-brown font-playfair mb-8">
              {t('productDetail.related')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
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

export default ProductDetailPage;
