import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(private authService: AuthService) {
  }

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: "Orders History",
        icon: "pi pi-history",
        routerLink: "/order-history"
      },
      {
        label: "Contacts",
        icon: 'pi pi-users',
        routerLink: "/contacts"
      },
    ]
    if (this.authService.isAuth()) {
      this.items.push({
        label: "Log Out",
        icon: "pi pi-sign-out",
        command: () => {
          this.authService.logOut();
          this.items.splice(this.items.length - 1, 1)
        },
        routerLink: "/shop",
      })
    }
  }
}
