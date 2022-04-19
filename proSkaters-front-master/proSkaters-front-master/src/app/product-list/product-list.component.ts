import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Array<Product>;
  readonly imageUrl: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.imageUrl = this.productService.imageUrl;
  }

  getProductList() {
    let products: Observable<Product[]> = this.productService.getProducts();

    products.subscribe((productList) => {
      if (productList.length > 0) {
        this.productList = productList;
      }
    });
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.getProductList();
  }
}
