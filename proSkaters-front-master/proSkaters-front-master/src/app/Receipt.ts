import { CartItem } from './CartItem';

export interface Receipt {
  date: Date | null;
  day: number;
  month: number;
  year: number;
  time: string;
  formattedDate: string;
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  shippingHandling: number;
  totalBeforeTax: number;
  gstHst: number;
  pstRstQst: number;
  orderTotal: number;
}
