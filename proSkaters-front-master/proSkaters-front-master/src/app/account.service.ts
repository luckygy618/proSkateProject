import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../environments/environment';

import { LoggerService } from './logger.service';
import { Account } from './Account';
import { LoggedInAccount } from './LoggedInAccount';
import { RegisterAccountSuccess } from './RegisterAccountSuccess';
import { UpdatedPassword } from './UpdatedPassword';

const jsonHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
  reportProgress: true,
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly rootUrl: string = environment.apiURL;
  readonly accountUrl: string = `${this.rootUrl}/account`;
  readonly accountPasswordUrl: string = `${this.accountUrl}/password`;
  readonly successKeys: string[] = [
    'register_success',
    'login_success',
    'logout_success',
    'update_password_success',
  ];
  readonly errorKeys: string[] = [
    'register_error',
    'login_error',
    'logout_error',
    'update_password_error',
  ];
  readonly emailKey: string = 'email';
  readonly tokenKey: string = 'access_token';

  constructor(protected http: HttpClient, protected logger: LoggerService) {}

  get registerSuccess(): string {
    return localStorage.getItem(this.successKeys[0]);
  }

  set registerSuccess(message: string) {
    localStorage.setItem(this.successKeys[0], message);
  }

  get registerError(): string {
    return localStorage.getItem(this.errorKeys[0]);
  }

  set registerError(message: string) {
    localStorage.setItem(this.errorKeys[0], message);
  }

  get loginSuccess(): string {
    return localStorage.getItem(this.successKeys[1]);
  }

  set loginSuccess(message: string) {
    localStorage.setItem(this.successKeys[1], message);
  }

  get loginError(): string {
    return localStorage.getItem(this.errorKeys[1]);
  }

  set loginError(message: string) {
    localStorage.setItem(this.errorKeys[1], message);
  }

  get logoutSuccess(): string {
    return localStorage.getItem(this.successKeys[2]);
  }

  set logoutSuccess(message: string) {
    localStorage.setItem(this.successKeys[2], message);
  }

  get logoutError(): string {
    return localStorage.getItem(this.errorKeys[2]);
  }

  set logoutError(message: string) {
    localStorage.setItem(this.errorKeys[2], message);
  }

  get updatePasswordSuccess(): string {
    return localStorage.getItem(this.successKeys[3]);
  }

  set updatePasswordSuccess(message: string) {
    localStorage.setItem(this.successKeys[3], message);
  }

  get updatePasswordError(): string {
    return localStorage.getItem(this.errorKeys[3]);
  }

  set updatePasswordError(message: string) {
    localStorage.setItem(this.errorKeys[3], message);
  }

  get email(): string {
    return localStorage.getItem(this.emailKey);
  }

  set email(email: string) {
    localStorage.setItem(this.emailKey, email);
  }

  get token(): string {
    return localStorage.getItem(this.tokenKey);
  }

  set token(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  clearSuccessMessages() {
    for (let i = 0; i < this.successKeys.length; i++) {
      const key = this.successKeys[i];
      localStorage.removeItem(key);
    }
  }

  clearErrorMessages() {
    for (let i = 0; i < this.errorKeys.length; i++) {
      const key = this.errorKeys[i];
      localStorage.removeItem(key);
    }
  }

  clearMessages() {
    this.clearSuccessMessages();
    this.clearErrorMessages();
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  registerAccount(account: Account): Observable<RegisterAccountSuccess> {
    const path: string = `${this.accountUrl}/register`;

    localStorage.clear();

    return this.http.post<RegisterAccountSuccess>(path, account, jsonHttpOptions).pipe(
      map((response) => {
        this.registerSuccess = response.message;
        this.email = account.email;
        this.logger.info(response.message);
        return response;
      }),
      tap((_) => this.logger.info(`registered account w/ email=${account.email}`)),
      catchError((response) => {
        this.registerError = response.error;
        this.logger.error(`registering failed: ${response.message}`);
        this.logger.error(`registering failed: ${response.error}`);
        return of({} as RegisterAccountSuccess);
      })
    );
  }

  loginToAccount(account: Account): Observable<LoggedInAccount> {
    const path: string = `${this.accountUrl}/login`;

    localStorage.removeItem('register_success');
    localStorage.removeItem('login_error');

    return this.http.post<LoggedInAccount>(path, account, jsonHttpOptions).pipe(
      map((account) => {
        this.loginSuccess = 'success';
        this.email = account.email;
        this.token = account.token;
        return account;
      }),
      tap((_) => this.logger.info(`logged into account w/ email=${account.email}`)),
      catchError((response) => {
        this.loginError = response.error;
        this.logger.error(`logging in failed: ${response.message}`);
        this.logger.error(`logging in failed: ${response.error}`);
        return of({} as LoggedInAccount);
      })
    );
  }

  updatePassword(password: UpdatedPassword): Observable<UpdatedPassword> {
    const path: string = this.accountPasswordUrl;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('update_password_error');

    return this.http.put<UpdatedPassword>(path, password, jsonHttpOptions).pipe(
      tap((_) => {
        if (this.email != undefined && this.email != null) {
          this.logger.info(`updated password for account with email ${this.email}`);
        } else {
          this.logger.info('updated password');
        }
      }),
      catchError((response) => {
        this.updatePasswordError = response.error;
        this.logger.log(response);
        this.logger.error(`updating password failed message: ${response.message}`);
        this.logger.error(`updating password failed error: ${response.error}`);
        return of({} as UpdatedPassword);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.token != undefined && this.token != null && this.token != '';
  }

  logout(): void {
    this.logger.info('logged out');
    this.clearMessages();
    this.clearToken();
    this.logoutSuccess = 'You have been logged out.';
  }
}
