import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryIndex = new Subject<number>(); // default index
  categoryIndex$ = this.categoryIndex.asObservable();

  setCategoryIndex(index: number) {
    console.log('ох')
    console.log(index)
    this.categoryIndex.next(index);
  }
}
