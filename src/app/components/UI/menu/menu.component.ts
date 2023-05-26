import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: "Shopping Cart",
        icon: "pi pi-shopping-cart",
        routerLink: ""
      },
      {
        label: "Orders History",
        icon: "pi pi-history",
        routerLink: ""
      },
      {
        label: "Contacts",
        icon: 'pi pi-users',
        routerLink: ""
      },
    ]
  }
}
