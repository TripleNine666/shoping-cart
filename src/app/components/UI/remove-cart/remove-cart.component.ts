import {Component, Input} from '@angular/core';
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-remove-cart',
  templateUrl: './remove-cart.component.html',
  styleUrls: ['./remove-cart.component.css']
})
export class RemoveCartComponent {
  constructor(private cartService: CartService) {
  }
  @Input() cartLen: number = 0;
  clearCart() {
    this.cartService.clearCart();
  }
}
