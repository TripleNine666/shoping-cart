import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../interfaces/CartItem";
import {CartService} from "../../../services/cart.service";
import { MessageService } from 'primeng/api';
import {SHIPPING_COST, PROMO_CODES} from "../../../static-data";
import {OrderService} from "../../../services/order.service";
import {AuthService} from "../../../services/auth.service";
import { SearchCountryField, CountryISO  } from 'ngx-intl-tel-input';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

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
              private userService: UserService,
              private fb: FormBuilder,
  ) {
  }
  productsInCart: CartItem[] = [];

  codeSent = false;

  // Phone number block
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;

  phoneForm = this.fb.group({
    phoneNumber: [
      {number: '', countryCode: ''},
      [Validators.required],
    ],
    code: [
      '',
      [Validators.required, Validators.minLength(4)],
    ]
  });



  get phoneNumber() {
    return this.phoneForm.get('phoneNumber');
  }
  get code() {
    return this.phoneForm.get('code');
  }


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

  onPhoneFormSubmit() {
    const phoneNumber = this.phoneNumber!.value!.number;
    const code = Number(this.phoneForm.get('code')?.value);
    if (!code) {
      // вызов метода сервиса для отправки кода на номер телефона
      this.authService.sendCode(phoneNumber).subscribe(
        response => {
          if (!response.userExists) {
            this.userService.addEmptyUser(phoneNumber).subscribe(user => console.log(user))
          }
          console.log(response.code);
          this.codeSent = true; // установка флага отправки кода
          this.messageService.add({ severity: 'success',
            summary: 'Success',
            detail: `Code received`})

        },
        error => {
          // обработка неуспешного ответа
          console.log(error);
          this.messageService.add({ severity: 'error',
            summary: 'Error',
            detail: `Phone error`})
        }
      );
    } else {
      // вызов метода сервиса для проверки кода и получения токена
      this.authService.verifyCode(phoneNumber, code).subscribe(
        resp => {
          // обработка успешного ответа
          console.log(resp)
          this.dialogVisible = false;
          this.messageService.add({ severity: 'success',
            summary: 'Success',
            detail: `you have successfully logged in`})
        },
        error => {
          // обработка неуспешного ответа
          console.log(error);
          this.messageService.add({ severity: 'error',
            summary: 'Error',
            detail: `Code Error`})
        }
      );
    }
  }
}
