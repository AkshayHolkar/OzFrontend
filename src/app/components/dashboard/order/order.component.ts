import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: IOrder[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
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

  orderDetail(id: number) {

    this.router.navigate(['user/orderDetail', id]);
  }
}
