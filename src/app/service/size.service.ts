import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductSize } from '../models/productSize';
import { ISize } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://localhost:5001/api/v1";

  getSizes(): Observable<ISize[]> {
    return this.http.get<ISize[]>(this.baseURI + "/Sizes");
  }

  addProductSize(formData: any) {
    return this.http.post(this.baseURI + '/ProductSizes', formData);
  }

  getProductSizes(productId: number): Observable<IProductSize[]> {
    return this.http.get<IProductSize[]>(this.baseURI + "/ProductSizes?productId=" + productId);
  }

}
