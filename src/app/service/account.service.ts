import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  readonly baseURI = "https://ozdistributionapi.azurewebsites.net/api/v1";

  getaccount(): Observable<IAccount> {
    return this.http.get<IAccount>(this.baseURI + "/Accounts");
  }

  getAllAccounts(unused: boolean): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.baseURI + "/Accounts/" + unused + "/" + unused);
  }

  getCustomerAccount(id: string): Observable<IAccount> {
    return this.http.get<IAccount>(this.baseURI + "/Accounts/" + id);
  }

  addAccount(formData: any) {
    return this.http.post(this.baseURI + '/Accounts', formData);
  }

  updateAccount(id: string, formData: any) {
    return this.http.put(this.baseURI + '/Accounts/' + id, formData);
  }
}
