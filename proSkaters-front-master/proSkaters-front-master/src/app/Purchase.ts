import { PurchaseItem } from './PurchaseItem';

export interface Purchase {
  items: PurchaseItem[];
  totalQuantity: number;
  subtotal: number;
}
