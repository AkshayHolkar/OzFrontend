import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetail } from 'src/app/models/orderDetail';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderId = 0;
  total = 0;
  orderDetail: IOrderDetail[] = [];

  constructor(private orderDetailService: OrderDetailService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail() {

    this.route.params.subscribe(
      (params) => {
        this.orderId = params['id'];
      });

    this.orderDetailService.getOrderDetail(this.orderId).subscribe(
      result => {
        this.orderDetail = result;
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

  backClicked() {
    this._location.back();
  }
}
