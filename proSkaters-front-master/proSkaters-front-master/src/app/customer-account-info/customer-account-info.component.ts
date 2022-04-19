import { Component, OnInit } from '@angular/core';

import { CustomerAccountService } from '../customer-account.service';
import { CustomerAccount } from '../CustomerAccount';

import {
  faUser,
  faUserCheck,
  faUserCircle,
  faSignInAlt,
  faEnvelope,
  faLock,
  faPhone,
  faAddressBook,
  faShippingFast,
  faFileInvoice,
  faDollarSign,
  faCreditCard,
  IconDefinition,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-account-info',
  templateUrl: './customer-account-info.component.html',
  styleUrls: ['./customer-account-info.component.scss'],
})
export class CustomerAccountInfoComponent implements OnInit {
  account: CustomerAccount;
  userCheck: IconDefinition = faUserCheck;
  signIn: IconDefinition = faSignInAlt;
  envelope: IconDefinition = faEnvelope;
  lock: IconDefinition = faLock;
  user: IconDefinition = faUser;
  handShake: IconDefinition = faHandshake;
  userCircle: IconDefinition = faUserCircle;
  phone: IconDefinition = faPhone;
  addressBook: IconDefinition = faAddressBook;
  shipping: IconDefinition = faShippingFast;
  invoice: IconDefinition = faFileInvoice;
  dollarSign: IconDefinition = faDollarSign;
  creditCard: IconDefinition = faCreditCard;
  paymentType: string;
  hiddenNumber: string;
  month: string;
  year: string;
  loginSuccess: string = localStorage.getItem('login_success');

  constructor(private customerAccountService: CustomerAccountService) {}

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;

      if (this.isDefined(account.paymentInfo)) {
        this.paymentType = account.paymentInfo.type;

        if (this.isDefined(account.paymentInfo.card)) {
          if (this.isDefined(account.paymentInfo.card.last4)) {
            this.hiddenNumber = `**** **** **** ${account.paymentInfo.card.last4}`;
          }

          this.month = `${account.paymentInfo.card.exp_month}`;
          this.year = `${account.paymentInfo.card.exp_year}`;
        }
      }
    });
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getCustomerAccount();
  }
}
