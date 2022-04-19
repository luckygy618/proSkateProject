import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CustomerAccountService } from './customer-account.service';
import { Order } from './Order';

import { LoggerService } from './logger.service';

let jsonHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
  reportProgress: true,
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly accountOrderUrl: string;
  readonly months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private http: HttpClient,
    private customerAccountService: CustomerAccountService,
    private logger: LoggerService
  ) {
    this.accountOrderUrl = `${this.customerAccountService.accountUrl}/orders`;
  }

  getOrders(): Observable<Order[]> {
    const path: string = this.accountOrderUrl;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get<Order[]>(path, jsonHttpOptions).pipe(
      tap((_) => this.logger.info('fetched orders')),
      catchError((error) => {
        this.logger.error(`fetching failed: ${error.message}`);
        return of([] as Order[]);
      })
    );
  }

  getOrderByOrderId(id: number): Observable<Order> {
    const path: string = `${this.accountOrderUrl}/${id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get<Order>(path, jsonHttpOptions).pipe(
      map((order) => {
        return order;
      }),
      tap((_) => this.logger.info(`fetched order id=${id}`)),
      catchError((error) => {
        this.logger.error(`fetching failed: ${error.message}`);
        return of({} as Order);
      })
    );
  }

  refundOrder(order: Order): Observable<string> {
    const path: string = `${this.accountOrderUrl}/refunding/${order.id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('refund_order_error');

    return this.http.put(path, null, jsonHttpOptions).pipe(
      tap((_) => {
        localStorage.setItem('refund_order_success', 'success');
        this.logger.info('refunded order');
      }),
      catchError((response) => {
        localStorage.setItem('refund_order_error', response.message);
        this.logger.log(response);
        this.logger.error(`update order failed message: ${response.message}`);
        this.logger.error(`update order failed error: ${response.error}`);
        return of(response.message);
      })
    );
  }

  cancelOrder(order: Order): Observable<string> {
    const path: string = `${this.accountOrderUrl}/canceled/${order.id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('cancel_order_error');

    return this.http.put(path, null, jsonHttpOptions).pipe(
      tap((_) => {
        localStorage.setItem('cancel_order_success', 'success');
        this.logger.info('canceled order');
      }),
      catchError((response) => {
        localStorage.setItem('cancel_order_error', response.message);
        this.logger.log(response);
        this.logger.error(`update order failed message: ${response.message}`);
        this.logger.error(`update order failed error: ${response.error}`);
        return of(response.message);
      })
    );
  }

  shippedOrder(order: Order): Observable<string> {
    const path: string = `${this.accountOrderUrl}/shipped/${order.id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('shipped_order_error');

    return this.http.put(path, null, jsonHttpOptions).pipe(
      tap((_) => {
        localStorage.setItem('shipped_order_success', 'success');
        this.logger.info('updated order');
      }),
      catchError((response) => {
        localStorage.setItem('shipped_order_error', response.message);
        this.logger.log(response);
        this.logger.error(`update order failed message: ${response.message}`);
        this.logger.error(`update order failed error: ${response.error}`);
        return of(response.message);
      })
    );
  }

  deliveredOrder(order: Order): Observable<string> {
    const path: string = `${this.accountOrderUrl}/delivered/${order.id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('delivered_order_error');

    return this.http.put<number>(path, null, jsonHttpOptions).pipe(
      tap((_) => {
        localStorage.setItem('delivered_order_success', 'success');
        this.logger.info('updated order');
      }),
      catchError((response) => {
        localStorage.setItem('delivered_order_error', response.message);
        this.logger.log(response);
        this.logger.error(`update order failed message: ${response.message}`);
        this.logger.error(`update order failed error: ${response.error}`);
        return of(response.message);
      })
    );
  }

  getCreationDateObject(order: Order): Date {
    const timestamp: number = Date.parse(order.creation_time);
    return new Date(timestamp);
  }

  getCreationYear(order: Order): number {
    const timestamp: number = Date.parse(order.creation_time);
    const date: Date = new Date(timestamp);
    return date.getFullYear();
  }

  getCreationMonth(order: Order): string {
    const timestamp: number = Date.parse(order.creation_time);
    const date: Date = new Date(timestamp);
    const month: string = this.months[date.getMonth()];
    return month;
  }

  getCreationDay(order: Order): number {
    const timestamp: number = Date.parse(order.creation_time);
    const date: Date = new Date(timestamp);
    return date.getDate();
  }

  getCreationTime(order: Order): number {
    const timestamp: number = Date.parse(order.creation_time);
    const date: Date = new Date(timestamp);
    return date.getTime();
  }

  getLastModifiedDateObject(order: Order): Date {
    const timestamp: number = Date.parse(order.last_modified_time);
    return new Date(timestamp);
  }

  getLastModifiedMonth(order: Order): number {
    const timestamp: number = Date.parse(order.last_modified_time);
    const date: Date = new Date(timestamp);
    return date.getMonth();
  }

  getLastModifiedDay(order: Order): number {
    const timestamp: number = Date.parse(order.last_modified_time);
    const date: Date = new Date(timestamp);
    return date.getDay();
  }

  getLastModifiedTime(order: Order): number {
    const timestamp: number = Date.parse(order.last_modified_time);
    const date: Date = new Date(timestamp);
    return date.getTime();
  }
}
