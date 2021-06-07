import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
