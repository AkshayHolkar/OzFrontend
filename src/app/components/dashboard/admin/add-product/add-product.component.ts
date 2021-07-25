import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
    sizeArray: new FormArray([]),
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
    productQuantity: 0
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

  editProduct: IProduct = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    status: false,
    categoryId: 0,
    sizeNotApplicable: false,
    colorNotApplicable: false
  };

  editProductSize: IProductSize[] = [];
  isEditMode = false;
  editProductColors: IColor[] = [];


  constructor(private categoryService: CategoryService, private sizeService: SizeService, private productService: ProductService, private colorService: ColorService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.getEditProduct();
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

    if (this.isEditMode) {
      this.product.id = this.editProduct.id;

      if (!this.editProduct.colorNotApplicable) {
        this.removeProductColors();
      }

      if (!this.editProduct.sizeNotApplicable) {
        this.removeProductSizes();
      }

      this.productService.updateProduct(this.editProduct.id || 0, this.product).subscribe(
        res => {
          if (!this.product.sizeNotApplicable) {
            this.addProductSize(this.product.id || 0);
          }
          if (!this.product.colorNotApplicable) {
            this.addProductColor(this.product.id || 0);
          }
          this.router.navigate(['user/editImages', this.product.id]);
        },
        error => {
          if (error.status == 400) {
            this.isFail = true;
          } else {
            console.log(error);
          }
        }
      );

    } else {
      this.productService.addProduct(this.product).subscribe(
        (res: any) => {
          this.product = res;
          if (!this.product.sizeNotApplicable) {
            this.addProductSize(this.product.id || 0);
          }
          if (!this.product.colorNotApplicable) {
            this.addProductColor(this.product.id || 0);
          }

          this.router.navigate(['user/addImages', this.product.id]);
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
  }

  addProductSize(id: number) {
    const selectedSizes: [] = this.productForm.controls.sizeArray.value;
    for (let size in selectedSizes) {
      this.productSize.productId = id;
      this.productSize.itemSize = selectedSizes[size];
      this.sizeService.addProductSize(this.productSize).subscribe(
        (sizes) => { },
        error => {
          console.log(error);
        }
      )
    }
  }

  removeProductSizes() {
    for (let size of this.editProductSize) {
      this.sizeService.deleteProductSize(size.id || 0).subscribe(
        success => { },
        error => {
          console.log(error);
        }
      )
    }
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

  removeProductColors() {
    for (let color of this.editProductColors) {
      this.colorService.deleteColor(color.id || 0).subscribe(
        success => { },
        error => {
          console.log(error);
        }
      )
    }
  }

  onCheckboxChange(e: any) {
    const sizeArray: FormArray = this.productForm.get('sizeArray') as FormArray;

    if (e.target.checked) {
      sizeArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      sizeArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          sizeArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.productForm.value);
  }

  // Edit product section

  getEditProduct() {
    var data: any = this.location.getState();
    this.editProduct = data;
    if (this.editProduct.id != undefined) {
      this.isEditMode = true;
      this.productForm.controls.name.setValue(this.editProduct.name);
      this.productForm.controls.price.setValue(this.editProduct.price);
      this.productForm.controls.quantity.setValue(this.editProduct.quantity);
      this.productForm.controls.description.setValue(this.editProduct.description);
      this.productForm.controls.status.setValue(this.editProduct.status);
      this.productForm.controls.categoryId.setValue(this.editProduct.categoryId);
      this.productForm.controls.sizeNotApplicable.setValue(this.editProduct.sizeNotApplicable);
      this.productForm.controls.ColorNotApplicable.setValue(this.editProduct.colorNotApplicable);

      if (!this.editProduct.sizeNotApplicable) {
        this.setEditProductSizes(this.editProduct.id || 0);
      }
      if (!this.editProduct.colorNotApplicable)
        this.setEditProductColors(this.editProduct.id || 0);
    }
  }

  setEditProductSizes(productId: number) {
    this.sizeService.getProductSizes(productId).subscribe(
      result => {
        this.editProductSize = result;
        this.setSizeArray();
      },
      error => {
        console.error(error);
      }
    );
  }

  setSizeArray() {
    const sizeArray: FormArray = this.productForm.get('sizeArray') as FormArray;

    for (let size of this.editProductSize) {
      sizeArray.push(new FormControl(size.itemSize));
    }
  }

  setEditProductColors(productId: number) {
    this.colorService.getColors(productId).subscribe(
      result => {
        this.editProductColors = result;
        this.setColors();
      },
      error => {
        console.error(error);
      }
    );
  }

  setColors() {
    let i: number = 1;
    for (let color of this.editProductColors) {

      if (i == 1) {
        this.productForm.controls.colorQ1.setValue(color.productQuantity);
        this.productForm.controls.addC1.setValue(true);
        this.color1 = color.color;
      }
      if (i == 2) {
        this.productForm.controls.colorQ2.setValue(color.productQuantity);
        this.productForm.controls.addC2.setValue(true);
        this.color2 = color.color;
      } if (i == 3) {
        this.productForm.controls.colorQ3.setValue(color.productQuantity);
        this.productForm.controls.addC3.setValue(true);
        this.color3 = color.color;
      }
      i++;
    }
  }

  setSizeChecks(productSize: string) {
    const sizes = this.productForm.controls.sizeArray.value;
    for (let size of sizes) {
      if (size == productSize) {
        return true;
      }
    }
    return false;
  }
}
