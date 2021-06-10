import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { Location } from '@angular/common';
import { AccountService } from 'src/app/service/account.service';
import { IAccount } from 'src/app/models/account';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit {

  orderId = 0;
  total = 0;
  customerId = '';
  orderDetail: IOrderDetail[] = [];
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

  constructor(private orderDetailService: OrderDetailService, private accountService: AccountService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.route.params.subscribe(
      (params) => {
        this.orderId = params['id'];
        this.customerId = params['customerId'];
      });

    this.orderDetailService.getOrderDetail(this.orderId).subscribe(
      result => {
        this.orderDetail = result;
        this.getCustomerAccount();
        this.getTotal();
      },
      error => {
        console.log(error);
      }
    );
  }

  getTotal() {
    for (let o of this.orderDetail) {
      this.total += o.totalPrice;
    }
  }

  getCustomerAccount() {
    this.accountService.getCustomerAccount(this.customerId).subscribe(
      result => {
        this.customerDetail = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  backClicked() {
    this._location.back();
  }
}
