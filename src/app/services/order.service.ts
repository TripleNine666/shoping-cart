import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {User} from "../interfaces/User";
import {HttpClient} from "@angular/common/http";
import {OrderStatus} from "../static-data";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  orderStatusChange(orderId: number): Observable<User>{
    //get user
    const user: User = this.authService.getUser();
    let order = user.orderHistory.find(o => o.id === orderId);
    if(order){
      order.status = OrderStatus.New;
      return this.http.put<User>(`api/users/${user.id}`, user).pipe(
        tap(user => {
          this.authService.storeUser(user);
          this.authService.setAuthState(true, user);
        })
      )
    }
    return of(user);
  }
}
