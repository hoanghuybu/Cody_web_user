/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  keepPreviousData,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { endpoints } from '../lib/endpoints';
import { QueryKeys } from '../lib/queryKeys';
import { rootApi } from '../lib/rootApi';
import { ProductAPI, ProductSearchParams } from '../services/productAPI';
import { ProductSearchResponse } from '../types/product';

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
    ...options,
  });
};

export const useProduct = (id: string, options?: UseQueryOptions<any>) => {
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
    ...options,
  });
};

interface CreateComboRequest {
  name: string;
  productIds: string[];
  tags?: string[];
  message?: string;
}
export const useCreateCombo = () => {
  const { data, isPending } = useMutation({
    mutationFn: (body: CreateComboRequest) =>
      rootApi.post(endpoints.create_combo, body),
    onSuccess: (data) => {
      // Xử lý sau khi tạo combo thành công, ví dụ: hiển thị thông báo, cập nhật cache, v.v.
    },
    onError: (error) => {
      // Xử lý lỗi nếu có
    },
  });

  return {
    data,
    isLoading: isPending,
  };
};

export const useInfiniteProducts = (
  params: Omit<ProductSearchParams, 'page'> = {}
) => {
  return useQuery({
    queryKey: QueryKeys.products.infinite(params),
    queryFn: async () => {
      const response = await ProductAPI.searchProducts({
        ...params,
        page: 0,
        size: 20,
      });
      return response;
    },
    staleTime: 3 * 60 * 1000,
  });
};
