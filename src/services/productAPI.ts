import { ProductSearchResponse } from '../types/product';
import { CategoriesResponse } from '../types/category';

const API_BASE_URL = 'https://www.cody-be.online/api/v1';

export interface ProductSearchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  search?: string;
  categoryId?: string;
}

export class ProductAPI {
  static async searchProducts(params: ProductSearchParams = {}): Promise<ProductSearchResponse> {
    const {
      page = 0,
      size = 10,
      sortBy = 'name',
      sortDirection = 'ASC',
      search,
      categoryId
    } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDirection
    });

    if (search) {
      searchParams.append('keyword', search);
    }

    if (categoryId) {
      searchParams.append('categoryId', categoryId);
    }

    const url = `${API_BASE_URL}/products/search?${searchParams.toString()}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductSearchResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Product API Error:', error);
      throw error;
    }
  }

  static async getProductById(id: string) {
    const url = `${API_BASE_URL}/products/id/${id}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Product API Error:', error);
      throw error;
    }
  }

  static async getCategories(): Promise<CategoriesResponse> {
    const url = `${API_BASE_URL}/categories`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoriesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Categories API Error:', error);
      throw error;
    }
  }
}
