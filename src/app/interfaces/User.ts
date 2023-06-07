import {Order} from "./Order";

export interface User {
  id: number;
  nickname: string;
  phoneNumber: string;
  orderHistory: Order[],
  address?: string,
}
