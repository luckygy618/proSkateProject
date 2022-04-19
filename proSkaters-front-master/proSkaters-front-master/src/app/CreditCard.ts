export interface CreditCard {
  number: string;
  last4?: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}
