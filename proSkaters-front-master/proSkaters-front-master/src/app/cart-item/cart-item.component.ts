import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
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
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Input() cartIndex: number;
  @Output() successEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() errorEvent: EventEmitter<string> = new EventEmitter<string>();
  oldQuantity: number;
  shoppingCartIcon: IconDefinition = faShoppingCart;
  dollarSign: IconDefinition = faDollarSign;
  numericUp: IconDefinition = faSortNumericUp;
  trash: IconDefinition = faTrash;
  calculator: IconDefinition = faCalculator;
  cashRegister: IconDefinition = faCashRegister;
  stockArray: number[];
  readonly imageUrl: string;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private logger: LoggerService
  ) {
    this.imageUrl = this.productService.imageUrl;
  }

  fillStockArray() {
    this.stockArray = new Array();
    for (let i = 1; i <= this.cartItem.product.stock_amount && i <= 10; i++) {
      this.stockArray.push(i);
    }
  }

  updateMessages() {
    this.successEvent.emit(this.shoppingCartService.successMessage);
    this.errorEvent.emit(this.shoppingCartService.errorMessage);
  }

  updateQuantity() {
    this.shoppingCartService.updateItemQuantity(this.cartItem, this.cartIndex, this.oldQuantity);
    this.oldQuantity = this.cartItem.quantity;
    this.logger.log(this.cartItem);
    this.logger.log(this.oldQuantity);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.cartItem, this.cartIndex);
  }

  onChangeQuantity() {
    this.updateQuantity();
    this.updateMessages();
  }

  onClickRemove() {
    this.removeFromCart();
    this.updateMessages();
  }

  ngOnInit(): void {
    this.oldQuantity = this.cartItem.quantity;
    this.fillStockArray();
  }
}
