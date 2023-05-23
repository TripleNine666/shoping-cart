import { Component } from '@angular/core';
import { ShopService } from "./shop.service";
import { Product } from "../../interfaces/product";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(private shopService: ShopService) {
  }
  products: Product[] = []

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts().subscribe(products => this.products = products)
  }
}
