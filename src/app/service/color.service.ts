import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColor } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://ozdistributionapi.azurewebsites.net/api/v1";

  getColors(productId: number): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.baseURI + "/Colours?productId=" + productId);
  }

  addColor(formData: any) {
    return this.http.post(this.baseURI + '/Colours', formData);
  }

  updateColor(id: number, formData: any) {
    return this.http.put(this.baseURI + '/Colours/' + id, formData);
  }

  deleteColor(id: number) {
    return this.http.delete(this.baseURI + '/Colours/' + id);
  }
}
