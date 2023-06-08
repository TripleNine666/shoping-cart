import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {CartItem} from "../interfaces/CartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  public totalPrice$ = this.totalPrice.asObservable();

  private promoCode = new BehaviorSubject<number | null>(null);
  // public promoCode$ = this.promoCode.asObservable();

  private selectedItem = new BehaviorSubject<number>(0);
  public selectedItem$ = this.selectedItem.asObservable();

  constructor() { }



  updateSelectedItem() {
    const currentItems = this.cartItems.getValue();
    let count = 0;
    for (let item of currentItems) {
      if (item.isSelected) {
        count++;
      }
    }
    this.selectedItem.next(count);
  }


  addToCart(item: CartItem) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(i => i.product.id === item.product.id);
    if (existingItem) {
      existingItem.count += item.count;
    } else {
      currentItems.push(item);
    }
    this.cartItems.next(currentItems);
    this.updateTotalPrice();
    this.updateSelectedItem();
  }

  updateCart() {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems);
    this.updateTotalPrice();
    this.updateSelectedItem();
  }

  removeFromCart(item: CartItem) {
    const currentItems = this.cartItems.getValue();
    const index = currentItems.indexOf(item);
    if (index > -1) {
      currentItems.splice(index, 1);
      this.cartItems.next(currentItems);
      this.updateTotalPrice();
      this.updateSelectedItem();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    this.promoCode.next(null);
    this.updateTotalPrice();
  }

  applyPromoCode(discount: number) {
    // обновляем значение BehaviorSubject с процентом скидки
    this.promoCode.next(discount);
    // обновляем totalPrice
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const currentItems = this.cartItems.getValue();
    const currentPromoCode = this.promoCode.getValue();
    let sum = 0;
    for (let item of currentItems) {
      if (item.isSelected) { // добавляем это условие
        sum += item.product.price * item.count;
      }
    }
    // учитываем процент скидки при подсчете суммы
    if (currentPromoCode) {
      sum = sum * (1 - currentPromoCode / 100);
    }
    this.totalPrice.next(sum);
  }

}
