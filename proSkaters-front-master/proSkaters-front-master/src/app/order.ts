import { OrderItem } from './OrderItem';

export interface Order {
  id: number;
  transaction_token: string;
  email: string;
  total_quantity: number;
  subtotal: number;
  status: 'ordered' | 'refunding' | 'canceled' | 'shipped' | 'delivered';
  creation_time: string;
  last_modified_time: string;
  items: OrderItem[];
}
