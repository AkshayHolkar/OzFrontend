import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://ozdistributionapi.azurewebsites.net/api/v1";

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURI + "/Products");
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseURI + "/Products/" + id);
  }

  addProduct(formData: any) {
    return this.http.post(this.baseURI + '/Products', formData);
  }

  updateProduct(id: number, formData: any) {
    return this.http.put(this.baseURI + '/Products/' + id, formData);
  }

  removeProduct(id: number) {
    return this.http.delete(this.baseURI + '/Products/' + id);
  }
}
