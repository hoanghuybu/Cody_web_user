// Centralized query keys for better maintainability and type safety

export const QueryKeys = {
  // API Health
  api: {
    health: ['api', 'health'] as const,
  },
  
  // Products
  products: {
    all: ['products'] as const,
    search: (params?: any) => ['products', 'search', params] as const,
    detail: (id: string) => ['products', id] as const,
    infinite: (params?: any) => ['products', 'infinite', params] as const,
  },
  
  // Categories
  categories: {
    all: ['categories'] as const,
    detail: (id: string) => ['categories', id] as const,
  },
  
  // Cart
  cart: {
    all: ['cart'] as const,
    items: ['cart', 'items'] as const,
    count: ['cart', 'count'] as const,
  },
  
  // Auth
  auth: {
    user: ['auth', 'user'] as const,
    profile: ['auth', 'profile'] as const,
  },
  
  // Orders
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', id] as const,
    history: (userId: string) => ['orders', 'history', userId] as const,
  }
} as const;

// Helper function to invalidate related queries
export const getInvalidationPatterns = (key: string) => {
  switch (key) {
    case 'cart':
      return [QueryKeys.cart.all];
    case 'products':
      return [QueryKeys.products.all];
    case 'auth':
      return [QueryKeys.auth.user, QueryKeys.auth.profile];
    default:
      return [];
  }
};
