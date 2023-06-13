import {Component, OnInit} from '@angular/core';
import {Order} from "../../../interfaces/Order";
import {ActivatedRoute} from "@angular/router";
import {OrderStatus} from "../../../static-data";
import {OrderService} from "../../../services/order.service";


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private orderService: OrderService) {
  }
  order!: Order;
  isRetryable: boolean = false;
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.order = JSON.parse(<string>params.get('order'))
      this.isRetryable = (this.order.status === OrderStatus.Completed || this.order.status === OrderStatus.Cancelled);
    })
  }
  orderRetry(){
    this.orderService.orderStatusChange(this.order.id).subscribe(_ => {
      this.order.status = OrderStatus.New
      this.isRetryable = false;
    })
  }

  getSeverity(status: OrderStatus) {
    switch (status) {
      case OrderStatus.New:
        return 'info';
      case OrderStatus.Completed:
        return 'success';
      case OrderStatus.Cancelled:
        return 'danger';
    }
  }
}
