import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../../../interfaces/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private productsUrl = 'api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
  }
}

