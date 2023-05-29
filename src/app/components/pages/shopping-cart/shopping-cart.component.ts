import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../interfaces/CartItem";
import {CartService} from "./cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService) {
  }
  productsInCart: CartItem[] = [];

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.productsInCart = items;
    })
  }

  onCountChange(item: CartItem, value: number) {
    console.log('Родитель: ' + value)
    item.count = value;
    this.cartService.updateCart();
  }

  deleteCartItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }
}
