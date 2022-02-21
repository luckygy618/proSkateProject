import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Account } from '../Account';
import { AccountService } from '../account.service';

import { LoggerService } from '../logger.service';

import { faEnvelope, faUnlock, faTrashAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: Account;
  accountForm: FormGroup;
  envelope: any = faEnvelope;
  unlock: any = faUnlock;
  trash: any = faTrashAlt;
  signIn: any = faSignInAlt;
  loginError: string = localStorage.getItem('login_error');

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private logger: LoggerService) {
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.accountForm.get('email').value;
  }

  get password() {
    return this.accountForm.get('password').value;
  }

  isFieldValid(field: string) {
    return !this.accountForm.get(field).valid && this.accountForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  loginToAccount() {
    this.account = {
      email: this.email,
      password: this.password
    };

    this.logger.log(this.account);

    this.accountService.loginToAccount(this.account).subscribe(account => {
      this.logger.log(account);

      this.loginError = localStorage.getItem('login_error');

      if (this.loginError != undefined) {
        window.location.reload();
      } else {
        this.router.navigateByUrl('/account/login');
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if(this.accountForm.valid) {
      this.logger.log(this.accountForm.value);
      this.loginToAccount();
    } else {
      this.validateAllFormFields(this.accountForm);
    }
  }

  ngOnInit(): void {
  }

}
