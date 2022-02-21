import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Account } from './Account';
import { LoggedInAccount } from './LoggedInAccount';
import { RegisterAccountSuccess } from './RegisterAccountSuccess';

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

  registerAccount(account: Account): Observable<RegisterAccountSuccess> {
    const path: string = `${this.accountUrl}/register`;

    localStorage.clear();

    return this.http.post<RegisterAccountSuccess>(path, account, jsonHttpOptions).pipe(
      map(response => {
          localStorage.setItem('register_success', response.message);
          localStorage.setItem('email', account.email);
          this.logger.info(response.message);
          return response;
        }
      ),
      tap(_ => this.logger.info(`registered account w/ email=${account.email}`)),
      catchError(response => {
          localStorage.setItem('register_error', response.error.message.error);
          this.logger.error(`registering failed: ${response.error.message.error}`);
          return of({} as RegisterAccountSuccess);
        }
      )
    );
  }

  loginToAccount(account: Account): Observable<LoggedInAccount> {
    const path: string = `${this.accountUrl}/login`;

    localStorage.removeItem('login_error');

    return this.http.post<LoggedInAccount>(path, account, jsonHttpOptions).pipe(
      map(account => {
          localStorage.setItem('email', account.email);
          localStorage.setItem('access_token', account.token);
          return account;
        }
      ),
      tap(_ => this.logger.info(`logged into account w/ email=${account.email}`)),
      catchError(response => {
          localStorage.setItem('login_error', response.error.message.error);
          this.logger.error(`logging in failed: ${response.error.message.error}`);
          return of({} as LoggedInAccount);
        }
      )
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') != undefined;
  }

  logout() {
    this.logger.info('logged out');
    localStorage.removeItem('access_token');
  }
}
