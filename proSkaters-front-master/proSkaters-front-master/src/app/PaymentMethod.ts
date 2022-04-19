import { CreditCard } from './CreditCard';

export interface PaymentMethod {
  type: string;
  card: CreditCard;
}
