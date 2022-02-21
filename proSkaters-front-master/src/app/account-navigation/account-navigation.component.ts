import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

import { faEnvelope, faUser, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit {
  user: any = faUser;
  userPlus: any = faUserPlus;
  signIn: any = faSignInAlt;
  signOut: any = faSignOutAlt;
  envelope: any = faEnvelope;
  email: string;
  opened: boolean = false;

  constructor(private router: Router, private accountService: AccountService) {
    this.email = localStorage.getItem('email');
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
  }

}
