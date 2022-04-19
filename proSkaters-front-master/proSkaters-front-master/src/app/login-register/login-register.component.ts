import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  get isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
