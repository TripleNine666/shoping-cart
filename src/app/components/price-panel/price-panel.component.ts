import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-panel',
  templateUrl: './price-panel.component.html',
  styleUrls: ['./price-panel.component.css']
})
export class PricePanelComponent {
  @Input() productPrice: number = 0;
}
