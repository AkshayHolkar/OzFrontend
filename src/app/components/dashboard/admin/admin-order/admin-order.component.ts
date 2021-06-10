import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { IOrderStatus } from 'src/app/models/orderStatus';
import { OrderStatusService } from 'src/app/service/order-status.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  isSuccess = false;
  orders: IOrder[] = [];
  orderStatus: IOrderStatus[] = [];
  selectedOption = '';

  constructor(private orderService: OrderService, private orderStatusService: OrderStatusService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
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

  onSubmit(order: IOrder) {
    order.orderStatus = this.selectedOption;
    console.log(order);
    this.orderService.updateOrder(order.id || 0, order).subscribe(
      result => {
        window.location.reload();
        this.isSuccess = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  orderDetail(id: number) {
    this.router.navigate(['admin/orderDetail', id]);
  }
}
