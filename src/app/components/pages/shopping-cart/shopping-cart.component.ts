import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../interfaces/CartItem";
import {CartService} from "./cart.service";
import { MessageService } from 'primeng/api';
import {SHIPPING_COST, PROMO_CODES} from "../../../static-data";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService, private messageService: MessageService) {
  }
  productsInCart: CartItem[] = [];

  totalPrice = 0;
  selectedItem = 0;

  // Discount in %
  discount = 0;

  shippingCost: number = SHIPPING_COST;
  promoCodes = PROMO_CODES;

  enteredPromoCode: string = '';

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
    this.totalPrice = this.totalPrice - this.discount / 100 * this.totalPrice;
  }

  checkPromoCode() {
    let promoCode = this.promoCodes.find(code => code.code === this.enteredPromoCode);

    if (!promoCode) {
      this.messageService.add({ severity: 'error',
        summary: 'Error',
        detail: `The entered Promo Code: "${this.enteredPromoCode}" is incorrect!`})
      return;
    }
    switch (promoCode.type) {
      case 'delivery':
        this.shippingCost = promoCode.value;
        this.messageService.add({ severity: 'success',
          summary: 'Free Shipping',
          detail: `The entered Promo Code: "${this.enteredPromoCode}" is activate!`})
        break;
      case 'discount':
        this.discount = promoCode.value;
        this.calculateTotal();
        this.messageService.add({ severity: 'success',
          summary: 'Discount activate',
          detail: `The entered Promo Code: "${this.enteredPromoCode}" is activate! \n
          You now have a ${promoCode.value} discount %`})
    }
  }

  confirmOrder() {
    this.messageService.add({ severity: 'success',
      summary: 'Your order received!',
      detail: "Please wait for confirmation by phone",
    })
    this.cartService.clearCart();
    this.discount = 0;
  }
}
