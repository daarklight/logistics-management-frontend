import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer, CustomerService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[]
  dataSource: MatTableDataSource<Customer>
  displayedColumns =
    ['customerId', 'customerName', 'phone', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.customerService.customersFindAll().subscribe(allCustomers => {
      this.customers = allCustomers;
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showCustomerDetails(customerId: number) {
    this.customerService.customerFindById(customerId).subscribe(customerDetails => {
      console.log(customerDetails);
      this.router.navigate(['customer/details/', customerId]);
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
      this.customerService.customersFindAll().subscribe(allCustomers => {
        this.customers = allCustomers;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

}
