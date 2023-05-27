import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-arrow-back',
  templateUrl: './arrow-back.component.html',
  styleUrls: ['./arrow-back.component.css']
})
export class ArrowBackComponent {
  constructor(private location: Location) {
  }
  goBack(): void {
    this.location.back();
  }
}
