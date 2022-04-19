import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Order } from '../Order';
import { OrderItem } from '../OrderItem';
import { OrderService } from '../order.service';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { CartItem } from '../CartItem';
import { ShoppingCartService } from '../shopping-cart.service';

import { LoggerService } from '../logger.service';

import { faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem: OrderItem;
  @Input() orderItemIndex: number;
  @Input() order: Order;
  product: Product;
  cartItem: CartItem;
  stockArray: number[];
  starArray: number[];
  readonly imageUrl: string;
  addToCartError: string;
  shoppingCartIcon: IconDefinition = faShoppingCart;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private logger: LoggerService
  ) {
    this.imageUrl = this.productService.imageUrl;
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

  addToCart(quantity: number): void {
    this.cartItem = {
      product: this.product,
      quantity: quantity,
      lineTotal: this.product.price * quantity,
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

  onClickBuyAgain(quantity: number): void {
    if (this.product.stock_amount >= quantity) {
      this.addToCart(quantity);
    } else {
      this.addToCartError = this.product.product_name + ' is out of stock.';
    }
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    if (
      !this.isDefined(this.orderItem) &&
      this.isDefined(this.order) &&
      this.orderItem != undefined
    ) {
      this.orderItem = this.order.items[this.orderItemIndex];
    }

    if (this.isDefined(this.orderItem)) {
      this.getProduct(this.orderItem.product_id);
    }
  }
}
