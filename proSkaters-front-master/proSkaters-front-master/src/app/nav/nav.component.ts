import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';

import { faHome, faSearchDollar, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  home: IconDefinition = faHome;
  search: IconDefinition = faSearchDollar;

  constructor(private account: AccountService) {}

  get isLoggedIn(): boolean {
    return this.account.isLoggedIn();
  }

  ngOnInit(): void {}
}
