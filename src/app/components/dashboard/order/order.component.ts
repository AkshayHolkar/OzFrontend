import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { IOrderStatus } from 'src/app/models/orderStatus';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { OrderStatusService } from 'src/app/service/order-status.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: IOrder[] = [];
  isAdmin = false;
  isSuccess = false;
  orderStatus: IOrderStatus[] = [];
  selectedOption = '';

  constructor(private orderService: OrderService, private router: Router, private dataSharingService: DataSharingService, private orderStatusService: OrderStatusService) {
    this.dataSharingService.isUserAdmin.subscribe(value => {
      this.isAdmin = value;
    })
  }

  ngOnInit(): void {
    this.getOrders();
    if (this.isAdmin)
      this.getOrderStatus();
  }

  getOrders() {

    this.orderService.getOrders().subscribe(
      result => {
        this.orders = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  getOrderStatus() {
    this.orderStatusService.getOrderStatus().subscribe(
      result => {
        this.orderStatus = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  orderDetail(id: number, customerId: string) {

    this.router.navigate(['user/orderDetail', id, customerId]);
  }

  onSubmit(order: IOrder) {
    order.orderStatus = this.selectedOption;
    console.log(order);
    this.orderService.updateOrder(order.id || 0, order).subscribe(
      result => {
        this.ngOnInit();
        this.isSuccess = true;
      },
      error => {
        console.log(error);
      }
    );
  }
}
