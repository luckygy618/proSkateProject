import { Injectable } from '@angular/core';

import { ShoppingCart } from './ShoppingCart';
import { CartItem } from './CartItem';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCart: ShoppingCart;
  private savedCart: ShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  readonly successKey: string = 'shopping_cart_success';
  readonly errorKey: string = 'shopping_cart_error';

  constructor(private logger: LoggerService) {
    if (this.cartSaved) {
      this.loadSavedCart();
    } else {
      this.emptyCart();
    }
  }

  get items(): CartItem[] {
    const items: CartItem[] = this.shoppingCart.items;
    return items;
  }

  get totalQuantity(): number {
    return this.shoppingCart.totalQuantity;
  }

  set increaseTotalQuantity(quantity: number) {
    this.shoppingCart.totalQuantity += quantity;
  }

  set decreaseTotalQuantity(quantity: number) {
    this.shoppingCart.totalQuantity -= quantity;
  }

  get subtotal(): number {
    return this.shoppingCart.subtotal;
  }

  set increaseSubtotal(subtotal: number) {
    this.shoppingCart.subtotal += subtotal;
  }

  set decreaseSubtotal(subtotal: number) {
    this.shoppingCart.subtotal -= subtotal;
  }

  get cartEmpty(): boolean {
    return this.shoppingCart.items.length == 0 || this.shoppingCart.totalQuantity <= 0;
  }

  get cartDefined(): boolean {
    return this.shoppingCart != undefined && this.shoppingCart != null;
  }

  get cartSaved(): boolean {
    return this.savedCart != undefined && this.savedCart != null;
  }

  get successMessage(): string {
    return localStorage.getItem(this.successKey);
  }

  set successMessage(message: string) {
    localStorage.removeItem(this.errorKey);
    localStorage.setItem(this.successKey, message);
  }

  get errorMessage(): string {
    return localStorage.getItem(this.errorKey);
  }

  set errorMessage(message: string) {
    localStorage.removeItem(this.successKey);
    localStorage.setItem(this.errorKey, message);
  }

  clearMessages(): void {
    localStorage.removeItem(this.successKey);
    localStorage.removeItem(this.errorKey);
  }

  private saveCart(): boolean {
    let saved: boolean = false;
    if (this.cartDefined) {
      localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
      saved = true;
    }
    return saved;
  }

  private loadSavedCart(): boolean {
    let loaded: boolean = false;
    if (this.cartSaved) {
      this.shoppingCart = this.savedCart;
      loaded = true;
    }
    return loaded;
  }

  emptyCart(): boolean {
    this.shoppingCart = {
      items: new Array(),
      totalQuantity: 0,
      subtotal: 0,
    };
    return this.saveCart();
  }

  addToCart(item: CartItem): boolean {
    this.shoppingCart.items.unshift(item);
    this.shoppingCart.totalQuantity += item.quantity;
    this.shoppingCart.subtotal += item.lineTotal;
    this.successMessage = `The item, ${item.product.product_name} was successfully added to your cart!`;
    return this.saveCart();
  }

  updateItemQuantity(item: CartItem, index: number, oldQuantity: number): boolean {
    let updated: boolean = false;

    if (item.product.stock_amount >= item.quantity) {
      for (let i = 0; i < this.items.length; i++) {
        if (index == i) {
          this.items[i].quantity = +item.quantity;
          this.items[i].lineTotal = +item.quantity * +item.product.price;
          this.shoppingCart.totalQuantity += +item.quantity;
          this.shoppingCart.subtotal += +item.lineTotal;

          this.logger.log(+oldQuantity);

          this.shoppingCart.totalQuantity -= +oldQuantity;
          this.shoppingCart.subtotal -= +oldQuantity * +item.product.price;

          this.logger.log(this.shoppingCart);

          this.successMessage = `The quantity of item, ${item.product.product_name} was successfully updated to ${item.quantity}!`;
          updated = this.saveCart();
          break;
        }
      }
    }

    if (!updated) {
      this.errorMessage = `Error updating the quantity of item with index, ${index}!`;
    }

    return updated;
  }

  removeFromCart(item: CartItem, index: number): boolean {
    this.shoppingCart.items.splice(index, 1);
    this.shoppingCart.totalQuantity -= item.quantity;
    this.shoppingCart.subtotal -= item.lineTotal;

    this.logger.log(this.shoppingCart);

    this.successMessage = `The item, ${item.product.product_name} was successfully removed from your cart!`;
    return this.saveCart();
  }
}
