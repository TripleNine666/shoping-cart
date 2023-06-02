import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AuthService } from "../../pages/login/auth.service";
import {User} from "../../../interfaces/User";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(private authService: AuthService) {
  }
  isAuth: boolean = false;
  user?: User;
  authSubscription?: Subscription;

  ngOnInit() {
    this.authSubscription = this.authService.getAuthState$().subscribe(authState => {
      // обновляем свои свойства при изменении authState
      this.isAuth = authState.isAuth;
      this.user = authState.user;
    });
  }

  ngOnDestroy() {
    // отписываемся от Observable
    this.authSubscription?.unsubscribe();
  }
}
