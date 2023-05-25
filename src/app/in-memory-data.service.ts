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
        name: 'Виски',
        category: CATEGORY[1],
        price: 10,
        img: 'https://pngimg.com/uploads/whisky/small/whisky_PNG132.png',
        size: '100 cl / 1L',
      },
      {
        id: 2,
        name: 'Коньяк',
        category: CATEGORY[1],
        price: 5,
        img: 'https://pngimg.com/uploads/whisky/small/whisky_PNG122.png',
        size: '50 cl / 500ml',
      },
      {
        id: 3,
        name: 'Крылышки',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 4,
        name: 'Пицца',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 5,
        name: 'Суши',
        category: CATEGORY[0],
        price: 20,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 6,
        name: 'Аливария',
        category: CATEGORY[1],
        price: 10,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 7,
        name: 'Жигуль',
        category: CATEGORY[1],
        price: 5,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 8,
        name: 'Крылышки',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 9,
        name: 'Пицца',
        category: CATEGORY[0],
        price: 15,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
      {
        id: 10,
        name: 'Суши',
        category: CATEGORY[0],
        price: 20,
        img: 'https://pngimg.com/uploads/kfc_food/small/kfc_food_PNG67.png',
        size: '100 cl / 1L',
      },
    ]
    return { products };
  }
}
