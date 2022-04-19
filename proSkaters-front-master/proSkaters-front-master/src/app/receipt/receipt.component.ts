import { Component, OnInit } from '@angular/core';

import { Address } from '../Address';
import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';
import { CartItem } from '../CartItem';
import { ReceiptService } from '../receipt.service';

import { LoggerService } from '../logger.service';

import {
  faAddressBook,
  faBox,
  faCalculator,
  faCalendarCheck,
  faCashRegister,
  faCreditCard,
  faDollarSign,
  faFileInvoice,
  faMapMarkerAlt,
  faReceipt,
  faShippingFast,
  faShoppingCart,
  faSortNumericUp,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  account: CustomerAccount;
  calendar: IconDefinition = faCalendarCheck;
  box: IconDefinition = faBox;
  cashRegister: IconDefinition = faCashRegister;
  shipping: IconDefinition = faShippingFast;
  mapMarker: IconDefinition = faMapMarkerAlt;
  addressBook: IconDefinition = faAddressBook;
  creditCard: IconDefinition = faCreditCard;
  shoppingCartIcon: IconDefinition = faShoppingCart;
  dollarSign: IconDefinition = faDollarSign;
  numericUp: IconDefinition = faSortNumericUp;
  trash: IconDefinition = faTrash;
  calculator: IconDefinition = faCalculator;
  invoice: IconDefinition = faFileInvoice;
  receiptIcon: IconDefinition = faReceipt;
  paymentType: string;
  last4: string;
  month: string;
  year: string;
  cvc: string;

  constructor(
    private customerAccountService: CustomerAccountService,
    private receiptService: ReceiptService,
    private logger: LoggerService
  ) {}

  get isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  get accountDefined(): boolean {
    return this.isDefined(this.account);
  }

  get shippingAddress(): Address {
    if (this.accountDefined) {
      return this.account.shippingAddress;
    }
    return {} as Address;
  }

  get shippingAddress1(): string {
    if (this.accountDefined) {
      return this.account.shippingAddress.address1;
    }
    return '';
  }

  get shippingAddress2(): string {
    if (this.accountDefined) {
      return this.account.shippingAddress.address2;
    }
    return '';
  }

  get shippingCity(): string {
    if (this.accountDefined) {
      return this.account.shippingAddress.city;
    }
    return '';
  }

  get shippingProvince(): string {
    if (this.accountDefined) {
      return this.account.shippingAddress.province;
    }
    return '';
  }

  get shippingCountry(): string {
    if (this.accountDefined) {
      return this.account.shippingAddress.country;
    }
    return '';
  }

  get shippingPostalCode(): string {
    if (this.accountDefined) {
      return this.account.shippingAddress.postalCode;
    }
    return '';
  }

  get billingAddress(): Address {
    if (this.accountDefined) {
      return this.account.billingAddress;
    }
    return {} as Address;
  }

  get billingAddress1(): string {
    if (this.accountDefined) {
      return this.account.billingAddress.address1;
    }
    return '';
  }

  get billingAddress2(): string {
    if (this.accountDefined) {
      return this.account.billingAddress.address2;
    }
    return '';
  }

  get billingCity(): string {
    if (this.accountDefined) {
      return this.account.billingAddress.city;
    }
    return '';
  }

  get billingProvince(): string {
    if (this.accountDefined) {
      return this.account.billingAddress.province;
    }
    return '';
  }

  get billingCountry(): string {
    if (this.accountDefined) {
      return this.account.billingAddress.country;
    }
    return '';
  }

  get billingPostalCode(): string {
    if (this.accountDefined) {
      return this.account.billingAddress.postalCode;
    }
    return '';
  }

  get isShippingSet(): boolean {
    let isSet: boolean = false;
    if (this.isDefined(this.shippingAddress)) {
      const address1: boolean = this.isDefined(this.shippingAddress1);
      const city: boolean = this.isDefined(this.shippingCity);
      const province: boolean = this.isDefined(this.shippingProvince);
      const country: boolean = this.isDefined(this.shippingCountry);
      const postalCode: boolean = this.isDefined(this.shippingPostalCode);
      isSet = address1 && city && province && country && postalCode;
    }
    return isSet;
  }

  get isBillingSet(): boolean {
    let isSet: boolean = false;
    if (this.isDefined(this.billingAddress)) {
      const address1: boolean = this.isDefined(this.billingAddress1);
      const city: boolean = this.isDefined(this.billingCity);
      const province: boolean = this.isDefined(this.billingProvince);
      const country: boolean = this.isDefined(this.billingCountry);
      const postalCode: boolean = this.isDefined(this.billingPostalCode);
      isSet = address1 && city && province && country && postalCode;
    }
    return isSet;
  }

  get isShippingBilling(): boolean {
    let isSet: boolean = false;
    if (this.isShippingSet && this.isBillingSet) {
      const address1: boolean = this.shippingAddress1 === this.billingAddress1;
      const address2: boolean = this.shippingAddress2 === this.billingAddress2;
      const city: boolean = this.shippingCity === this.billingCity;
      const province: boolean = this.shippingProvince === this.billingProvince;
      const country: boolean = this.shippingCountry === this.billingCountry;
      const postalCode: boolean = this.shippingPostalCode === this.billingPostalCode;
      isSet = address1 && city && province && country && postalCode;
    }
    return isSet;
  }

  get isPaymentMethodSet(): boolean {
    let isSet: boolean = false;
    if (this.paymentType == 'card') {
      const last4: boolean = this.isDefined(this.last4);
      const month: boolean = this.isDefined(this.month);
      const year: boolean = this.isDefined(this.year);
      const cvc: boolean = this.isDefined(this.cvc);
      isSet = last4 && month && year && cvc;
    }
    return isSet;
  }

  get date(): string {
    return this.receiptService.date;
  }

  get items(): CartItem[] {
    const items: CartItem[] = this.receiptService.items;
    return items;
  }

  get totalQuantity(): number {
    return this.receiptService.totalQuantity;
  }

  get subtotal(): number {
    return this.receiptService.subtotal;
  }

  get shippingHandling(): number {
    return this.receiptService.shippingHandling;
  }

  get totalBeforeTax(): number {
    return this.receiptService.totalBeforeTax;
  }

  get gstHst(): number {
    return this.receiptService.gstHst;
  }

  get pstRstQst(): number {
    return this.receiptService.pstRstQst;
  }

  get orderTotal(): number {
    return this.receiptService.orderTotal;
  }

  get receiptSaved(): boolean {
    return this.receiptService.receiptSaved;
  }

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;

      if (this.isDefined(account.paymentInfo)) {
        this.paymentType = account.paymentInfo.type;

        if (this.isDefined(account.paymentInfo.card)) {
          if (this.isDefined(account.paymentInfo.card.last4)) {
            this.last4 = `${account.paymentInfo.card.last4}`;
          }

          this.month = `${account.paymentInfo.card.exp_month}`;
          this.year = `${account.paymentInfo.card.exp_year}`;
          this.cvc = `${account.paymentInfo.card.cvc}`;
        }
      }
    });
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.getCustomerAccount();
  }
}
