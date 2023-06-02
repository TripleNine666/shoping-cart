import {Order} from "./Order";

export interface User {
  nickname: string;
  phoneNumber: string;
  orderHistory: Order[],
}
