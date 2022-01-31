import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Account } from './Account';

const jsonHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  }),
  reportProgress: true
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly rootUrl: string = "https://proskaters-backend.herokuapp.com";
  readonly accountUrl: string = `${this.rootUrl}/account`;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  registerAccount(account: Account): Observable<Account> {
    const path: string = `${this.accountUrl}/register`;

    return this.http.post<Account>(path, account, jsonHttpOptions).pipe(
      tap(_ => this.logger.info(`registered account w/ email=${account.email}`)),
      catchError((error) => {
          this.logger.error(`registering failed: ${error.message}`);
          return of({} as Account);
        }
      )
    );
  }

  loginToAccount(account: Account): Observable<Account> {
    const path: string = `${this.accountUrl}/login`;

    return this.http.post<Account>(path, account, jsonHttpOptions).pipe(
      tap(_ => this.logger.info(`logged into account w/ email=${account.email}`)),
      catchError((error) => {
          this.logger.error(`logging in failed: ${error.message}`);
          return of({} as Account);
        }
      )
    );
  }

  validateAccount(account: Account): Observable<Account> {
    const path: string = `${this.accountUrl}/validate`;

    return this.http.post<Account>(path, account, jsonHttpOptions).pipe(
      tap(_ => this.logger.info(`validate account w/ email=${account.email}`)),
      catchError((error) => {
          this.logger.error(`logging in failed: ${error.message}`);
          return of({} as Account);
        }
      )
    );
  }
}
