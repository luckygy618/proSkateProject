import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

import {
  faUserPlus,
  faSignInAlt,
  IconDefinition,
  faChevronCircleRight,
  faChevronCircleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.scss'],
})
export class LoginNavComponent implements OnInit {
  userPlus: IconDefinition = faUserPlus;
  signIn: IconDefinition = faSignInAlt;
  chevronRight: IconDefinition = faChevronCircleRight;
  chevronDown: IconDefinition = faChevronCircleDown;
  opened: boolean = false;

  constructor(private router: Router, private accountService: AccountService) {}

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
