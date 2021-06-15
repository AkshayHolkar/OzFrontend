import { Component, Input, OnInit } from '@angular/core';
import { IImage } from 'src/app/models/image';
import { IProduct } from 'src/app/models/product';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: IProduct = {
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    status: false,
    categoryId: 0,
    sizeNotApplicable: false,
    colorNotApplicable: false
  };

  url = '';

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getFetureImage();
  }

  getFetureImage() {
    this.imageService.getFetureImage(this.product.id || 0).subscribe(
      (result: IImage) => {
        console.log(result);
        this.url = result.imageScr || '';
      },
      error => {
        console.log(error);
      }
    );
  }
}
