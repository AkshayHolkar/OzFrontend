import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent implements OnInit {

  products: IProduct[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      err => {
        console.log(err);
      }
    );
  }
}
