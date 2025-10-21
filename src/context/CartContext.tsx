import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types/product';

interface CartState {
  items: CartItem[];
  total: number;
  isCartOpen: boolean;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cody_cart_items';

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const items = JSON.parse(savedCart);
      return Array.isArray(items) ? items : [];
    }
  } catch (error) {
    // Error loading cart from localStorage
  }
  return [];
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    // Error saving cart to localStorage
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
  case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        newState = {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          isCartOpen: true,
        };
      } else {
        const newItems = [...state.items, { ...product, quantity }];
        newState = {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          isCartOpen: true,
        };
      }
      saveCartToStorage(newState.items);
      return newState;
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      newState = {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        isCartOpen: state.isCartOpen,
      };
      saveCartToStorage(newState.items);
      return newState;
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      newState = {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        isCartOpen: state.isCartOpen,
      };
      saveCartToStorage(newState.items);
      return newState;
    }
    
    case 'CLEAR_CART':
      newState = { items: [], total: 0, isCartOpen: state.isCartOpen };
      saveCartToStorage(newState.items);
      return newState;

    case 'OPEN_CART':
      return { ...state, isCartOpen: true };

    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage
  const initialItems = loadCartFromStorage();
  const initialTotal = initialItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const [state, dispatch] = useReducer(cartReducer, { 
    items: initialItems, 
    total: initialTotal, 
    isCartOpen: false 
  });

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};