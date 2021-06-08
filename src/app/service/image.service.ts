import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IImage } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://localhost:5001/api/v1";

  getImages(productId: number): Observable<IImage[]> {
    return this.http.get<IImage[]>(this.baseURI + "/Images?productId=" + productId);
  }

  addImage(formData: any) {
    return this.http.post(this.baseURI + '/Images', formData);
  }

  deleteImage(id: number) {
    return this.http.delete(this.baseURI + '/Images/' + id);
  }
}
