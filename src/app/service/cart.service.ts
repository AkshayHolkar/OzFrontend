import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://localhost:5001/api/v1";

  getcarts(): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.baseURI + "/Carts");
  }

  addCart(formData: any) {
    return this.http.post(this.baseURI + '/Carts', formData);
  }

  updateCart(id: number, formData: any) {
    return this.http.put(this.baseURI + '/Carts/' + id, formData);
  }

  deleteCart(id: number) {
    return this.http.delete(this.baseURI + '/Carts/' + id);
  }
}
