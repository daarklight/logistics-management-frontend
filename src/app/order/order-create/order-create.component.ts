import {Component, OnInit} from '@angular/core';
import {CreateOrder, OrderService} from "../../../logistics-api";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit{

  errorMessage: String
  isError: boolean
  order: CreateOrder = new class implements CreateOrder {
    orderCustomerId: number;
    category: string;
    weight: number;
    limitDateTime: Date;
  }

  constructor(private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.order)
  }

  onSubmit() {
    this.orderService.orderCreate(this.order).subscribe(createdOrder => {
        this.isError = false;
        console.log(createdOrder)
        this.router.navigate(['order/details/', createdOrder.orderId]);
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      })
  }

  //----------------- VALIDATION----------------------------
  orderValidation = new FormGroup({
    orderOrderCustomerId: new FormControl(this.order.orderCustomerId, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    orderCategory: new FormControl(this.order.category, [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    orderLimitDateTime: new FormControl(this.order.limitDateTime, [
      Validators.required,
      Validators.pattern("^\\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(0?[1-9]|[12][0-9]|3[01])[tT ]\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?([zZ]|[+-]\\d{2}:\\d{2})")]),
  });

  get orderOrderCustomerId() {
    return this.orderValidation.get('orderOrderCustomerId')
  }

  get orderCategory() {
    return this.orderValidation.get('orderCategory')
  }

  get orderLimitDateTime() {
    return this.orderValidation.get('orderLimitDateTime')
  }
}
