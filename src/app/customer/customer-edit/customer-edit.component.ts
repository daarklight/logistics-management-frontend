import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService, UpdateCustomer} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  id: number;
  errorMessage: string;
  isError: boolean;

  customerUpdate: UpdateCustomer = new class implements UpdateCustomer {
    customerName: string;
    phone: string;
    email: string;
  }

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.customerFindById(this.id).subscribe(customerResponse => {
      this.customerUpdate = customerResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.customerService.customerUpdate(this.customerUpdate, this.id).subscribe(updatedCustomer => {
      console.log(updatedCustomer);
      this.router.navigate(['customer/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  customerValidation = new FormGroup({
    customerNameCheck: new FormControl(this.customerUpdate.customerName, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    phoneCheck: new FormControl(this.customerUpdate.phone, [
      Validators.required,
      Validators.maxLength(19),
      Validators.pattern("^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$")]),
    emailCheck: new FormControl(this.customerUpdate.email, [
      Validators.required,
      Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
  });

  get customerNameCheck() {
    return this.customerValidation.get('customerNameCheck')
  }
  get phoneCheck() {
    return this.customerValidation.get('phoneCheck')
  }
  get emailCheck() {
    return this.customerValidation.get('emailCheck')
  }
}
