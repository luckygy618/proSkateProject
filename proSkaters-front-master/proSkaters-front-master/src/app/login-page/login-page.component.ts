import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  registerSuccess: string;
  email: string;

  constructor(private accountService: AccountService) {
    this.registerSuccess = this.accountService.registerSuccess;
    this.email = this.accountService.email;
  }

  get isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
