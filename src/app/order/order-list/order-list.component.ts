import {Component, OnInit, ViewChild} from '@angular/core';
import {Order, OrderService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit{
  orders: Order[]
  dataSource: MatTableDataSource<Order>
  displayedColumns =
    ['orderId', 'orderCustomerId', 'category', 'weight', 'status', 'startDateTime', 'limitDateTime',
      'assignedTruckNumber', 'driverComment', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.orderService.ordersFindAll().subscribe(allOrders => {
      this.orders = allOrders;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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

  updateOrder(orderId: number){
    this.orderService.orderFindById(orderId).subscribe(orderDetails => {
      this.router.navigate(['order/update/', orderId]);
    });
  }

  deleteOrder(orderId: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this order?')
      .then((confirmed) => {
        if (confirmed) {
          this.orderService.orderDelete(orderId).subscribe(order => {
            //Renew table data after order deletion
            this.orderService.ordersFindAll().subscribe(allOrders => {
              this.orders = allOrders;
              this.dataSource = new MatTableDataSource(this.orders);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          })
        }
        else {
          this.orderService.ordersFindAll().subscribe(allOrders => {
            this.orders = allOrders;
            this.dataSource = new MatTableDataSource(this.orders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
  }

}
