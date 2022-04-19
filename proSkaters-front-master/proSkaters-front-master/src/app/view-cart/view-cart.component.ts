import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from '../CartItem';
import { ShoppingCartService } from '../shopping-cart.service';

import { LoggerService } from '../logger.service';

import {
  faCalculator,
  faCashRegister,
  faDollarSign,
  faShoppingCart,
  faSortNumericUp,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  shoppingCartIcon: IconDefinition = faShoppingCart;
  dollarSign: IconDefinition = faDollarSign;
  numericUp: IconDefinition = faSortNumericUp;
  trash: IconDefinition = faTrash;
  calculator: IconDefinition = faCalculator;
  cashRegister: IconDefinition = faCashRegister;
  shoppingCartSuccess: string;
  shoppingCartError: string;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private logger: LoggerService
  ) {
    this.shoppingCartSuccess = this.shoppingCartService.successMessage;
    this.shoppingCartError = this.shoppingCartService.errorMessage;
  }

  get items(): CartItem[] {
    const items: CartItem[] = this.shoppingCartService.items;
    return items;
  }

  get totalQuantity(): number {
    return this.shoppingCartService.totalQuantity;
  }

  get subtotal(): number {
    return this.shoppingCartService.subtotal;
  }

  get cartEmpty(): boolean {
    return this.shoppingCartService.cartEmpty;
  }

  proceedToCheckout(): void {
    if (!this.cartEmpty) {
      this.shoppingCartService.clearMessages();
      this.router.navigateByUrl('/checkout');
    }
  }

  onClickCheckout() {
    this.proceedToCheckout();
  }

  ngOnInit(): void {}
}
