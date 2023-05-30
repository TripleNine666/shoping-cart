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
  totalPrice = 0;
  selectedItem = 0;

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.productsInCart = items;
      this.calculateTotal();
    })
  }

  onCountChange(item: CartItem, value: number) {
    item.count = value;
    this.cartService.updateCart();
  }

  deleteCartItem(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }

  onSelectChange(item: CartItem, value: boolean) {
    item.isSelected = value;
    this.cartService.updateCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = 0;
    this.selectedItem = 0;
    for (let item of this.productsInCart) {
      if (item.isSelected) {
        this.totalPrice += item.product.price * item.count;
        this.selectedItem++;
      }
    }
  }
}
