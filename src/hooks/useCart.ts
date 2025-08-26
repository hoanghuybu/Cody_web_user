import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../types/product';
import { QueryKeys } from '../lib/queryKeys';

export interface AddToCartParams {
  product: Product;
  quantity: number;
}

export interface UpdateCartParams {
  productId: string;
  quantity: number;
}

// Simulated cart operations - replace with real API calls when backend is ready
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ product, quantity }: AddToCartParams) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app, this would be an API call
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    },
    onSuccess: () => {
      // Invalidate cart queries to refetch data
      queryClient.invalidateQueries({ queryKey: QueryKeys.cart.all });
    },
    onError: (error) => {
      console.error('Add to cart failed:', error);
    }
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, quantity }: UpdateCartParams) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const itemIndex = cart.findIndex((item: any) => item.id === productId);
      
      if (itemIndex !== -1) {
        if (quantity === 0) {
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = quantity;
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.cart.all });
    },
    onError: (error) => {
      console.error('Update cart failed:', error);
    }
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (productId: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = cart.filter((item: any) => item.id !== productId);
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.cart.all });
    },
    onError: (error) => {
      console.error('Remove from cart failed:', error);
    }
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      localStorage.removeItem('cart');
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.cart.all });
    },
    onError: (error) => {
      console.error('Clear cart failed:', error);
    }
  });
};
