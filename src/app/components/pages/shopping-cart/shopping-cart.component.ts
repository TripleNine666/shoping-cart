import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../interfaces/CartItem";
import {CartService} from "../../../services/cart.service";
import { MessageService } from 'primeng/api';
import {SHIPPING_COST, PROMO_CODES} from "../../../static-data";
import {OrderService} from "../../../services/order.service";
import {AuthService} from "../../../services/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService,
              private messageService: MessageService,
              private orderService: OrderService,
              private authService: AuthService,
              private translate: TranslateService,
  ) {
  }
  productsInCart: CartItem[] = [];


  // dialog is visible
  dialogVisible = false;

  totalPrice = 0;
  selectedItem = 0;

  shippingCost: number = SHIPPING_COST;
  promoCodes = PROMO_CODES;

  enteredPromoCode: string = '';

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.productsInCart = items;
    })
    this.cartService.totalPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.cartService.selectedItem$.subscribe(selectedItem => this.selectedItem = selectedItem);
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
  }

  checkPromoCode() {
    let promoCode = this.promoCodes.find(code => code.code === this.enteredPromoCode);

    if (!promoCode) {
      this.messageService.add({ severity: 'error',
        summary: this.translate.instant('messages.error.error'),
        detail: this.translate.instant('messages.error.promo-code.detail')})
      return;
    }
    switch (promoCode.type) {
      case 'delivery':
        this.shippingCost = promoCode.value;
        this.messageService.add({ severity: 'success',
          summary: this.translate.instant('messages.success.promo-code.delivery.summary'),
          detail: this.translate.instant('messages.success.promo-code.detail')})
        break;
      case 'discount':
        this.cartService.applyPromoCode(promoCode.value)
        this.messageService.add({ severity: 'success',
          summary: this.translate.instant('messages.success.promo-code.discount.summary'),
          detail: this.translate.instant('messages.success.promo-code.detail')})
    }
  }

  confirmOrder() {
    const selectedItems = this.productsInCart.filter(product => product.isSelected === true)
    if (this.authService.isAuth()){
      this.orderService.addOrder(selectedItems, this.shippingCost, this.totalPrice).subscribe(() => {
        this.messageService.add({ severity: 'success',
          summary: this.translate.instant('messages.success.phone.order'),
          detail: this.translate.instant('messages.success.phone.detail'),
        })
        this.cartService.clearCart();
      })
    } else {
      this.dialogVisible = true;
    }
  }

  onLoginSuccess() {
    this.dialogVisible = false;
  }
}
