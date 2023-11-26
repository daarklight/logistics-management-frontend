import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer, CustomerService} from "../../../logistics-api";


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  id: number;
  customer: Customer;
  errorMessage:String
  isError:boolean

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.customerFindById(this.id).subscribe(customerDetails => {
      this.isError = false;
      this.customer = customerDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }

  updateCustomer(customerId: number){
    this.customerService.customerFindById(customerId).subscribe(customerDetails => {
      this.router.navigate(['customer/update/', customerId]);
    });
  }

  deleteCustomer(customerId: number) {
    this.customerService.customerDelete(customerId).subscribe(customer => {
      //Renew table data after customer deletion
      this.router.navigate(['customers']);
    })
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
