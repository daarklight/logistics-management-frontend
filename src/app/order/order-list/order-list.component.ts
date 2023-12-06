import {Component, OnInit, ViewChild} from '@angular/core';
import {Cargo, CargoService, Driver, DriverService, Order, OrderService} from "../../../logistics-api";
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
  // cargos: Cargo[]
  // drivers: Driver[]
  // numberOfCargos: number
  // numberOfAssignedTrucks: number

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService, private router: Router, private driverService: DriverService,
              private cargoService: CargoService, private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('need-to-reload-page') === String(true)) {
      localStorage.setItem('need-to-reload-page', String(false));
      location.reload();
    }
    this.orderService.ordersFindAll().subscribe(allOrders => {
      this.orders = allOrders;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    // this.numberOfCargos = this.calculateNumberOfCargos(orderId: number)

      // this.driverService.driversFindByCurrentOrderId(this.order.orderId!).subscribe(driverList => {
      //   this.drivers = driverList;
      // })
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // calculateNumberOfCargos(order: Order) : number{
  //   console.log('start calculation');
  //   this.cargoService.cargoFindByOrderId(order.orderId!).subscribe(cargoList => {
  //     console.log('before cargo list');
  //     this.cargos = cargoList;
  //     //return cargoList.length;
  //   })
  //   console.log('before length calculation');
  //   return this.cargos.length;
  //   //return car.length;
  // }

  // calculateNumberOfCargos(orderId: number) : number{
  //   //console.log('start calculation0');
  //     this.cargoService.cargoFindByOrderId(orderId).subscribe(cargoList => {
  //       //console.log('start calculation2');
  //       this.cargos = cargoList;
  //       //cargoList.length;
  //       //console.log('length: ' + cargoList.length)
  //   })
  //   console.log('start calculation3');
  //   return this.cargos.length;
  // }


  // calculateNumberOfAssignedDrivers() : number{
  //   return this.drivers.length;
  // }

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
