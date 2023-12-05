import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService, UpdateOrder} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  id: number;
  errorMessage: string;
  isError: boolean;

  orderUpdate: UpdateOrder = new class implements UpdateOrder {
    orderCustomerId: number;
    category: string;
    weight: number;
    limitDateTime: Date;
  }

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderService.orderFindById(this.id).subscribe(orderResponse => {
      this.orderUpdate = orderResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.orderService.orderUpdate(this.orderUpdate, this.id).subscribe(updatedOrder => {
      console.log(updatedOrder);
      this.router.navigate(['order/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  orderValidation = new FormGroup({
    orderOrderCustomerId: new FormControl(this.orderUpdate.orderCustomerId, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    orderCategory: new FormControl(this.orderUpdate.category, [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    orderLimitDateTime: new FormControl(this.orderUpdate.limitDateTime, [
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
