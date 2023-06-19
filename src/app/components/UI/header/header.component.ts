import {Component, OnInit, OnDestroy, Input} from '@angular/core';
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
  @Input() cartLen: number = 0;


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
    });
  }

  ngOnDestroy() {
    // отписываемся от Observable
    this.authSubscription?.unsubscribe();
    this.priceSubscription?.unsubscribe();
  }
}
