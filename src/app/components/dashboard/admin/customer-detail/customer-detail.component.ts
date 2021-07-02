import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/account';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerDetail: IAccount = {
    userId: '',
    contactName: '',
    businessName: '',
    abn: 0,
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postcode: 0,
    country: 'Australia'
  };

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.getAccountDetail();
  }

  getAccountDetail() {
    var data: any = this.location.getState();
    this.customerDetail = data;
  }

  backClicked() {
    this.location.back();
  }
}
