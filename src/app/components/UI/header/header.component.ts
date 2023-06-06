import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {User} from "../../../interfaces/User";
import { Subscription } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../services/cart.service";
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private authService: AuthService,
              public route: ActivatedRoute,
              private cartService: CartService,
  ) {}


  isAuth: boolean = false;
  user?: User;
  authSubscription?: Subscription;
  priceSubscription?: Subscription;

  totalCartPrice: number = 0;

  ngOnInit() {
    this.authSubscription = this.authService.getAuthState$().subscribe(authState => {
      // обновляем свои свойства при изменении authState
      this.isAuth = authState.isAuth;
      this.user = authState.user;
    });
    this.priceSubscription = this.cartService.totalPrice$.pipe(
      distinctUntilChanged()
    ).subscribe(totalPrice => {
      this.totalCartPrice = totalPrice
      console.log(this.totalCartPrice)
    });
  }

  ngOnDestroy() {
    // отписываемся от Observable
    this.authSubscription?.unsubscribe();
    this.priceSubscription?.unsubscribe();
  }
}
