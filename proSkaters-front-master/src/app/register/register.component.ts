import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Account } from '../Account';
import { AccountService } from '../account.service';

import { LoggerService } from '../logger.service';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: Account;
  accountForm: FormGroup;
  envelope: any = faEnvelope;
  lock: any = faLock;
  unlock: any = faUnlock;
  trash: any = faTrashAlt;
  user: any = faUserPlus;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private logger: LoggerService) {
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get email() {
    return this.accountForm.get('email').value;
  }

  get password() {
    return this.accountForm.get('password').value;
  }

  get confirmPassword() {
    return this.accountForm.get('confirmPassword').value;
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

  registerAccount() {
    this.account = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.logger.log(this.account);
    this.accountService.registerAccount(this.account).subscribe();
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
      this.registerAccount();
    } else {
      this.validateAllFormFields(this.accountForm);
    }
  }

  ngOnInit(): void {
  }
}
