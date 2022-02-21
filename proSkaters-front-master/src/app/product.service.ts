import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Product } from './Product';

let jsonHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }),
  reportProgress: true
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootUrl: string = "https://proskaters-backend.herokuapp.com";
  readonly productUrl: string = `${this.rootUrl}/products`;
  readonly imageUrl: string = `${this.rootUrl}/images`;
  readonly jsonFile: string = "/assets/data/rawdata.json";
  readonly perPage: number = 6;

  constructor(private http: HttpClient, private logger: LoggerService) { }

  getProducts(page: number): Observable<Product[]> {
    const path: string = this.productUrl + "?page=" + page + "&perPage=" + this.perPage;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    
    return this.http.get<Product[]>(path, jsonHttpOptions).pipe(
      tap(_ => this.logger.info('fetched products')),
      catchError((error) => {
          this.logger.error(`fetching failed: ${error.message}`);
          return of([] as Product[]);
        }
      )
    );
  }

  getProductByProductId(id: string): Observable<Product> {
    const path: string = `${this.productUrl}/${id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    return this.http.get<Product>(path, jsonHttpOptions).pipe(
      map((product) => {
        return product;
      }),
      tap(_ => this.logger.info(`fetched product id=${id}`)),
      catchError((error) => {
          this.logger.error(`fetching failed: ${error.message}`);
          return of({} as Product);
        }
      )
    );
  }

  uploadImage(imageFile: File): Observable<ArrayBuffer> {
    const path: string = `${this.imageUrl}/add`;
    const formData = new FormData();
    const imageHttpOptions = {
      reportProgress: true,
      responseType: 'text' as 'json'
    };
    
    formData.append('image_file', imageFile);

    return this.http.post<ArrayBuffer>(path, formData, imageHttpOptions).pipe(
      tap(_ => this.logger.info(`uploaded image file named ${imageFile.name}`)),
      catchError((error) => {
          this.logger.error(`uploading image failed: ${error.message}`);
          return of({} as ArrayBuffer);
        }
      )
    );
  }

  addProduct(product: Product): Observable<Product> {
    const path: string = `${this.productUrl}/add`;

    return this.http.post<Product>(path, product, jsonHttpOptions).pipe(
      tap(_ => this.logger.info(`added product w/ id=${product.product_id}`)),
      catchError((error) => {
          this.logger.error(`adding failed: ${error.message}`);
          return of({} as Product);
        }
      )
    );
  }

  updateProduct(product: Product): Observable<any> {
    const path: string = `${this.productUrl}/${product.product_id}`;

    return this.http.put(path, product, jsonHttpOptions).pipe(
      tap(_ => this.logger.info(`updated product id=${product.product_id}`)),
      catchError((error) => {
          this.logger.error(`updating failed: ${error.message}`);
          return of({} as Product);
        }
      )
    );
  }

  deleteProduct(product: Product | string): Observable<Product> {
    let id: string;

    if (typeof product === 'string') {
      id = product;
    } else {
      id = product.product_id;
    }

    const path = `${this.productUrl}/${id}`;

    return this.http.delete<Product>(path, jsonHttpOptions).pipe(
      tap(_ => this.logger.info(`deleted product id=${id}`)),
      catchError((error) => {
          this.logger.error(`deleting failed: ${error.message}`);
          return of({} as Product);
        }
      )
    );
  }
}
