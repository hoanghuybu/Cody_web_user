export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  metaDescription?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  status: number;
  message: string;
  data: Category;
}

export interface CategoriesResponse {
  status: number;
  message: string;
  data: {
    content: Category[];
  };
}

export interface CategorySearchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  search?: string;
}
