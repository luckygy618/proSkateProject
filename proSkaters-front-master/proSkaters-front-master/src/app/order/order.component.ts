import { Component, Input, OnInit } from '@angular/core';

import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import { Order } from '../Order';
import { OrderItem } from '../OrderItem';
import { OrderService } from '../order.service';

import { Address } from '../Address';

import { LoggerService } from '../logger.service';

import {
  faBox,
  faCalculator,
  faCalendarCheck,
  faDollarSign,
  faMapMarkerAlt,
  faShippingFast,
  faWindowClose,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() account: CustomerAccount;
  @Input() order: Order;
  calendar: IconDefinition = faCalendarCheck;
  calculator: IconDefinition = faCalculator;
  shipping: IconDefinition = faShippingFast;
  mapMarker: IconDefinition = faMapMarkerAlt;
  box: IconDefinition = faBox;
  dollarSign: IconDefinition = faDollarSign;
  cancel: IconDefinition = faWindowClose;
  refundSuccess: string = localStorage.getItem('refund_order_success');
  refundError: string = localStorage.getItem('refund_order_error');
  cancelSuccess: string = localStorage.getItem('cancel_order_success');
  cancelError: string = localStorage.getItem('cancel_order_error');
  shippedSuccess: string = localStorage.getItem('shipped_order_success');
  shippedError: string = localStorage.getItem('shipped_order_error');
  deliveredSuccess: string = localStorage.getItem('delivered_order_success');
  deliveredError: string = localStorage.getItem('delivered_order_error');

  constructor(
    private customerAccountService: CustomerAccountService,
    private orderService: OrderService,
    private logger: LoggerService
  ) {}

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

  get totalQuantity(): number {
    if (this.isDefined(this.order)) {
      return this.absRound(this.order.total_quantity);
    }
    return undefined;
  }

  get orderTotal(): number {
    if (this.isDefined(this.order)) {
      return this.absRound(this.order.subtotal);
    }
    return undefined;
  }

  get orderYear(): number {
    if (this.isDefined(this.order)) {
      return this.orderService.getCreationYear(this.order);
    }
    return undefined;
  }

  get orderMonth(): string {
    if (this.isDefined(this.order)) {
      return this.orderService.getCreationMonth(this.order);
    }
    return undefined;
  }

  get orderDay(): number {
    if (this.isDefined(this.order)) {
      return this.orderService.getCreationDay(this.order);
    }
    return undefined;
  }

  get items(): OrderItem[] {
    if (this.isDefined(this.order)) {
      const items: OrderItem[] = this.order.items;
      return items;
    }
    return [] as OrderItem[];
  }

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;
    });
  }

  getOrder(orderId: number): void {
    this.orderService.getOrderByOrderId(orderId).subscribe((order) => {
      this.order = order;
    });
  }

  refundOrder(): void {
    this.orderService.refundOrder(this.order).subscribe((message) => {
      this.refundError = localStorage.getItem('refund_order_error');
      if (this.refundError != undefined) {
        this.logger.error(this.refundError);
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });
  }

  cancelOrder(): void {
    this.orderService.cancelOrder(this.order).subscribe((message) => {
      this.cancelError = localStorage.getItem('cancel_order_error');
      if (this.cancelError != undefined) {
        this.logger.error(this.cancelError);
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });
  }

  shippedOrder(): void {
    this.orderService.shippedOrder(this.order).subscribe((message) => {
      if (this.shippedError != undefined) {
        this.logger.error(this.shippedError);
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });
  }

  deliveredOrder(): void {
    this.orderService.deliveredOrder(this.order).subscribe((message) => {
      if (this.deliveredError != undefined) {
        this.logger.error(this.deliveredError);
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });
  }

  onClickRequestRefund(): void {
    this.refundOrder();
  }

  onClickCancelOrder(): void {
    this.cancelOrder();
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

  isLoggedIn(): boolean {
    let loggedIn = false;
    if (this.isDefined(this.account)) {
      loggedIn = this.customerAccountService.isLoggedIn();
    }
    return loggedIn;
  }

  ngOnInit(): void {
    if (this.isDefined(this.account)) {
      this.getCustomerAccount();
    }
  }
}
