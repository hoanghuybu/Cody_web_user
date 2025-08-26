import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';

// Hook to check network connectivity and API health
export const useApiHealth = () => {
  return useQuery({
    queryKey: QueryKeys.api.health,
    queryFn: async () => {
      const response = await fetch('https://www.cody-be.online/api/health', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error('API Health Check Failed');
      }
      
      return { status: 'healthy', timestamp: Date.now() };
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: 5 * 60 * 1000, // Check every 5 minutes
    refetchIntervalInBackground: false,
  });
};

// Hook for online/offline status
export const useNetworkStatus = () => {
  return useQuery({
    queryKey: ['network', 'status'],
    queryFn: () => ({ isOnline: navigator.onLine }),
    staleTime: Infinity, // Never goes stale
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled: typeof window !== 'undefined',
  });
};
