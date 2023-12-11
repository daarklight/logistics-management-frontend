import {Component, OnInit, ViewChild} from '@angular/core';
import {CargoService, CustomerService, DriverService, Order, OrderService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-customer-orders-list',
  templateUrl: './customer-orders-list.component.html',
  styleUrls: ['./customer-orders-list.component.scss']
})
export class CustomerOrdersListComponent implements OnInit{
  orders: Order[]
  dataSource: MatTableDataSource<Order>
  displayedColumns =
    ['orderId', 'customerName', 'category', 'weight', 'status', 'startDateTime', 'limitDateTime',
      'assignedTruckNumber', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService,
              private router: Router,
              private cargoService: CargoService,
              private customerService: CustomerService,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('need-to-reload-page') === String(true)) {
      localStorage.setItem('need-to-reload-page', String(false));
      location.reload();
    }
    this.customerService.customerFindByUsername(localStorage.getItem('username')!)
      .subscribe(customer => {
        localStorage.setItem('customer-id', String(customer.customerId!));
        this.orderService.orderFindByOrderCustomerId(customer.customerId!)
          .subscribe(allOrders => {
            this.orders = allOrders;
            this.dataSource = new MatTableDataSource(this.orders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showOrderDetails(orderId: number) {
    this.orderService.orderFindById(orderId).subscribe(orderDetails => {
      console.log(orderDetails);
      this.router.navigate(['order/details/', orderId]);
    });
  }

  protected readonly localStorage = localStorage;
}
