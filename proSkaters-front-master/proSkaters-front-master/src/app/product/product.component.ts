import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../Product';
import { ProductService } from '../product.service';
import { CustomerAccount } from '../CustomerAccount';
import { CustomerAccountService } from '../customer-account.service';
import { CartItem } from '../CartItem';
import { ShoppingCartService } from '../shopping-cart.service';

import { LoggerService } from '../logger.service';

import {
  faMapMarkerAlt,
  faShoppingCart,
  faSortNumericUp,
  faStar,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  account: CustomerAccount;
  cartItem: CartItem;
  addToCartForm: FormGroup;
  querySub: any;
  stockArray: number[];
  starArray: number[];
  readonly imageUrl: string;
  addToCartError: string;
  star: IconDefinition = faStar;
  mapMarker: IconDefinition = faMapMarkerAlt;
  numericUp: IconDefinition = faSortNumericUp;
  shoppingCartIcon: IconDefinition = faShoppingCart;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private customerAccountService: CustomerAccountService,
    private shoppingCartService: ShoppingCartService,
    private logger: LoggerService
  ) {
    this.addToCartForm = this.formBuilder.group({
      quantity: [
        0,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.pattern('^[0-9]{1,2}$'),
        ],
      ],
    });

    this.imageUrl = this.productService.imageUrl;
  }

  get quantity(): number {
    return +this.addToCartForm.get('quantity').value;
  }

  getProduct(product_id: string): void {
    this.productService.getProductByProductId(product_id).subscribe((product) => {
      this.product = product;
      this.stockArray = new Array();
      for (let i = 1; i <= product.stock_amount && i <= 10; i++) {
        this.stockArray.push(i);
      }
      this.starArray = new Array(product.rating);
    });
  }

  getCustomerAccount(): void {
    this.customerAccountService.getCustomerAccount().subscribe((account) => {
      this.account = account;
    });
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.customerAccountService.isLoggedIn();
  }

  isFieldValid(field: string): boolean {
    return !this.addToCartForm.get(field).valid && this.addToCartForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  addToCart(): void {
    this.cartItem = {
      product: this.product,
      quantity: this.quantity,
      lineTotal: this.product.price * this.quantity,
    };

    this.logger.log(this.cartItem);

    this.shoppingCartService.addToCart(this.cartItem);

    this.logger.log(this.shoppingCartService.items);

    this.addToCartError = this.shoppingCartService.errorMessage;

    if (this.addToCartError != undefined) {
      window.location.reload();
    } else {
      this.router.navigateByUrl('/cart');
    }
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
    if (this.addToCartForm.valid) {
      this.logger.log(this.addToCartForm.value);
      this.addToCart();
    } else {
      this.validateAllFormFields(this.addToCartForm);
    }
  }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.getProduct(params['id']);
      this.getCustomerAccount();
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }
}
