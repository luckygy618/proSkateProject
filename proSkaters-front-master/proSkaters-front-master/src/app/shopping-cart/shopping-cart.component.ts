import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  @Output() successEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorEvent: EventEmitter<string> = new EventEmitter<string>();
  shoppingCartIcon: IconDefinition = faShoppingCart;
  dollarSign: IconDefinition = faDollarSign;
  numericUp: IconDefinition = faSortNumericUp;
  trash: IconDefinition = faTrash;
  calculator: IconDefinition = faCalculator;
  cashRegister: IconDefinition = faCashRegister;

  constructor(private shoppingCartService: ShoppingCartService, private logger: LoggerService) {}

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

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.shoppingCartService.clearMessages();
  }
}
