import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Account } from '../Account';
import { AccountService } from '../account.service';

import { LoggerService } from '../logger.service';

import { faEnvelope, faLock, faUnlock, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account: Account;
  registerForm: FormGroup;
  envelope: any = faEnvelope;
  lock: any = faLock;
  unlock: any = faUnlock;
  trash: any = faTrashAlt;
  user: any = faUserPlus;
  private formSubmitAttempt: boolean;
  registerSuccess: string = localStorage.getItem('register_success');
  registerError: string = localStorage.getItem('register_error');

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private logger: LoggerService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {validator: this.passwordsMatch('password', 'confirmPassword')});
  }

  passwordsMatch(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      let passwordInput: AbstractControl = group.controls[password];
      let passwordConfirmationInput: AbstractControl = group.controls[confirmPassword];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  get email() {
    return this.registerForm.get('email').value;
  }

  get password() {
    return this.registerForm.get('password').value;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword').value;
  }

  isFieldValid(field: string): boolean {
    return (!this.registerForm.get(field).valid && this.registerForm.get(field).touched)||(this.registerForm.get(field).untouched && this.formSubmitAttempt);
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
    
    this.accountService.registerAccount(this.account).subscribe(response => {
      this.registerError = localStorage.getItem('register_error');

      if (this.registerError != undefined) {
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
    this.formSubmitAttempt = true;
    if(this.registerForm.valid) {
      this.logger.log(this.registerForm.value);
      this.registerAccount();
    } else {
      this.validateAllFormFields(this.registerForm);
    }
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {
  }
}
