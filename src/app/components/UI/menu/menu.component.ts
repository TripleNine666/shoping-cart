import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import { AuthService } from "../../../services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(private authService: AuthService, private translate: TranslateService) {
  }

  items: MenuItem[] = [];
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'UI.menu.orders-history',
        icon: 'pi pi-history',
        routerLink: '/order-history'
      },
      {
        label: 'UI.menu.contacts',
        icon: 'pi pi-users',
        routerLink: '/contacts'
      },
      {
        label: 'UI.menu.change-language',
        icon: 'pi pi-globe',
        command: () => {
          this.changeLang();
        }
      }
    ]
    if (this.authService.isAuth()) {
      this.items.push({
        label: 'UI.menu.logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logOut();
          this.items.splice(this.items.length - 1, 1)
        },
        routerLink: '/shop',
      })
    }

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const subscription = this.translate.stream(item.label!).subscribe(value => {
        item.label = value;
      });
      this.subscriptions.push(subscription);
    }
  }

  changeLang() {
    const currentLang = this.translate.currentLang;
    const oppositeLang = currentLang === 'en' ? 'ru' : 'en';
    this.translate.use(oppositeLang);
    localStorage.setItem('lang', oppositeLang)
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
