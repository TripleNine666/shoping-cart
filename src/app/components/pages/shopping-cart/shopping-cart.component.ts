import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../interfaces/CartItem";
import {CartService} from "../../../services/cart.service";
import { MessageService } from 'primeng/api';
import {SHIPPING_COST, PROMO_CODES} from "../../../static-data";
import {OrderService} from "../../../services/order.service";
import {AuthService} from "../../../services/auth.service";

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
  ) {
  }
  productsInCart: CartItem[] = [];


  // dialog is visible
  dialogVisible = false;


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
    })
    this.cartService.totalPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
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
        this.cartService.applyPromoCode(promoCode.value)
        this.messageService.add({ severity: 'success',
          summary: 'Discount activate',
          detail: `The entered Promo Code: "${this.enteredPromoCode}" is activate! \n
          You now have a ${promoCode.value} discount %`})
    }
  }

  confirmOrder() {
    const selectedItems = this.productsInCart.filter(product => product.isSelected === true)
    if (this.authService.isAuth()){
      this.orderService.addOrder(selectedItems, this.shippingCost, this.totalPrice).subscribe(user => {
        console.log(user);
        this.messageService.add({ severity: 'success',
          summary: 'Your order received!',
          detail: "Please wait for confirmation by phone",
        })
        this.cartService.clearCart();
        this.discount = 0;
      })
    } else {
      this.dialogVisible = true;
    }
  }

  onLoginSuccess() {
    this.dialogVisible = false;
  }
}
