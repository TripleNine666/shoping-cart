import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUrl: string = '';
  @Output() backgroundColor = new EventEmitter<string>();

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.url;
        console.log(this.currentUrl)
        this.backgroundColor.emit(this.getBackgroundColor());
      }
    });
  }

  ngOnInit(): void {
  }

  getBackgroundColor(): string {
    if (this.currentUrl === '/cart') {
      return 'white';
    } else {
      return '#fbf3ec';
    }
  }
}
