import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product>;
  page: number = 1;
  querySub: any;
  readonly imageUrl: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.imageUrl = this.productService.imageUrl;
  }

  getProductList(num: number) {
    let products: Observable<Product[]> = this.productService.getProducts(num);

    products.subscribe(productList => {
      if (productList.length > 0) {
        this.productList = productList;
        this.page = num;
      }
    });
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      this.getProductList(+params['page'] || 1);  
    });
  }

  ngOnDestroy(): void {
    if(this.querySub) this.querySub.unsubscribe();
  }
}
