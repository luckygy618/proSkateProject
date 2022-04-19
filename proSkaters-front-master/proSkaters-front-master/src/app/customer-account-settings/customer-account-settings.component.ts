import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Address } from '../Address';
import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import { LoggerService } from '../logger.service';

import {
  faUser,
  faUserCog,
  faUserCircle,
  faUserEdit,
  faHandshake,
  faPhone,
  faAddressBook,
  faShippingFast,
  faBuilding,
  faCity,
  faMap,
  faGlobe,
  faStamp,
  faFileInvoice,
  faEquals,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-account-settings',
  templateUrl: './customer-account-settings.component.html',
  styleUrls: ['./customer-account-settings.component.scss'],
})
export class CustomerAccountSettingsComponent implements OnInit {
  account: CustomerAccount;
  accountSettingsForm: FormGroup;
  user: IconDefinition = faUser;
  userCog: IconDefinition = faUserCog;
  handShake: IconDefinition = faHandshake;
  userCircle: IconDefinition = faUserCircle;
  phone: IconDefinition = faPhone;
  addressBook: IconDefinition = faAddressBook;
  shipping: IconDefinition = faShippingFast;
  building: IconDefinition = faBuilding;
  city: IconDefinition = faCity;
  map: IconDefinition = faMap;
  globe: IconDefinition = faGlobe;
  stamp: IconDefinition = faStamp;
  invoice: IconDefinition = faFileInvoice;
  equals: IconDefinition = faEquals;
  trash: IconDefinition = faTrash;
  userEdit: IconDefinition = faUserEdit;
  private formSubmitAttempt: boolean;
  saveAccountSuccess: string = localStorage.getItem('save_account_success');
  saveAccountError: string = localStorage.getItem('save_account_error');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerAccountService: CustomerAccountService,
    private logger: LoggerService
  ) {}

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;
    });
  }

  createAccountSettingsForm(): void {
    const formBuilder = this.formBuilder;

    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.accountSettingsForm = formBuilder.group({
        salutation: [
          account.salutation,
          [Validators.minLength(3), Validators.maxLength(6), Validators.pattern('^[a-zA-Z.]*$')],
        ],
        firstName: [
          account.firstName,
          [Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')],
        ],
        lastName: [
          account.lastName,
          [Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')],
        ],
        phoneNumber: [
          account.phoneNumber,
          [
            Validators.minLength(12),
            Validators.maxLength(15),
            Validators.pattern('^[0-9]{3}-[0-9]{3}-[0-9]{4}$'),
          ],
        ],
        shippingAddress: formBuilder.group({
          address1: [
            account.shippingAddress.address1,
            [
              Validators.minLength(8),
              Validators.maxLength(40),
              Validators.pattern('^[a-zA-Z0-9 ,.-]*$'),
            ],
          ],
          address2: [
            account.shippingAddress.address2,
            [
              Validators.minLength(8),
              Validators.maxLength(40),
              Validators.pattern('^[a-zA-Z0-9 ,.-]*$'),
            ],
          ],
          city: [
            account.shippingAddress.city,
            [
              Validators.minLength(3),
              Validators.maxLength(20),
              Validators.pattern('^[a-zA-Z ,.-]*$'),
            ],
          ],
          province: [
            account.shippingAddress.province,
            [
              Validators.minLength(3),
              Validators.maxLength(20),
              Validators.pattern('^[a-zA-Z ,.-]*$'),
            ],
          ],
          country: [
            account.shippingAddress.country,
            [
              Validators.minLength(2),
              Validators.maxLength(20),
              Validators.pattern('^[a-zA-Z ,.-]*$'),
            ],
          ],
          postalCode: [
            account.shippingAddress.postalCode,
            [
              Validators.minLength(6),
              Validators.maxLength(7),
              Validators.pattern('^[a-zA-Z0-9 ]*$'),
            ],
          ],
        }),
        useShippingAsBilling: [false, [Validators.required]],
        billingAddress: formBuilder.group({
          address1: [
            account.billingAddress.address1,
            [
              Validators.minLength(8),
              Validators.maxLength(40),
              Validators.pattern('^[a-zA-Z0-9 ,.-]*$'),
            ],
          ],
          address2: [
            account.billingAddress.address2,
            [
              Validators.minLength(8),
              Validators.maxLength(40),
              Validators.pattern('^[a-zA-Z0-9 ,.-]*$'),
            ],
          ],
          city: [
            account.billingAddress.city,
            [
              Validators.minLength(3),
              Validators.maxLength(20),
              Validators.pattern('^[a-zA-Z ,.-]*$'),
            ],
          ],
          province: [
            account.billingAddress.province,
            [
              Validators.minLength(2),
              Validators.maxLength(20),
              Validators.pattern('^[a-zA-Z ,.-]*$'),
            ],
          ],
          country: [
            account.billingAddress.country,
            [
              Validators.minLength(2),
              Validators.maxLength(20),
              Validators.pattern('^[a-zA-Z ,.-]*$'),
            ],
          ],
          postalCode: [
            account.billingAddress.postalCode,
            [
              Validators.minLength(6),
              Validators.maxLength(7),
              Validators.pattern('^[a-zA-Z0-9 ]*$'),
            ],
          ],
        }),
      });
    });
  }

  formToAddress(control: AbstractControl): Address {
    const address: Address = {
      address1: control.get('address1').value,
      address2: control.get('address2').value,
      city: control.get('city').value,
      province: control.get('province').value,
      country: control.get('country').value,
      postalCode: control.get('postalCode').value,
    };
    return address;
  }

  get salutation(): string {
    return this.accountSettingsForm.get('salutation').value;
  }

  get firstName(): string {
    return this.accountSettingsForm.get('firstName').value;
  }

  get lastName(): string {
    return this.accountSettingsForm.get('lastName').value;
  }

  get phoneNumber(): string {
    return this.accountSettingsForm.get('phoneNumber').value;
  }

  get shippingAddress(): Address {
    return this.formToAddress(this.accountSettingsForm.get('shippingAddress'));
  }

  get shippingAddressForm(): AbstractControl {
    return this.accountSettingsForm.get('shippingAddress');
  }

  get useShippingAsBilling(): boolean {
    return this.accountSettingsForm.get('useShippingAsBilling').value;
  }

  get billingAddress(): Address {
    let billingAddress: Address;
    if (this.useShippingAsBilling) {
      billingAddress = this.shippingAddress;
    } else {
      billingAddress = this.formToAddress(this.accountSettingsForm.get('billingAddress'));
    }
    return billingAddress;
  }

  get billingAddressForm(): AbstractControl {
    return this.accountSettingsForm.get('billingAddress');
  }

  isFieldValid(field: string, control: AbstractControl = this.accountSettingsForm): boolean {
    return (
      (!control.get(field).valid && control.get(field).touched) ||
      (control.get(field).untouched && this.formSubmitAttempt)
    );
  }

  displayFieldCss(field: string): object {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  saveAccountSettings(): void {
    this.account = {
      salutation: this.salutation,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
    };

    this.logger.log(this.account);

    this.customerAccountService.saveCustomerAccount(this.account).subscribe((response) => {
      this.logger.log(response);
      this.saveAccountError = localStorage.getItem('save_account_error');

      if (this.saveAccountError != undefined) {
        window.location.reload();
      } else {
        this.router.navigateByUrl('/account');
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.accountSettingsForm.valid) {
      this.logger.log(this.accountSettingsForm.value);
      this.saveAccountSettings();
    } else {
      this.validateAllFormFields(this.accountSettingsForm);
    }
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getCustomerAccount();
    this.createAccountSettingsForm();
  }
}
