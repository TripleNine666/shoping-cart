import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'
import {Product} from "./interfaces/product";
import { CATEGORY } from './static-data'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb(){
    const products: Product[] = [
      {
        id: 1,
        name: 'Аливария',
        category: CATEGORY[1],
        price: 10
      },
      {
        id: 2,
        name: 'Жигуль',
        category: CATEGORY[1],
        price: 5
      },
      {
        id: 3,
        name: 'Крылышки',
        category: CATEGORY[0],
        price: 15
      },
    ]
    return { products };
  }
}
