import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICart } from 'src/app/models/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {

  @Input() cart: ICart = {
    id: 0,
    productId: 0,
    productName: '',
    color: '',
    size: '',
    quantity: 0,
    maxLimit: 0,
    price: 0
  };

  cartForm = new FormGroup({
    quantity: new FormControl()
  });

  isSuccess = false;
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartForm.controls.quantity.setValue(this.cart.quantity);
    this.total = this.cart.quantity * this.cart.price;
  }

  onSubmit() {
    this.cart.quantity = this.cartForm.controls.quantity.value;

    this.cartService.updateCart(this.cart.id || 0, this.cart).subscribe(
      result => {
        window.location.reload();
        this.isSuccess = true;
      },
      error => {
        console.log(error);
      }
    )
  }

  remove() {
    this.cartService.deleteCart(this.cart.id || 0).subscribe(
      result => {
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }
}
