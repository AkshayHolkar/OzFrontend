import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://localhost:5001/api";

  login(formData: any) {
    return this.http.post(this.baseURI + '/Identity/Login', formData);
  }
}
