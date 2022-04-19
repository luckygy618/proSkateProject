import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import { Order } from '../Order';
import { OrderItem } from '../OrderItem';
import { OrderService } from '../order.service';

import { Product } from '../Product';
import { ProductService } from '../product.service';

import { LoggerService } from '../logger.service';

import {
  faBox,
  faCalendarCheck,
  faDollarSign,
  faHistory,
  faReceipt,
  faSearchDollar,
  faShippingFast,
  faWindowClose,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit {
  account: CustomerAccount;
  orderList: Order[];
  orderYears: number[];
  selectedYear: number;
  productList: Product[];
  history: IconDefinition = faHistory;
  receipt: IconDefinition = faReceipt;
  search: IconDefinition = faSearchDollar;
  dollarSign: IconDefinition = faDollarSign;
  shipping: IconDefinition = faShippingFast;
  box: IconDefinition = faBox;
  cancelled: IconDefinition = faWindowClose;
  calendar: IconDefinition = faCalendarCheck;
  loginSuccess: string = localStorage.getItem('login_success');
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
    private productService: ProductService,
    private logger: LoggerService
  ) {}

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;
    });
  }

  getProductList(): Observable<Product[]> {
    return this.productService.getProducts().pipe(
      map((productList) => {
        this.productList = productList;
        return this.productList;
      })
    );
  }

  getOrderList(): Observable<Order[]> {
    return this.orderService.getOrders().pipe(
      map((orderList) => {
        this.logger.log(orderList);
        if (orderList.length > 0) {
          this.orderList = orderList;

          for (let i = 0; i < orderList.length; i++) {
            const order: Order = orderList[i];
            const orderYear: number = this.orderService.getCreationYear(order);
            if (this.orderYears == undefined) {
              this.orderYears = new Array();
              this.orderYears.push(orderYear);
            } else if (!this.orderYears.includes(orderYear)) {
              this.orderYears.push(orderYear);
            }
          }
          this.orderYears.sort((a, b) => b - a);
          this.selectedYear = this.orderYears[0];

          return this.orderList;
        }
      })
    );
  }

  ordersByYear(year: number): Order[] {
    const checkYear = (order: Order): boolean => {
      return year == this.orderService.getCreationYear(order);
    };
    return this.orderList.filter(checkYear);
  }

  shippedOrders(): Order[] {
    const checkStatus = (order: Order): boolean => {
      return order.status == 'shipped';
    };
    return this.ordersByYear(this.selectedYear).filter(checkStatus);
  }

  unshippedOrders(): Order[] {
    const checkStatus = (order: Order): boolean => {
      return order.status == 'ordered';
    };
    return this.ordersByYear(this.selectedYear).filter(checkStatus);
  }

  refundingOrders(): Order[] {
    const checkStatus = (order: Order): boolean => {
      return order.status == 'refunding';
    };
    return this.ordersByYear(this.selectedYear).filter(checkStatus);
  }

  cancelledOrders(): Order[] {
    const checkStatus = (order: Order): boolean => {
      return order.status == 'canceled';
    };
    return this.ordersByYear(this.selectedYear).filter(checkStatus);
  }

  searchProducts(input: string): Observable<Product[]> {
    return this.productService.searchProducts(input).pipe(
      map((productList) => {
        return productList;
      })
    );
  }

  searchOrders(input: string): Observable<Order[]> {
    return this.searchProducts(input).pipe(
      map((products) => {
        const orderMatches = (order: Order): boolean => {
          let matches: boolean = false;
          for (let i = 0; i < order.items.length && !matches; i++) {
            const orderItem: OrderItem = order.items[i];
            for (let j = 0; j < products.length; j++) {
              const product = products[j];
              if (orderItem.product_id == product.product_id) {
                matches = true;
              }
            }
          }
          return matches;
        };
        return this.orderList.filter(orderMatches);
      })
    );
  }

  onSubmitSearchOrders(input: string): void {
    this.getOrderList().subscribe((orderList) => {
      this.searchOrders(input).subscribe((orderList) => {
        this.orderList = orderList;
      });
    });
  }

  onChangeYear(year: number): void {
    this.selectedYear = year;
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  get isLoggedIn(): boolean {
    let loggedIn = false;
    if (this.isDefined(this.account)) {
      loggedIn = this.customerAccountService.isLoggedIn();
    }
    return loggedIn;
  }

  ngOnInit(): void {
    this.getCustomerAccount();
    this.getProductList().subscribe();
    this.getOrderList().subscribe();
  }
}
