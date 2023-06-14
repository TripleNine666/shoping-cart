// shop.component.ts
import { Component, OnInit } from '@angular/core';
import { ShopService } from "../../../services/shop.service";
import { Product } from "../../../interfaces/Product";
import { CATEGORY } from "../../../static-data";
import { CategoryService } from "../../../services/category.service";
import {switchMap, take} from "rxjs/operators";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  constructor(private shopService: ShopService, private categoryService: CategoryService) {
  }
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories = CATEGORY;
  selectedCategoryIndex: number = 0;
  ngOnInit() {
    // first get the products
    this.shopService.getProducts().pipe(
      // then switch to the category index observable
      switchMap(products => {
        // save the products
        this.products = products;
        this.filteredProducts = products;
        // return the category index observable
        return this.categoryService.categoryIndex$;
      })
    ).pipe(take(1)).subscribe(index => {
      // filter the products by the category index
      this.selectedCategoryIndex = index;
      this.filterProducts(index);
    })
  }

  filterProducts(index: number) {
    this.categoryService.setCategoryIndex(index);
    let category = this.categories[index];
    this.selectedCategoryIndex = index;
    this.filteredProducts = this.products.filter(p => p.category === category);
  }
}
