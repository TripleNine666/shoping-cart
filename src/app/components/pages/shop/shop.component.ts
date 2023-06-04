import { Component } from '@angular/core';
import { ShopService } from "../../../services/shop.service";
import { Product } from "../../../interfaces/Product";
// import { TabChangeEvent } from 'primeng/tabview'
import { CATEGORY } from "../../../static-data";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(private shopService: ShopService) {
  }
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories = CATEGORY;

  ngOnInit() {
    this.getProducts();
  }

  filterProducts(event: any) {
    let category = this.categories[event.index];
    this.filteredProducts = this.products.filter(p => p.category === category);
  }

  getProducts() {
    this.shopService.getProducts().subscribe(products => {
      this.products = products
      this.filteredProducts = products;
    })
  }
}
