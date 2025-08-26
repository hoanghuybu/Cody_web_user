import { CategoriesResponse, CategoryResponse, CategorySearchParams } from '../types/category';

const API_BASE_URL = 'https://www.cody-be.online/api/v1';

export type { CategorySearchParams };

export class CategoryAPI {
  static async getCategories(params: CategorySearchParams = {}): Promise<CategoriesResponse> {
    const {
      page = 0,
      size = 50,
      sortBy = 'name',
      sortDirection = 'ASC',
      search
    } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDirection
    });

    if (search) {
      searchParams.append('search', search);
    }

    const url = `${API_BASE_URL}/categories?${searchParams.toString()}`;

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

  static async getAllCategories(): Promise<CategoriesResponse> {
    const url = `${API_BASE_URL}/categories/get-all`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoriesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Get All Categories API Error:', error);
      throw error;
    }
  }

  static async getCategoryById(id: string): Promise<CategoryResponse> {
    const url = `${API_BASE_URL}/categories/id/${id}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Category by ID API Error:', error);
      throw error;
    }
  }

  static async getCategoryBySlug(slug: string): Promise<CategoryResponse> {
    const url = `${API_BASE_URL}/categories/${slug}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Category by Slug API Error:', error);
      throw error;
    }
  }
}
