import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product-list',
  templateUrl: './edit-product-list.component.html',
  styleUrls: ['./edit-product-list.component.scss']
})
export class EditProductListComponent implements OnInit {

  products: IProduct[] = [];
  isSuccess = false;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      result => {
        this.products = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  productDetail(id: number) {
    this.router.navigate(['product', id]);
  }

  onSubmit(id: number) {
    this.productService.removeProduct(id).subscribe(
      result => {
        this.isSuccess = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  editProduct(product: IProduct) {
    this.router.navigateByUrl('user/editProduct', { state: product });
  }
}
