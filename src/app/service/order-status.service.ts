import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderStatus } from '../models/orderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://ozdistributionapi.azurewebsites.net/api/v1";

  getOrderStatus(): Observable<IOrderStatus[]> {
    return this.http.get<IOrderStatus[]>(this.baseURI + "/OrderStatuses");
  }
}
