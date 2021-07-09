import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://ozdistributionapi.azurewebsites.net/api";

  register(formData: any) {
    var body = {
      Email: formData.Email,
      Password: formData.Passwords.Password
    };
    return this.http.post(this.baseURI + '/Identity/Register', body);
  }

  login(formData: any) {
    return this.http.post(this.baseURI + '/Identity/Login', formData);
  }

  approve(userId: string) {
    let formData: FormData = new FormData();
    formData.append('userId', userId);
    return this.http.post(this.baseURI + '/Identity/Approve', formData);
  }

  refresh(formData: any) {
    return this.http.post(this.baseURI + '/Identity/Refresh', formData);
  }
}
