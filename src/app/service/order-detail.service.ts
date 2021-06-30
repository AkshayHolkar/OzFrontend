import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderDetail } from '../models/orderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://ozdistributionapi.azurewebsites.net/api/v1";

  getOrderDetail(orderId: number): Observable<IOrderDetail[]> {
    return this.http.get<IOrderDetail[]>(this.baseURI + "/OrderDetails?orderId=" + orderId);
  }

  addOrderDetail(formData: any) {
    return this.http.post(this.baseURI + '/OrderDetails', formData);
  }
}
