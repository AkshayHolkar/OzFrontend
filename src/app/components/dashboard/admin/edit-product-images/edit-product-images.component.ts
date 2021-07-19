import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IImage } from 'src/app/models/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-edit-product-images',
  templateUrl: './edit-product-images.component.html',
  styleUrls: ['./edit-product-images.component.scss']
})
export class EditProductImagesComponent implements OnInit {

  imageForm = new FormGroup({
    file: new FormControl('', Validators.required),
    main: new FormControl(false),
    fileSource: new FormControl('', Validators.required)
  });

  imagePath: string = '';
  url: any;
  isFail = false;
  isSuccess = false;
  productId = '';
  images: IImage[] = [];
  editImage: IImage = {
    id: 0,
    name: '',
    main: false,
    productId: 0
  }

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.productId = params['id'];
      }
    );
    this.getProductImages();
  }

  getProductImages() {
    this.imageService.getImages(Number(this.productId)).subscribe(
      result => {
        this.images = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteImage(id: number) {
    this.imageService.deleteImage(id).subscribe(
      success => {
        this.ngOnInit();
      },
      error => {
        this.isFail = true;
        console.log(error);
      }
    );
  }

  ChangeMainImage(image: IImage) {
    this.editImage = image;
    if (this.images.find(i => i.main == true)) {
      let currentMainImage = this.images.find(i => i.main == true) || this.editImage;
      currentMainImage.main = false;
      this.editImage.main = true;
      this.updateImage(currentMainImage);
      this.updateImage(this.editImage);
    } else {
      this.editImage.main = true;
      this.updateImage(this.editImage);
    }
    this.ngOnInit();
  }

  updateImage(image: IImage) {
    this.imageService.updateImage(image.id || 0, image).subscribe(
      success => {
      },
      error => {
        this.isFail = true;
        console.log(error);
      }
    );
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
    }
    this.isSuccess = false;

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    const thisfile = <File>event.target.files[0];

    this.imageForm.patchValue({
      fileSource: thisfile
    })
  }

  onSubmit() {
    const imageFile: File = this.imageForm.get('fileSource')?.value;
    const main: boolean = this.imageForm.get('main')?.value;

    const form: FormData = new FormData();
    form.append('imageFile', imageFile);
    form.append('productId', this.productId);
    form.append('main', String(main));

    this.imageService.addImage(form).subscribe(
      (res: any) => {
        this.isSuccess = true;
        this.ngOnInit();
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
