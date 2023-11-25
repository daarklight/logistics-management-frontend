import {Component, OnInit} from '@angular/core';
import {Order, OrderService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  id: number;
  order: Order;
  errorMessage:String
  isError:boolean

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderService.orderFindById(this.id).subscribe(orderDetails => {
      this.isError = false;
      this.order = orderDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }
}

export class HttpError{
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}
