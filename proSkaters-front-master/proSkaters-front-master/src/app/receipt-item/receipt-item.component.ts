import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { CartItem } from '../CartItem';
import { ReceiptService } from '../receipt.service';

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
  selector: 'app-receipt-item',
  templateUrl: './receipt-item.component.html',
  styleUrls: ['./receipt-item.component.scss'],
})
export class ReceiptItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Input() cartIndex: number;
  shoppingCartIcon: IconDefinition = faShoppingCart;
  dollarSign: IconDefinition = faDollarSign;
  numericUp: IconDefinition = faSortNumericUp;
  trash: IconDefinition = faTrash;
  calculator: IconDefinition = faCalculator;
  cashRegister: IconDefinition = faCashRegister;
  readonly imageUrl: string;

  constructor(
    private productService: ProductService,
    private receiptService: ReceiptService,
    private logger: LoggerService
  ) {
    this.imageUrl = this.productService.imageUrl;
  }

  get receiptSaved(): boolean {
    return this.receiptService.receiptSaved;
  }

  ngOnInit(): void {}
}
