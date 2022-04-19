import { Address } from './Address';
import { PaymentMethod } from './PaymentMethod';

export interface CustomerAccount {
  email?: string;
  salutation: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  shippingAddress: Address;
  billingAddress: Address;
  paymentToken?: string | null;
  paymentInfo?: PaymentMethod;
}
