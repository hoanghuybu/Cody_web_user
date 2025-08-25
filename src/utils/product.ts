import { Product } from '../types/product';

export class ProductUtils {
  // Get main image URL from product images array
  static getMainImage(product: Product): string {
    const mainImage = product.images?.find(img => img.isMain);
    return mainImage?.imageUrl || product.images?.[0]?.imageUrl || product.image || '/placeholder-product.jpg';
  }

  // Get all image URLs from product
  static getAllImages(product: Product): string[] {
    const apiImages = product.images?.map(img => img.imageUrl) || [];
    const legacyImages = product.gallery || [];
    const mainImage = product.image ? [product.image] : [];
    
    return [...apiImages, ...legacyImages, ...mainImage].filter(Boolean);
  }

  // Get primary category name
  static getPrimaryCategory(product: Product): string {
    return product.categories?.[0]?.name || product.category || 'Uncategorized';
  }

  // Check if product is in stock
  static isInStock(product: Product): boolean {
    if (typeof product.inStock === 'boolean') {
      return product.inStock;
    }
    return (product.stockQuantity || 0) > 0;
  }

  // Format price to Vietnamese currency
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  // Calculate discount percentage
  static getDiscountPercentage(product: Product): number | null {
    if (!product.originalPrice || product.originalPrice <= product.price) {
      return null;
    }
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  // Get product URL slug
  static getProductUrl(product: Product): string {
    return `/products/${product.slug || product.id}`;
  }

  // Convert API product to legacy format for compatibility
  static toLegacyFormat(product: Product): Product {
    return {
      ...product,
      image: ProductUtils.getMainImage(product),
      category: ProductUtils.getPrimaryCategory(product),
      inStock: ProductUtils.isInStock(product),
      gallery: ProductUtils.getAllImages(product),
      ingredients: product.ingredients || [],
      weight: product.weight || ''
    };
  }

  // Search products by text
  static searchProducts(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.categories.some(cat => cat.name.toLowerCase().includes(term))
    );
  }

  // Sort products
  static sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }
}
