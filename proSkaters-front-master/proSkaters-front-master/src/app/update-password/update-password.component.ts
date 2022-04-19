import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UpdatedPassword } from '../UpdatedPassword';
import { AccountService } from '../account.service';

import { LoggerService } from '../logger.service';

import {
  faLock,
  faUnlock,
  faLockOpen,
  faUserLock,
  faUserEdit,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  updatedPassword: UpdatedPassword;
  updatePasswordForm: FormGroup;
  lock: IconDefinition = faLock;
  unlock: IconDefinition = faUnlock;
  lockOpen: IconDefinition = faLockOpen;
  userLock: IconDefinition = faUserLock;
  userEdit: IconDefinition = faUserEdit;
  trash: IconDefinition = faTrash;
  private formSubmitAttempt: boolean;
  updatePasswordSuccess: string = localStorage.getItem('update_password_success');
  updatePasswordError: string = localStorage.getItem('update_password_error');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private logger: LoggerService
  ) {
    this.updatePasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validator: this.checkPasswords('currentPassword', 'newPassword', 'confirmNewPassword') }
    );
  }

  checkPasswords(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    return (group: FormGroup) => {
      let currentPasswordInput: AbstractControl = group.controls[currentPassword];
      let newPasswordInput: AbstractControl = group.controls[newPassword];
      let confirmNewPasswordInput: AbstractControl = group.controls[confirmNewPassword];
      if (currentPasswordInput.value === newPasswordInput.value) {
        newPasswordInput.setErrors({ old: true });
      } else {
        if (newPasswordInput.hasError('old')) {
          delete newPasswordInput.errors['old'];
          newPasswordInput.updateValueAndValidity();
        }
      }
      if (currentPasswordInput.value === confirmNewPasswordInput.value) {
        confirmNewPasswordInput.setErrors({ old: true });
      } else {
        if (confirmNewPasswordInput.hasError('old')) {
          delete confirmNewPasswordInput.errors['old'];
          confirmNewPasswordInput.updateValueAndValidity();
        }
      }
      if (newPasswordInput.value !== confirmNewPasswordInput.value) {
        newPasswordInput.setErrors({ notEquivalent: true });
        confirmNewPasswordInput.setErrors({ notEquivalent: true });
      } else {
        if (newPasswordInput.hasError('notEquivalent')) {
          delete newPasswordInput.errors['notEquivalent'];
          newPasswordInput.updateValueAndValidity();
        }
        if (confirmNewPasswordInput.hasError('notEquivalent')) {
          delete confirmNewPasswordInput.errors['notEquivalent'];
          confirmNewPasswordInput.updateValueAndValidity();
        }
      }
    };
  }

  get currentPassword() {
    return this.updatePasswordForm.get('currentPassword').value;
  }

  get newPassword() {
    return this.updatePasswordForm.get('newPassword').value;
  }

  get confirmNewPassword() {
    return this.updatePasswordForm.get('confirmNewPassword').value;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  isFieldValid(field: string): boolean {
    return (
      (!this.updatePasswordForm.get(field).valid && this.updatePasswordForm.get(field).touched) ||
      (this.updatePasswordForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  updatePassword() {
    this.updatedPassword = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    };

    this.logger.log(this.updatedPassword);

    this.accountService.updatePassword(this.updatedPassword).subscribe((response) => {
      this.logger.log(response);
      this.updatePasswordError = localStorage.getItem('update_password_error');

      if (this.updatePasswordError != undefined) {
        window.location.reload();
      } else {
        this.router.navigateByUrl('/account');
      }
    });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.updatePasswordForm.valid) {
      this.logger.log(this.updatePasswordForm.value);
      this.updatePassword();
    } else {
      this.validateAllFormFields(this.updatePasswordForm);
    }
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
