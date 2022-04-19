import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerSuccess: string;
  registerError: string;

  constructor(private accountService: AccountService, private logger: LoggerService) {
    this.registerSuccess = this.accountService.registerSuccess;
    this.registerError = this.accountService.registerError;
  }

  get isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
