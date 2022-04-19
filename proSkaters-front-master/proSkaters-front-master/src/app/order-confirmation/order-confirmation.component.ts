import { Component, OnInit } from '@angular/core';

import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import { LoggerService } from '../logger.service';

import { faCheckCircle, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent implements OnInit {
  account: CustomerAccount;
  check: IconDefinition = faCheckCircle;
  stripe: IconDefinition = faCcStripe;
  envelope: IconDefinition = faEnvelope;
  loginSuccess: string;
  loginError: string;

  constructor(
    private customerAccountService: CustomerAccountService,
    private logger: LoggerService
  ) {
    this.loginSuccess = this.customerAccountService.loginSuccess;
    this.loginError = this.customerAccountService.loginError;
  }

  get isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  get accountDefined(): boolean {
    return this.isDefined(this.account);
  }

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;
    });
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.getCustomerAccount();
  }

  ngOnDestroy(): void {
    this.customerAccountService.clearMessages();
  }
}
