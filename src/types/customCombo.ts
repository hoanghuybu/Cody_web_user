import { Product } from './product';

export interface CustomCombo {
  id: string;
  candies: Product[];
  basket: Product | null;
  stickers: Product[];
  totalPrice: number;
}

export interface CustomProduct extends Product {
  items: {
    candies: Product[];
    basket: Product;
    stickers: Product[];
  };
}