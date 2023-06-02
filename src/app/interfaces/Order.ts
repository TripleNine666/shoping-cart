import {CartItem} from "./CartItem";
import {OrderStatus} from "../static-data";

export interface Order {
  id: number;
  status: OrderStatus;
  cartItems: CartItem[],
  shipping: number,
  totalPrice: number,
}
