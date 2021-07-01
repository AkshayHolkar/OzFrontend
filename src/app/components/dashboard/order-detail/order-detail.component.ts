import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { Location } from '@angular/common';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { AccountService } from 'src/app/service/account.service';
import { IAccount } from 'src/app/models/account';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderId = 0;
  total = 0;
  orderDetail: IOrderDetail[] = [];
  isAdmin = false;
  customerId = '';
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

  constructor(private orderDetailService: OrderDetailService, private route: ActivatedRoute, private _location: Location, private dataSharingService: DataSharingService, private accountService: AccountService) {
    this.dataSharingService.isUserAdmin.subscribe(value => {
      this.isAdmin = value;
    })
  }

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
        this.getTotal();
        if (this.isAdmin)
          this.getCustomerDetail();
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

  getCustomerDetail() {
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
