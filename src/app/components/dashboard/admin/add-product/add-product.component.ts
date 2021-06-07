import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category';
import { ISize } from 'src/app/models/size';
import { CategoryService } from 'src/app/service/category.service';
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
    categoryId: new FormControl(''),
    sizeNotApplicable: new FormControl(false),
    ColorNotApplicable: new FormControl(false),
    size: new FormControl(''),
    addC1: new FormControl(false),
    color1: new FormControl(''),
    addC2: new FormControl(false),
    color2: new FormControl(''),
    addC3: new FormControl(false),
    color3: new FormControl('')
  });

  color: string = '';
  categories: ICategory[] = [];
  sizes: ISize[] = [];

  constructor(private categoryService: CategoryService, private sizeService: SizeService) { }

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

  onSubmit() { }

}
