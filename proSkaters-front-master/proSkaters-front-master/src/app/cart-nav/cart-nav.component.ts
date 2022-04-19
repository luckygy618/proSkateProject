import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../shopping-cart.service';

import {
  faCashRegister,
  faHistory,
  faMapMarkerAlt,
  faReceipt,
  faShippingFast,
  faShoppingCart,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-nav',
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.scss'],
})
export class CartNavComponent implements OnInit {
  shoppingCartIcon: IconDefinition = faShoppingCart;
  cashRegister: IconDefinition = faCashRegister;
  shipping: IconDefinition = faShippingFast;
  mapMarker: IconDefinition = faMapMarkerAlt;
  history: IconDefinition = faHistory;
  receipt: IconDefinition = faReceipt;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService) {}

  get totalQuantity(): number {
    return this.shoppingCartService.totalQuantity;
  }

  ngOnInit(): void {}
}
