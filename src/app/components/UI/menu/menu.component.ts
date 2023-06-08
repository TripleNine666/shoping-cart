import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import { AuthService } from "../../../services/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(private authService: AuthService, private translate: TranslateService) {
  }

  items: MenuItem[] = [];

  ngOnInit() {

    this.items = [
      {
        label: this.translate.instant('UI.menu.orders-history'),
        icon: 'pi pi-history',
        routerLink: '/order-history'
      },
      {
        label: this.translate.instant('UI.menu.contacts'),
        icon: 'pi pi-users',
        routerLink: '/contacts'
      },
    ]
    if (this.authService.isAuth()) {
      this.items.push({
        label: this.translate.instant('UI.menu.logout'),
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logOut();
          this.items.splice(this.items.length - 1, 1)
        },
        routerLink: '/shop',
      })
    }
  }
}
