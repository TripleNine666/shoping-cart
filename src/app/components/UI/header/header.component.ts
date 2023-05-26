import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
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
