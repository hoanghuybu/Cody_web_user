import { Category } from './category';

export interface ProductImage {
  id: string;
  imageUrl: string;
  isMain: boolean;
}

export type ProductCategory = Category;

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  metaDescription?: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  categories: ProductCategory[];
  images: ProductImage[];
  image?: string;
  category?: string;
  badge?: string;
  inStock?: boolean;
  ingredients?: string[];
  weight?: string;
  gallery?: string[];
  originalName?: string;
  originalDescription?: string;
}

export interface ProductSearchResponse {
  status: number;
  message: string;
  data: {
    content: Product[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
  };
}

export interface CartItem extends Product {
  quantity: number;
}