import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CategoryAPI, CategorySearchParams } from '../services/categoryAPI';
import { CategoriesResponse, CategoryResponse } from '../types/category';

export const CategoryQueryKeys = {
  all: ['categories'] as const,
  lists: () => [...CategoryQueryKeys.all, 'list'] as const,
  list: (params: CategorySearchParams) => [...CategoryQueryKeys.lists(), params] as const,
  details: () => [...CategoryQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...CategoryQueryKeys.details(), id] as const,
  bySlug: (slug: string) => [...CategoryQueryKeys.all, 'slug', slug] as const,
};

export const useCategories = (
  params: CategorySearchParams = {},
  options?: UseQueryOptions<CategoriesResponse>
) => {
  return useQuery({
    queryKey: CategoryQueryKeys.list(params),
    queryFn: () => CategoryAPI.getCategories(params),
    staleTime: 30 * 60 * 1000, 
    retry: 2,
    ...options
  });
};

export const useAllCategories = (
  options?: UseQueryOptions<CategoriesResponse>
) => {
  return useQuery({
    queryKey: [...CategoryQueryKeys.all, 'get-all'],
    queryFn: () => CategoryAPI.getAllCategories(),
    staleTime: 60 * 60 * 1000, 
    retry: 2,
    ...options
  });
};

export const useCategory = (
  id: string,
  options?: UseQueryOptions<CategoryResponse>
) => {
  return useQuery({
    queryKey: CategoryQueryKeys.detail(id),
    queryFn: () => CategoryAPI.getCategoryById(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000, 
    retry: (failureCount, error: any) => {
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
    ...options
  });
};

export const useCategoryBySlug = (
  slug: string,
  options?: UseQueryOptions<CategoryResponse>
) => {
  return useQuery({
    queryKey: CategoryQueryKeys.bySlug(slug),
    queryFn: () => CategoryAPI.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, 
    retry: (failureCount, error: any) => {
      if (error?.status === 404) {
        return false; 
      }
      return failureCount < 2;
    },
    ...options
  });
};
