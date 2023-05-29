import { Component, OnInit } from '@angular/core';
import { Product } from "../../../interfaces/Product";
import { ShopService } from "../shop/shop.service";
import { ActivatedRoute, Router } from "@angular/router";
import {CartService} from "../shopping-cart/cart.service";
import {CartItem} from "../../../interfaces/CartItem";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private shopService:ShopService,
              private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
  ) { }
  counterValue: number = 1;
  product?: Product;

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const prodID = Number(this.route.snapshot.paramMap.get('id'));
    this.shopService.getProduct(prodID).subscribe(product => {this.product = product;
      console.log(product)});
  }

  addToCart() {
    const item: CartItem = {
      product: this.product as Product,
      count: this.counterValue,
      isSelected: true,
    };
    this.cartService.addToCart(item);
    this.router.navigate(['/shop']).then();
  }
}
