import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from "../../../../interfaces/CartItem";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item?: CartItem;
  @Output() countChange = new EventEmitter<number>();

  onCounterChange(value: number) {
    this.countChange.emit(value)
  }
}
