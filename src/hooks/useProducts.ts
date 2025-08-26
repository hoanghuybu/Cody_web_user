import { useQuery, UseQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { ProductAPI, ProductSearchParams } from '../services/productAPI';
import { ProductSearchResponse } from '../types/product';
import { QueryKeys } from '../lib/queryKeys';

export const useProductSearch = (
  params: ProductSearchParams = {},
  options?: UseQueryOptions<ProductSearchResponse>
) => {
  return useQuery({
    queryKey: QueryKeys.products.search(params),
    queryFn: () => ProductAPI.searchProducts(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: (failureCount, error: any) => {
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    ...options
  });
};

export const useProduct = (
  id: string,
  options?: UseQueryOptions<any>
) => {
  return useQuery({
    queryKey: QueryKeys.products.detail(id),
    queryFn: () => ProductAPI.getProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, 
    retry: (failureCount, error: any) => {
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
    ...options
  });
};

export const useInfiniteProducts = (
  params: Omit<ProductSearchParams, 'page'> = {}
) => {
  return useQuery({
    queryKey: QueryKeys.products.infinite(params),
    queryFn: async () => {
      const response = await ProductAPI.searchProducts({ ...params, page: 0, size: 20 });
      return response;
    },
    staleTime: 3 * 60 * 1000,
  });
};
