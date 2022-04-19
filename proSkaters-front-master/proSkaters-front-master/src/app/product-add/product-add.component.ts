import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';

import { AccountService } from '../account.service';

import { Product } from '../Product';
import { ProductService } from '../product.service';

import { LoggerService } from '../logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  product: Product;
  productImageFile: File;
  productForm: FormGroup;
  readonly imageUrl: string;
  private formSubmitAttempt: boolean;
  addProductSuccess: string = localStorage.getItem('add_product_success');
  addProductError: string = localStorage.getItem('add_product_error');
  uploadImageSuccess: string = localStorage.getItem('upload_image_success');
  uploadImageError: string = localStorage.getItem('upload_image_error');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private productService: ProductService,
    private logger: LoggerService
  ) {
    this.productForm = this.formBuilder.group({
      productId: [
        '',
        [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z0-9 ,.-]*$')],
      ],
      productName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ,.-]*$')],
      ],
      image: ['', [Validators.required, Validators.minLength(5)]],
      price: [0, [Validators.required, Validators.minLength(1)]],
      stockAmount: ['', Validators.pattern('^[a-zA-Z0-9 ,.-]*$')],
      stockStatus: ['', Validators.pattern('^[a-zA-Z0-9 ,.-]*$')],
      sku: [
        '',
        [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z0-9 ,.-]*$')],
      ],
      brand: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ,.-]*$')],
      ],
      intro: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.imageUrl = this.productService.imageUrl;
  }

  get productId() {
    return this.productForm.get('productId').value;
  }

  get productName() {
    return this.productForm.get('productName').value;
  }

  get image() {
    if (this.isDefined(this.productImageFile)) {
      return this.productImageFile.name;
    } else {
      return this.productForm.get('image').value;
    }
  }

  get price() {
    return this.productForm.get('price').value;
  }

  get stockAmount() {
    return this.productForm.get('stockAmount').value;
  }

  get stockStatus() {
    return this.productForm.get('stockStatus').value;
  }

  get sku() {
    return this.productForm.get('sku').value;
  }

  get brand() {
    return this.productForm.get('brand').value;
  }

  get intro() {
    return this.productForm.get('intro').value;
  }

  get description() {
    return this.productForm.get('description').value;
  }

  get isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  isFieldValid(field: string, control: AbstractControl = this.productForm): boolean {
    return (
      (!control.get(field).valid && control.get(field).touched) ||
      (control.get(field).untouched && this.formSubmitAttempt)
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field),
    };
  }

  uploadImage(imageInput: any) {
    const imageFile: File = imageInput.files[0];
    const fileName: string = imageFile.name.split('?')[0].split('.').shift();
    const extention: string = imageFile.name.split('?')[0].split('.').pop();
    const timeStamp: number = new Date().getTime();
    const fullFileName: string = `${fileName}_${timeStamp}.${extention}`;
    const reader: FileReader = new FileReader();

    this.productImageFile = new File([new Blob([imageFile])], fullFileName);

    reader.addEventListener('load', (event: any) => {
      this.logger.log(`Event result: ${event.target.result}`);
      this.logger.log(`Image file: ${this.productImageFile.name}`);

      this.productService.uploadImage(this.productImageFile).subscribe((imageData) => {
        this.logger.log(imageData);
      });
    });

    reader.readAsDataURL(imageFile);
  }

  addProduct() {
    this.product = {
      product_id: this.productId,
      product_name: this.productName,
      image: this.image,
      price: this.price,
      stock_amount: this.stockAmount,
      stock_status: this.stockStatus,
      sku: this.sku,
      brand: this.brand,
      intro: this.intro,
      description: this.description,
      rating: 5,
    };

    this.logger.log(this.product);
    this.productService.addProduct(this.product).subscribe((product) => {
      this.addProductError = localStorage.getItem('add_product_error');

      if (this.addProductError != undefined) {
        window.location.reload();
      } else {
        this.router.navigateByUrl('/product-add');
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.productForm.valid) {
      this.logger.log(this.productForm.value);
      this.addProduct();
    } else {
      this.validateAllFormFields(this.productForm);
    }
  }

  isDefined(data: string | object | undefined | null): boolean {
    if (data != undefined && data != null && data != 'null' && data != '' && data != {}) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {}
}
