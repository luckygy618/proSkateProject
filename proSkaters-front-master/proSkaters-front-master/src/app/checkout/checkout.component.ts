import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Address } from '../Address';
import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';
import { CartItem } from '../CartItem';
import { ShoppingCartService } from '../shopping-cart.service';
import { Purchase } from '../Purchase';
import { PurchaseItem } from '../PurchaseItem';
import { ReceiptService } from '../receipt.service';

import { LoggerService } from '../logger.service';

import {
  faAddressBook,
  faCalculator,
  faCashRegister,
  faCheckCircle,
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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  account: CustomerAccount;
  purchase: Purchase;
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
  check: IconDefinition = faCheckCircle;
  loginSuccess: string;
  loginError: string;
  shoppingCartSuccess: string;
  shoppingCartError: string;
  purchaseSuccess: string = localStorage.getItem('purchase_success');
  purchaseError: string = localStorage.getItem('purchase_error');
  updatePaymentSuccess: string = localStorage.getItem('update_payment_success');
  updatePaymentError: string = localStorage.getItem('update_payment_error');
  paymentType: string;
  last4: string;
  month: string;
  year: string;
  cvc: string;

  constructor(
    private router: Router,
    private customerAccountService: CustomerAccountService,
    private shoppingCartService: ShoppingCartService,
    private receiptService: ReceiptService,
    private logger: LoggerService
  ) {
    this.shoppingCartSuccess = this.shoppingCartService.successMessage;
    this.shoppingCartError = this.shoppingCartService.errorMessage;
    this.loginSuccess = this.customerAccountService.loginSuccess;
    this.loginError = this.customerAccountService.loginError;
  }

  get items(): CartItem[] {
    const items: CartItem[] = this.shoppingCartService.items;
    return items;
  }

  get totalQuantity(): number {
    return this.absRound(this.shoppingCartService.totalQuantity);
  }

  get subtotal(): number {
    return this.absRound(this.shoppingCartService.subtotal);
  }

  get shippingHandling(): number {
    return 10;
  }

  get totalBeforeTax(): number {
    return this.absRound(this.subtotal + this.shippingHandling);
  }

  get gstHst(): number {
    return this.absRound(this.totalBeforeTax * 0.13);
  }

  get pstRstQst(): number {
    return this.absRound(this.totalBeforeTax * 0);
  }

  get orderTotal(): number {
    return this.absRound(this.subtotal + this.shippingHandling + this.gstHst + this.pstRstQst);
  }

  get cartEmpty(): boolean {
    return this.shoppingCartService.cartEmpty;
  }

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
    let isSame: boolean = false;
    if (this.isShippingSet && this.isBillingSet) {
      const address1: boolean = this.shippingAddress1 === this.billingAddress1;
      const address2: boolean = this.shippingAddress2 === this.billingAddress2;
      const city: boolean = this.shippingCity === this.billingCity;
      const province: boolean = this.shippingProvince === this.billingProvince;
      const country: boolean = this.shippingCountry === this.billingCountry;
      const postalCode: boolean = this.shippingPostalCode === this.billingPostalCode;
      isSame = address1 && address2 && city && province && country && postalCode;
    }
    return isSame;
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

  absRound(number: number): number {
    return Math.round((Math.abs(number) + Number.EPSILON) * 100) / 100;
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  createPurchase(): void {
    const items: PurchaseItem[] = new Array();
    for (let i = 0; i < this.items.length; i++) {
      const item: PurchaseItem = {
        product_id: this.items[i].product.product_id,
        quantity: this.items[i].quantity,
        lineTotal: this.absRound(this.items[i].lineTotal),
      };
      items.push(item);
    }

    this.logger.log(items);

    this.purchase = {
      items: items,
      totalQuantity: this.totalQuantity,
      subtotal: this.orderTotal,
    };

    this.logger.log(this.purchase);
  }

  createReceipt(): void {
    this.receiptService.createReceipt(
      this.items,
      this.totalQuantity,
      this.subtotal,
      this.shippingHandling
    );
  }

  placeOrder(): void {
    if (
      this.accountDefined &&
      this.isShippingSet &&
      this.isPaymentMethodSet &&
      this.isBillingSet &&
      !this.cartEmpty
    ) {
      this.createPurchase();

      this.customerAccountService.makePurchase(this.purchase).subscribe((response) => {
        this.logger.log(response);
        this.purchaseError = localStorage.getItem('purchase_error');

        if (this.purchaseError != undefined) {
          window.location.reload();
        } else {
          this.createReceipt();
          this.shoppingCartService.emptyCart();
          this.shoppingCartService.clearMessages();
          this.router.navigateByUrl('/order/confirmation');
        }
      });
    }
  }

  onClickPlaceOrder(): void {
    this.placeOrder();
  }

  ngOnInit(): void {
    this.getCustomerAccount();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('purchase_error');
    localStorage.removeItem('purchase_success');
    localStorage.removeItem('update_payment_error');
    localStorage.removeItem('update_payment_success');
    this.customerAccountService.clearMessages();
    this.shoppingCartService.clearMessages();
  }
}
