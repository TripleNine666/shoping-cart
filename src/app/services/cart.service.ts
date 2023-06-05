import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartItem} from "../interfaces/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() { }

  addToCart(item: CartItem) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.product.id === item.product.id);
    if (existingItem) {
      existingItem.count += item.count;
    } else {
      currentItems.push(item);
    }
    this.cartItems.next(currentItems);
  }

  updateCart() {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems);
  }

  removeFromCart(item: CartItem) {
    const currentItems = this.cartItems.getValue();
    const index = currentItems.indexOf(item);
    if (index > -1) {
      currentItems.splice(index, 1);
      this.cartItems.next(currentItems);
    }
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
