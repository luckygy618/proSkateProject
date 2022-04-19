import { CartItem } from './CartItem';

export interface ShoppingCart {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
}
