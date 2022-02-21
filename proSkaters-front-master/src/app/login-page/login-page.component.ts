import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  registerSuccess: string = localStorage.getItem('register_success');
  email: string;

  constructor(private accountService: AccountService) {
    this.email = localStorage.getItem('email');
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {
  }

}
