import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://localhost:5001/api/v1";

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseURI + "/Orders");
  }

  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(this.baseURI + "/Orders" + id);
  }

  addOrder(formData: any) {
    return this.http.post(this.baseURI + '/Orders', formData);
  }

  updateOrder(id: number, formData: any) {
    return this.http.put(this.baseURI + '/Orders/' + id, formData);
  }
}
