import { Component, Input, OnInit } from '@angular/core';

import { CustomerAccountService } from '../customer-account.service';

import {
  faUserCheck,
  faUserCog,
  faUserLock,
  faCreditCard,
  IconDefinition,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-customer-account-menu',
  templateUrl: './customer-account-menu.component.html',
  styleUrls: ['./customer-account-menu.component.scss'],
})
export class CustomerAccountMenuComponent implements OnInit {
  @Input() active: 'info' | 'settings' | 'password' | 'payment' | 'history';
  userCheck: IconDefinition = faUserCheck;
  userCog: IconDefinition = faUserCog;
  userLock: IconDefinition = faUserLock;
  creditCard: IconDefinition = faCreditCard;
  stripe: IconDefinition = faCcStripe;
  history: IconDefinition = faHistory;

  constructor(private customerAccountService: CustomerAccountService) {}

  isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
