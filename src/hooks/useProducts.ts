/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  keepPreviousData,
  useMutation,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useToast } from '../context/ToastContext';
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
  items: Item[];
  buyerName: string;
  buyerPhone: string;
  addressUrl: string;
  customComboName: string;
  note: string;
  isCombo: boolean;
  paymentMethod: string;
  sellerId: string;
}

export interface Item {
  productId: string;
  quantity: number;
}
export const useCreateCombo = () => {
  const { showToast } = useToast();
  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: (body: CreateComboRequest) =>
      rootApi.post(endpoints.create_combo, body),
    onSuccess: (data: any) => {
      showToast({
        type: 'success',
        title: 'Thành công',
        message: data.message ? data.message : 'Tạo combo thành công!',
      });
    },
    onError: (error: any) => {
      showToast({
        type: 'error',
        title: 'Lỗi',
        message: error.message ? error.message : 'Tạo combo thất bại!',
      });
    },
  });

  return {
    data,
    isLoading: isPending,
    onCreateCombo: mutateAsync,
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
