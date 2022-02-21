import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../Product';
import { ProductService } from '../product.service';
import { AccountService } from '../account.service';

import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product;
  querySub: any;
  star: any = faStar;
  starArray: any[];
  readonly imageUrl: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private accountService: AccountService) {
    this.imageUrl = this.productService.imageUrl;
  }

  getProduct(product_id: string): void {
    this.productService.getProductByProductId(product_id).subscribe(product => {
      this.product = product;
      this.starArray = new Array(product.rating);
    });
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      if (localStorage.getItem('access_token')) {
        this.getProduct(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.querySub) this.querySub.unsubscribe();
  }
}
