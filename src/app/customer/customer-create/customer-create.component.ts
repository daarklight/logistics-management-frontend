import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateCustomer, CustomerService} from "../../../logistics-api";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  errorMessage: String
  isError: boolean
  customer: CreateCustomer = new class implements CreateCustomer {
    customerAuthenticationId: number;
    customerName: string;
    phone: string;
    email: string;
  }

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.customer)
  }

  onSubmit() {
    this.customerService.customerCreate(this.customer).subscribe(createdCustomer => {
        this.isError = false;
        console.log(createdCustomer)
        this.router.navigate(['customer/details/', createdCustomer.customerId]);
      },
      error => { //если ошибка
        this.isError = true;
        this.errorMessage = error.error.message;
        //TODO: redirect to the page with error (make component to show error)
        //redirect to view all customers (button Show Details)
      })
  }


  //protected readonly onsubmit = onsubmit;


  //----------------- VALIDATION----------------------------
  customerValidation = new FormGroup({
    authenticationIdCheck: new FormControl(this.customer.customerAuthenticationId, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    customerNameCheck: new FormControl(this.customer.customerName, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    phoneCheck: new FormControl(this.customer.phone, [
      Validators.required,
      Validators.maxLength(19),
      Validators.pattern("^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$")]),
    emailCheck: new FormControl(this.customer.email, [
      Validators.required,
      Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
  });

  get authenticationIdCheck() {
    return this.customerValidation.get('authenticationIdCheck')
  }

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
