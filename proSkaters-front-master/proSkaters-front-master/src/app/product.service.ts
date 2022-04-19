import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../environments/environment';

import { LoggerService } from './logger.service';
import { Product } from './Product';

let jsonHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
  reportProgress: true,
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly rootUrl: string = environment.apiURL;
  readonly productUrl: string = `${this.rootUrl}/products`;
  readonly imageUrl: string = `${this.rootUrl}/images`;
  readonly jsonFile: string = '/assets/data/rawdata.json';
  readonly perPage: number = 6;

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getProducts(): Observable<Product[]> {
    const path: string = this.productUrl;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get<Product[]>(path, jsonHttpOptions).pipe(
      tap((_) => this.logger.info('fetched products')),
      catchError((error) => {
        this.logger.error(`fetching failed: ${error.message}`);
        return of([] as Product[]);
      })
    );
  }

  getProductByProductId(id: string): Observable<Product> {
    const path: string = `${this.productUrl}/${id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get<Product>(path, jsonHttpOptions).pipe(
      map((product) => {
        return product;
      }),
      tap((_) => this.logger.info(`fetched product id=${id}`)),
      catchError((error) => {
        this.logger.error(`fetching failed: ${error.message}`);
        return of({} as Product);
      })
    );
  }

  searchProducts(input: string): Observable<Product[]> {
    const term: string = input.toLowerCase().trim();
    const path: string = this.productUrl;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    if (!term) {
      return of([]);
    }

    return this.http.get<Product[]>(path, jsonHttpOptions).pipe(
      tap((_) => this.logger.info('fetched products')),
      map((products) => {
        const productMatches = (product: Product): boolean => {
          const matchesName: boolean = product.product_name.toLowerCase().trim().includes(term);
          const matchesBrand: boolean = product.brand.toLowerCase().trim().includes(term);
          const matchesDescription: boolean = product.description
            .toLowerCase()
            .trim()
            .includes(term);
          return matchesName || matchesBrand || matchesDescription;
        };
        return products.filter(productMatches);
      }),
      catchError((error) => {
        this.logger.error(`fetching failed: ${error.message}`);
        return of([] as Product[]);
      })
    );
  }

  uploadImage(imageFile: File): Observable<ArrayBuffer> {
    const path: string = `${this.imageUrl}/add`;
    const formData = new FormData();
    const imageHttpOptions = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      reportProgress: true,
      responseType: 'text' as 'json',
    };

    localStorage.removeItem('upload_image_success');
    localStorage.removeItem('upload_image_error');

    formData.append('image_file', imageFile);

    return this.http.post<ArrayBuffer>(path, formData, imageHttpOptions).pipe(
      tap((_) => {
        localStorage.setItem('upload_image_success', `uploaded image file named ${imageFile.name}`);
        this.logger.info(`uploaded image file named ${imageFile.name}`);
      }),
      catchError((response) => {
        localStorage.setItem('upload_image_error', response.message);
        this.logger.error(`uploading image failed: ${response.message}`);
        return of({} as ArrayBuffer);
      })
    );
  }

  addProduct(product: Product): Observable<Product> {
    const path: string = `${this.productUrl}/add`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    localStorage.removeItem('add_product_success');
    localStorage.removeItem('upload_image_error');

    return this.http.post<Product>(path, product, jsonHttpOptions).pipe(
      tap((_) => {
        localStorage.setItem('add_product_success', `added product w/ id=${product.product_id}`);
        this.logger.info(`added product w/ id=${product.product_id}`);
      }),
      catchError((response) => {
        localStorage.setItem('add_product_error', response.message);
        this.logger.error(`adding failed: ${response.message}`);
        return of({} as Product);
      })
    );
  }

  updateProduct(product: Product): Observable<any> {
    const path: string = `${this.productUrl}/${product.product_id}`;
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.put(path, product, jsonHttpOptions).pipe(
      tap((_) => this.logger.info(`updated product id=${product.product_id}`)),
      catchError((error) => {
        this.logger.error(`updating failed: ${error.message}`);
        return of({} as Product);
      })
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
    jsonHttpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.delete<Product>(path, jsonHttpOptions).pipe(
      tap((_) => this.logger.info(`deleted product id=${id}`)),
      catchError((error) => {
        this.logger.error(`deleting failed: ${error.message}`);
        return of({} as Product);
      })
    );
  }
}
