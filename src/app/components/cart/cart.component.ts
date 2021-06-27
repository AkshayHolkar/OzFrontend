import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from 'src/app/models/cart';
import { IOrder } from 'src/app/models/order';
import { IOrderDetail } from 'src/app/models/orderDetail';
import { CartService } from 'src/app/service/cart.service';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: ICart[] = [];
  total: number = 0;

  newOrder: IOrder = {
    dateCreation: new Date()
  }

  newOrderDetail: IOrderDetail = {
    orderId: 0,
    productId: 0,
    productName: '',
    quantity: 0,
    totalPrice: 0
  }

  constructor(private cartService: CartService, private orderService: OrderService, private orderDetailService: OrderDetailService, private router: Router) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.cartService.getcarts().subscribe(
      (result) => {
        this.carts = result;
        this.getTotal();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTotal() {
    this.total = 0;
    for (let cart of this.carts) {
      this.total += cart.price * cart.quantity;
    }
  }

  order() {
    this.orderService.addOrder(this.newOrder).subscribe(
      (result: any) => {
        this.addOrderDetail(result.id);
        this.router.navigate(["user/success"]);
      },
      error => {

      }
    );
  }

  addOrderDetail(id: number) {

    for (let cart of this.carts) {
      this.newOrderDetail.orderId = id;
      this.newOrderDetail.productId = cart.productId;
      this.newOrderDetail.productName = cart.productName;
      this.newOrderDetail.color = cart.color;
      this.newOrderDetail.size = cart.size;
      this.newOrderDetail.quantity = cart.quantity;
      this.newOrderDetail.totalPrice = cart.quantity * cart.price;

      this.orderDetailService.addOrderDetail(this.newOrderDetail).subscribe(
        result => {
          this.removeCart(cart.id || 0);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  removeCart(id: number) {
    this.cartService.deleteCart(id).subscribe(
      result => { },
      error => {
        console.log(error);
      }
    )
  }

  update() {
    this.ngOnInit();
  }
}
