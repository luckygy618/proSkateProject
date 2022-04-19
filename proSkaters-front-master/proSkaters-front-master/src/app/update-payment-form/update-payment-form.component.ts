import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CreditCard } from '../CreditCard';
import { PaymentMethod } from '../PaymentMethod';
import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import { LoggerService } from '../logger.service';
import {
  faCalendar,
  faCalendarAlt,
  faCreditCard,
  faSortNumericUp,
  faTrash,
  faUserEdit,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-update-payment-form',
  templateUrl: './update-payment-form.component.html',
  styleUrls: ['./update-payment-form.component.scss'],
})
export class UpdatePaymentFormComponent implements OnInit {
  creditCard: CreditCard;
  paymentMethod: PaymentMethod;
  account: CustomerAccount;
  updatePaymentForm: FormGroup;
  creditCardBack: IconDefinition = faCreditCard;
  calendar: IconDefinition = faCalendar;
  calendarAlt: IconDefinition = faCalendarAlt;
  numeric: IconDefinition = faSortNumericUp;
  stripe: IconDefinition = faCcStripe;
  trash: IconDefinition = faTrash;
  userEdit: IconDefinition = faUserEdit;
  private formSubmitAttempt: boolean;
  updatePaymentSuccess: string = localStorage.getItem('update_payment_success');
  updatePaymentError: string = localStorage.getItem('update_payment_error');

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

  createUpdatePaymentForm(): void {
    const formBuilder = this.formBuilder;
    let hiddenNumber: string = '**** **** **** ****';
    let month: string = '';
    let year: string = '';

    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      if (this.isDefined(account.paymentInfo)) {
        if (this.isDefined(account.paymentInfo.card)) {
          if (this.isDefined(account.paymentInfo.card.last4)) {
            hiddenNumber = `**** **** **** ${account.paymentInfo.card.last4}`;
          }

          month = `${account.paymentInfo.card.exp_month}`;
          year = `${account.paymentInfo.card.exp_year}`;
        }
      }

      this.updatePaymentForm = formBuilder.group({
        number: [
          hiddenNumber,
          [
            Validators.required,
            Validators.minLength(13),
            Validators.maxLength(19),
            Validators.pattern('^[0-9 ]{13,19}$'),
          ],
        ],
        exp_month: [
          month,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(2),
            Validators.pattern('^[0-9]{1,2}$'),
          ],
        ],
        exp_year: [
          year,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern('^[0-9]{4}$'),
          ],
        ],
        cvc: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            Validators.pattern('^[0-9]{3,4}$'),
          ],
        ],
      });
    });
  }

  get number(): string {
    return this.updatePaymentForm.get('number').value.replace(/\s+/g, '');
  }

  get exp_month(): number {
    return +this.updatePaymentForm.get('exp_month').value;
  }

  get exp_year(): number {
    return +this.updatePaymentForm.get('exp_year').value;
  }

  get cvc(): string {
    return this.updatePaymentForm.get('cvc').value;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  isFieldValid(field: string, control: AbstractControl = this.updatePaymentForm): boolean {
    return (
      (!control.get(field).valid && control.get(field).touched) ||
      (control.get(field).untouched && this.formSubmitAttempt)
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

  updatePayment() {
    this.creditCard = {
      number: this.number,
      exp_month: this.exp_month,
      exp_year: this.exp_year,
      cvc: this.cvc,
    };

    this.paymentMethod = {
      type: 'card',
      card: this.creditCard,
    };

    this.logger.log(this.creditCard);
    this.logger.log(this.paymentMethod);

    this.customerAccountService.updatePaymentInfo(this.paymentMethod).subscribe((response) => {
      this.logger.log(response);
      this.updatePaymentError = localStorage.getItem('save_account_error');

      if (this.updatePaymentError != undefined) {
        window.location.reload();
      } else {
        this.router.navigateByUrl('/account');
      }
    });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.updatePaymentForm.valid) {
      this.logger.log(this.updatePaymentForm.value);
      this.updatePayment();
    } else {
      this.validateAllFormFields(this.updatePaymentForm);
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
    this.createUpdatePaymentForm();
  }
}
