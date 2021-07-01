import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICart } from 'src/app/models/cart';
import { IColor } from 'src/app/models/color';
import { IImage } from 'src/app/models/image';
import { IProduct } from 'src/app/models/product';
import { IProductSize } from 'src/app/models/productSize';
import { CartService } from 'src/app/service/cart.service';
import { ColorService } from 'src/app/service/color.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { ImageService } from 'src/app/service/image.service';
import { ProductService } from 'src/app/service/product.service';
import { SizeService } from 'src/app/service/size.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetailForm = new FormGroup({
    size: new FormControl(''),
    color: new FormControl(''),
    quantity: new FormControl(1)
  });

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

  cart: ICart = {
    productId: 0,
    productName: '',
    color: '',
    size: '',
    quantity: 0,
    maxLimit: 0,
    price: 0
  };

  productSize: IProductSize[] = [];
  productColor: IColor[] = [];
  images: IImage[] = [];
  isSuccess = false;
  url = '';
  productId: number = 0;
  isLogin: boolean = false;
  isApproved: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private colorService: ColorService, private sizeService: SizeService, private cartService: CartService, private imageService: ImageService, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isLogin = value;
    });
    this.dataSharingService.isUserApproved.subscribe(value => {
      this.isApproved = value;
    });
  }

  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    this.route.params.subscribe(
      (params) => {
        this.productId = params['id'];
      });

    this.productService.getProduct(this.productId).subscribe(
      result => {
        this.product = result;
        this.getImages();

        if (!this.product.colorNotApplicable) {
          this.getProductColors();
        }
        if (!this.product.sizeNotApplicable) {
          this.getProductSize();
        }
      }
    )
  }

  getProductColors() {
    this.colorService.getColors(this.productId).subscribe(
      result => {
        this.productColor = result;
      },
      error => {
        console.log(error);
      }
    )
  }

  getProductSize() {
    this.sizeService.getProductSizes(this.productId).subscribe(
      result => {
        this.productSize = result;
      },
      error => {
        console.log(error);
      }
    )
  }

  getImages() {
    this.imageService.getImages(this.productId).subscribe(
      result => {
        this.images = result;
        this.url = this.images.find(i => i.main == true)?.imageScr || '';
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.cart.productId = this.product.id || 0;
    this.cart.productName = this.product.name;
    this.cart.size = this.productDetailForm.controls.size.value;
    this.cart.color = this.productDetailForm.controls.color.value;
    this.cart.quantity = this.productDetailForm.controls.quantity.value;
    this.cart.maxLimit = this.product.quantity;
    this.cart.price = this.product.price;
    this.cart.imageUrl = this.images.find(i => i.main == true)?.imageScr || '';

    this.cartService.addCart(this.cart).subscribe(
      (result) => {
        this.isSuccess = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeImage(imageUrl: string) {
    this.url = imageUrl;
  }
}
