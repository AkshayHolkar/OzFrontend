import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IImage } from 'src/app/models/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {

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

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.productId = params['id'];
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
