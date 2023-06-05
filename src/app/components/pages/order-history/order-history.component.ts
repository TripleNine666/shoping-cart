import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {Order} from "../../../interfaces/Order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }
  isAuth: boolean = false;
  orderHistory: Order[] = [];

  ngOnInit() {
    this.authService.getAuthState$().subscribe(authState => {
      // обновляем свои свойства при изменении authState
      this.isAuth = authState.isAuth;
      this.orderHistory = authState.user.orderHistory;
    });
  }

  goToOrder(order: Order) {
    this.router.navigate([`/order-details/${order.id}`], {queryParams: {order: JSON.stringify(order)}}).then();
  }
}
