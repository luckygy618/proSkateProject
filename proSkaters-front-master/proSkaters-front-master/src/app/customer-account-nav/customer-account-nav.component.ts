import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import {
  faUser,
  faSignOutAlt,
  faEnvelope,
  faUserCheck,
  faUserCog,
  faUserLock,
  faCreditCard,
  faHistory,
  IconDefinition,
  faChevronCircleRight,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-customer-account-nav',
  templateUrl: './customer-account-nav.component.html',
  styleUrls: ['./customer-account-nav.component.scss'],
})
export class CustomerAccountNavComponent implements OnInit {
  @Input() active: 'info' | 'settings' | 'password' | 'payment' | 'history';
  account: CustomerAccount;
  user: IconDefinition = faUser;
  chevronRight: IconDefinition = faChevronCircleRight;
  chevronDown: IconDefinition = faChevronCircleDown;
  envelope: IconDefinition = faEnvelope;
  userCheck: IconDefinition = faUserCheck;
  userCog: IconDefinition = faUserCog;
  userLock: IconDefinition = faUserLock;
  creditCard: IconDefinition = faCreditCard;
  stripe: IconDefinition = faCcStripe;
  history: IconDefinition = faHistory;
  signOut: IconDefinition = faSignOutAlt;
  opened: boolean = false;

  constructor(private router: Router, private customerAccountService: CustomerAccountService) {}

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

  get isLoggedIn(): boolean {
    let loggedIn = false;
    if (this.isDefined(this.account)) {
      loggedIn = this.customerAccountService.isLoggedIn();
    }
    return loggedIn;
  }

  logout() {
    this.customerAccountService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.getCustomerAccount();
  }
}
