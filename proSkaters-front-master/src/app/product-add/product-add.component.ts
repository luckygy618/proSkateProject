import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Product } from '../Product';
import { ProductService } from '../product.service';

import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productList: Product[] = [];
  product: Product;
  productImageFile: File;
  productForm: FormGroup;
  readonly imageUrl: string;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private logger: LoggerService) {
    this.productForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: [0, [Validators.required]],
      stock_amount: [''],
      stock_status: [''],
      sku: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      intro: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.imageUrl = this.productService.imageUrl;
  }

  get id() {
    return this.productForm.get('id').value;
  }

  get name() {
    return this.productForm.get('name').value;
  }

  get image() {
    return this.productImageFile.name;
  }

  get price() {
    return this.productForm.get('price').value;
  }

  get stock_amount() {
    return this.productForm.get('stock_amount').value;
  }

  get stock_status() {
    return this.productForm.get('stock_status').value;
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

  isFieldValid(field: string) {
    return !this.productForm.get(field).valid && this.productForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  uploadImage(imageInput: any) {
    const imageFile: File = imageInput.files[0];
    const fileName: string = imageFile.name.split('?')[0].split('.').shift();
    const extention: string = imageFile.name.split('?')[0].split('.').pop();
    const timeStamp: number = (new Date()).getTime();
    const fullFileName: string = `${fileName}_${timeStamp}.${extention}`;
    const reader: FileReader = new FileReader();

    this.productImageFile = new File([new Blob([imageFile])], fullFileName);

    reader.addEventListener('load', (event: any) => {
      this.logger.log(`Event result: ${event.target.result}`);
      this.logger.log(`Image file: ${this.productImageFile.name}`);

      this.productService.uploadImage(this.productImageFile).subscribe(imageData => {
        this.logger.log(imageData);
      });
    });

    reader.readAsDataURL(imageFile);
  }

  addProduct() {
    this.product = {
      product_id: this.id,
      product_name: this.name,
      image: this.image,
      price: this.price,
      stock_amount: this.stock_amount,
      stock_status: this.stock_status,
      sku: this.sku,
      brand: this.brand,
      intro: this.intro,
      description: this.description,
      rating: null
    };

    this.logger.log(this.product);
    this.productService.addProduct(this.product).subscribe(product => {
      this.productList.push(product);
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if(this.productForm.valid) {
      this.logger.log(this.productForm.value);
      this.addProduct();
    } else {
      this.validateAllFormFields(this.productForm);
    }
  }

  ngOnInit(): void {
  }
}
