import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  customerId = '';

  constructor(private orderService: OrderService, private router: Router, private dataSharingService: DataSharingService, private orderStatusService: OrderStatusService, private route: ActivatedRoute) {
    this.dataSharingService.isUserAdmin.subscribe(value => {
      this.isAdmin = value;
    })
  }

  ngOnInit(): void {
    this.getCustomerId();
    this.getOrders();
    if (this.isAdmin)
      this.getOrderStatus();
  }

  getCustomerId() {
    this.route.params.subscribe(
      (params) => {
        this.customerId = params['customerId'];
      });
  }

  getOrders() {
    if (this.customerId == undefined) {
      this.orderService.getOrders().subscribe(
        result => {
          this.orders = result;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.orderService.getCustomerOrders(this.customerId).subscribe(
        result => {
          this.orders = result;
        },
        error => {
          console.log(error);
        }
      );
    }
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
