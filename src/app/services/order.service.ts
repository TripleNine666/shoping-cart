import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "../interfaces/User";
import {HttpClient} from "@angular/common/http";
import {OrderStatus} from "../static-data";
import {Observable, of, tap} from "rxjs";
import {CartItem} from "../interfaces/CartItem";
import {InMemoryDataService} from "../in-memory-data.service";
import {Order} from "../interfaces/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  usersUrl = 'api/users';

  orderStatusChange(orderId: number): Observable<User>{
    //get user
    const user: User = this.authService.getUser();
    let order = user.orderHistory.find(o => o.id === orderId);
    if(order){
      order.status = OrderStatus.New;
      return this.http.put<User>(`${this.usersUrl}/${user.id}`, user).pipe(
        tap(user => {
          this.authService.storeUser(user);
          this.authService.setAuthState(true, user);
        })
      )
    }
    return of(user);
  }


  addOrder(cartItems: CartItem[], shipping: number, totalPrice: number): Observable<User>{
    //get current user
    const user: User = this.authService.getUser();
    //gen new order id
    const orderId = ++InMemoryDataService.lastOrderId;
    //create order
    const order: Order = {
      id: orderId,
      status: OrderStatus.New,
      cartItems,
      shipping,
      totalPrice
    }
    user.orderHistory.push(order);
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user).pipe(
      tap(user => {
        this.authService.storeUser(user);
        this.authService.setAuthState(true, user);
      })
    )
  }


}
