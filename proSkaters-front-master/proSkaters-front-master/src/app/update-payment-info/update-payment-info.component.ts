import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CreditCard } from '../CreditCard';
import { PaymentMethod } from '../PaymentMethod';
import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';

import { LoggerService } from '../logger.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-update-payment-info',
  templateUrl: './update-payment-info.component.html',
  styleUrls: ['./update-payment-info.component.scss'],
})
export class UpdatePaymentInfoComponent implements OnInit {
  creditCard: CreditCard;
  paymentMethod: PaymentMethod;
  account: CustomerAccount;
  updatePaymentForm: FormGroup;
  stripe: IconDefinition = faCcStripe;
  updatePaymentSuccess: string = localStorage.getItem('update_payment_success');
  updatePaymentError: string = localStorage.getItem('update_payment_error');

  constructor(
    private customerAccountService: CustomerAccountService,
    private logger: LoggerService
  ) {}

  isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  ngOnInit(): void {}
}
