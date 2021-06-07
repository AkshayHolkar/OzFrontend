import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IColor } from 'src/app/models/color';
import { IProduct } from 'src/app/models/product';
import { IProductSize } from 'src/app/models/productSize';
import { ISize } from 'src/app/models/size';
import { CategoryService } from 'src/app/service/category.service';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';
import { SizeService } from 'src/app/service/size.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(true),
    categoryId: new FormControl(0),
    sizeNotApplicable: new FormControl(false),
    ColorNotApplicable: new FormControl(false),
    size: new FormControl(''),
    addC1: new FormControl(false),
    colorQ1: new FormControl(''),
    addC2: new FormControl(false),
    colorQ2: new FormControl(''),
    addC3: new FormControl(false),
    colorQ3: new FormControl('')
  });

  color1: string = '';
  color2: string = '';
  color3: string = '';

  categories: ICategory[] = [];
  sizes: ISize[] = [];
  isFail = false;
  productSize: IProductSize = {
    productId: 0,
    itemSize: 's'
  };

  productColor: IColor = {
    productId: 0,
    color: '',
    productQuantity: 0,
    product: null
  };

  product: IProduct = {
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    status: false,
    categoryId: 0,
    sizeNotApplicable: false,
    colorNotApplicable: false
  };


  constructor(private categoryService: CategoryService, private sizeService: SizeService, private productService: ProductService, private colorService: ColorService, private router: Router) { }

  ngOnInit(): void {
    this.getCategory();
    this.getSize();
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      error => {
        console.log(error);
      }
    )
  }

  getSize() {
    this.sizeService.getSizes().subscribe(
      (sizes) => {
        this.sizes = sizes;
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    this.product.name = this.productForm.controls.name.value;
    this.product.price = this.productForm.controls.price.value;
    this.product.quantity = this.productForm.controls.quantity.value;
    this.product.description = this.productForm.controls.description.value;
    this.product.status = this.productForm.controls.status.value;
    this.product.categoryId = parseInt(this.productForm.controls.categoryId.value);
    this.product.sizeNotApplicable = this.productForm.controls.sizeNotApplicable.value;
    this.product.colorNotApplicable = this.productForm.controls.ColorNotApplicable.value;
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe(
      (res: any) => {
        this.product = res;
        if (!this.product.sizeNotApplicable) {
          this.addProductSize(this.product.id || 0);
        }
        if (!this.product.colorNotApplicable) {
          this.addProductColor(this.product.id || 0);
        }

        this.router.navigateByUrl("products");
      },
      err => {
        if (err.status == 400) {
          this.isFail = true;
        } else {
          console.log(err);
        }
      }
    );
  }

  addProductSize(id: number) {

    this.productSize.productId = id;
    this.productSize.itemSize = this.productForm.controls.size.value;
    this.sizeService.addProductSize(this.productSize).subscribe(
      (sizes) => { },
      error => {
        console.log(error);
      }
    )
  }

  addProductColor(id: number) {

    this.productColor.productId = id;
    if (this.productForm.controls.addC1.value) {
      this.productColor.color = this.color1;
      this.productColor.productQuantity = this.productForm.controls.colorQ1.value;
      console.log(this.productColor);
      this.colorService.addColor(this.productColor).subscribe(
        (color) => { },
        error => {
          console.log(error);
        }
      )
    }

    if (this.productForm.controls.addC2.value) {
      this.productColor.color = this.color2;
      this.productColor.productQuantity = this.productForm.controls.colorQ2.value;
      console.log(this.productColor);
      this.colorService.addColor(this.productColor).subscribe(
        (color) => { },
        error => {
          console.log(error);
        }
      )
    }

    if (this.productForm.controls.addC3.value) {
      this.productColor.color = this.color3;
      this.productColor.productQuantity = this.productForm.controls.colorQ3.value;
      this.colorService.addColor(this.productColor).subscribe(
        (color) => { },
        error => {
          console.log(error);
        }
      )
    }
  }
}
