import { Product } from '../types/product';

export class ProductUtils {
  static getMainImage(product: Product): string {
    const mainImage = product.images?.find(img => img.isMain);
    return mainImage?.imageUrl || product.images?.[0]?.imageUrl || product.image || '/placeholder-product.jpg';
  }

  static getAllImages(product: Product): string[] {
    if (product.images && product.images.length > 0) {
      return product.images.map(img => img.imageUrl).filter(Boolean);
    }
    
    const legacyImages = product.gallery || [];
    const mainImage = product.image ? [product.image] : [];
    
    return [...legacyImages, ...mainImage].filter(Boolean);
  }

  static getPrimaryCategory(product: Product): string {
    return product.categories?.[0]?.name || product.category || 'Uncategorized';
  }

  static isInStock(product: Product): boolean {
    if (typeof product.inStock === 'boolean') {
      return product.inStock;
    }
    return (product.stockQuantity || 0) > 0;
  }

  static formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  static getDiscountPercentage(product: Product): number | null {
    if (!product.originalPrice || product.originalPrice <= product.price) {
      return null;
    }
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }

  static getProductUrl(product: Product): string {
    return `/products/${product.slug || product.id}`;
  }

  static toLegacyFormat(product: Product): Product {
    return {
      ...product,
      originalName: product.name,
      originalDescription: product.description,
      name: `p.${product.id}.name`,
      description: `p.${product.id}.desc`,
      image: ProductUtils.getMainImage(product),
      category: ProductUtils.getPrimaryCategory(product),
      inStock: ProductUtils.isInStock(product),
      gallery: ProductUtils.getAllImages(product),
      ingredients: product.ingredients || [],
      weight: product.weight || ''
    };
  }

  static searchProducts(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.categories.some(cat => cat.name.toLowerCase().includes(term))
    );
  }

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
