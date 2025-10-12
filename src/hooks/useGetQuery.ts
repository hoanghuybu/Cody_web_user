/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { rootApi } from '../lib/rootApi';

// Cho API thường
export const useGetQuery = <T>(
  endpoint: string,
  params?: Record<string, any> | null
) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      return (await rootApi.get(endpoint, params ?? {})) as T;
    },
  });

  return {
    data: data as T,
    isLoading,
    refetch,
    error,
  };
};
