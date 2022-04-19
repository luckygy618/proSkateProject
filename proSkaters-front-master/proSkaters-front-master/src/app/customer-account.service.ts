import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AccountService } from './account.service';
import { CustomerAccount } from './CustomerAccount';
import { PaymentMethod } from './PaymentMethod';
import { Purchase } from './Purchase';

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
export class CustomerAccountService extends AccountService {
  readonly accountInfoUrl: string = `${this.accountUrl}/info`;
  readonly accountPaymentUrl: string = `${this.accountUrl}/payment`;
  readonly accountPurchaseUrl: string = `${this.accountUrl}/purchase`;

  constructor(http: HttpClient, logger: LoggerService) {
    super(http, logger);
  }

  getCustomerAccount(): Observable<CustomerAccount> {
    const path: string = this.accountInfoUrl;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get<CustomerAccount>(path, jsonHttpOptions).pipe(
      map((account) => {
        this.logger.info(`fetched customer account with email ${account.email}`);
        return account;
      }),
      catchError((response) => {
        this.logger.error(`fetching failed: ${response.message}`);
        this.logger.error(`fetching failed: ${response.error}`);
        return of({} as CustomerAccount);
      })
    );
  }

  saveCustomerAccount(account: CustomerAccount): Observable<CustomerAccount> {
    const path: string = this.accountInfoUrl;
    const email: string = localStorage.getItem('email');
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('save_account_error');

    return this.http.put<CustomerAccount>(path, account, jsonHttpOptions).pipe(
      tap((_) => {
        if (email != undefined && email != null) {
          this.logger.info(`saved account with email ${email}`);
        } else {
          this.logger.info('saved account');
        }
      }),
      catchError((response) => {
        localStorage.setItem('save_account_error', response.message);
        this.logger.log(response);
        this.logger.error(`saving failed message: ${response.message}`);
        this.logger.error(`saving failed error: ${response.error}`);
        return of({} as CustomerAccount);
      })
    );
  }

  updatePaymentInfo(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    const path: string = this.accountPaymentUrl;
    const email: string = localStorage.getItem('email');
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('update_payment_error');

    return this.http.put<PaymentMethod>(path, paymentMethod, jsonHttpOptions).pipe(
      tap((_) => {
        if (email != undefined && email != null) {
          this.logger.info(`saved account with email ${email}`);
        } else {
          this.logger.info('saved account');
        }
      }),
      catchError((response) => {
        localStorage.setItem('update_payment_error', response.message);
        this.logger.log(response);
        this.logger.error(`updating payment info failed message: ${response.message}`);
        this.logger.error(`updating payment info failed error: ${response.error}`);
        return of({} as PaymentMethod);
      })
    );
  }

  makePurchase(purchase: Purchase): Observable<Purchase> {
    const path: string = this.accountPurchaseUrl;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('purchase_error');

    return this.http.put<Purchase>(path, purchase, jsonHttpOptions).pipe(
      tap((_) => {
        this.logger.info('made purchase');
      }),
      catchError((response) => {
        localStorage.setItem('purchase_error', response.message);
        this.logger.log(response);
        this.logger.error(`purchase failed message: ${response.message}`);
        this.logger.error(`purchase failed error: ${response.error}`);
        return of({} as Purchase);
      })
    );
  }
}
