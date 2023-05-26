import { Component, OnInit } from '@angular/core';
import { Product } from "../../interfaces/product";
import { ShopService } from "../shop/shop.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private shopService:ShopService, private route: ActivatedRoute) {

  }
  product?: Product;

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const prodID = Number(this.route.snapshot.paramMap.get('id'));
    this.shopService.getProduct(prodID).subscribe(product => {this.product = product;
      console.log(product)});
  }
}
