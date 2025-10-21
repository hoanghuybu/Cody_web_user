import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'cody_wishlist_items';

// Load wishlist from localStorage
const loadWishlistFromStorage = (): Product[] => {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      return Array.isArray(items) ? items : [];
    }
  } catch (error) {
    // Error loading wishlist from localStorage
  }
  return [];
};

// Save wishlist to localStorage
const saveWishlistToStorage = (items: Product[]) => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // Error saving wishlist to localStorage
  }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Load wishlist on mount
  useEffect(() => {
    const items = loadWishlistFromStorage();
    setWishlistItems(items);
  }, []);

  const addToWishlist = (product: Product) => {
    // Allow adding to wishlist without authentication
    // Wishlist is stored in localStorage and persists across sessions
    setWishlistItems((prev) => {
      // Check if already in wishlist
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      const newItems = [...prev, product];
      saveWishlistToStorage(newItems);
      return newItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => {
      const newItems = prev.filter(item => item.id !== productId);
      saveWishlistToStorage(newItems);
      return newItems;
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    saveWishlistToStorage([]);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        clearWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
