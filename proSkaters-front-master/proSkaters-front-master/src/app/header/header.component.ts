import { Component, OnInit } from '@angular/core';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly logoSrc: string = 'assets/img/Pro-Skaters-Place-Logo-Canada-web.png';

  constructor(private account: AccountService) {}

  get isLoggedIn(): boolean {
    return this.account.isLoggedIn();
  }

  ngOnInit(): void {}
}
