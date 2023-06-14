import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryIndex = new BehaviorSubject<number>(0);
  categoryIndex$ = this.categoryIndex.asObservable();

  setCategoryIndex(index: number) {
    this.categoryIndex.next(index);
  }
}
