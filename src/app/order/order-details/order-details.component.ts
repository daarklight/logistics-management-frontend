import {Component, OnInit} from '@angular/core';
import {Cargo, CargoService, Driver, DriverService, Order, OrderService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";
import {__assign} from "tslib";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  id: number;
  order: Order;
  cargos: Cargo[]
  drivers: Driver[]
  errorMessage: string;
  isError: boolean;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private driverService: DriverService,
              private router: Router, private confirmationDialogService: ConfirmationDialogService, private cargoService: CargoService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderService.orderFindById(this.id).subscribe(orderDetails => {
      this.isError = false;
      this.order = orderDetails;
      //console.log("order-details before cargo service")
      this.cargoService.cargoFindByOrderId(this.order.orderId!).subscribe(cargoList => {
        this.cargos = cargoList;
      })
      this.driverService.driversFindByCurrentOrderId(this.order.orderId!).subscribe(driverList => {
        this.drivers = driverList;
      })

    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }

  updateOrder(orderId: number){
    this.orderService.orderFindById(orderId).subscribe(orderDetails => {
      this.router.navigate(['order/update/', orderId]);
    });
  }
  findProperDrivers(orderId: number, city: string, state: string, hours: number){
    localStorage.setItem('order-id', String(orderId));
    localStorage.setItem('city-item', city);
    localStorage.setItem('state-item', state);
    this.router.navigate(['drivers/proper']);
  }

  calculateNumberOfCargos() : number{
    return this.cargos.length;
  }

  calculateNumberOfAssignedDrivers() : number{
    return this.drivers.length;
  }

  //var youngest = _
  //   .chain(users)
  //   .sortBy('age')
  //   .map(function(o) {
  //     return o.user + ' is ' + o.age;
  //   })
  //   .head()
  //   .value();

  // findFirstPersonalNumberOfAssignedDrivers() : string{
  //   if(this.drivers.length>0){
  //     return this.drivers.at(0)!.personalNumber!.toString();
  //   }
  //  else return 'not assigned';
  // }

  findFirstPersonalNumberOfAssignedDrivers() : string{
    if(this.drivers.length>0){
      let name = this.drivers.at(0)!.name!;
      let surname = this.drivers.at(0)!.surname!;
      let personalNumber = this.drivers.at(0)!.personalNumber!.toString();
      return name + ' ' + surname + ' (' + personalNumber + ')';
    }
    else return 'not assigned';
  }

  findSecondPersonalNumberOfAssignedDrivers() : string{
    if(this.drivers.length===2){
      let name = this.drivers.at(1)!.name!;
      let surname = this.drivers.at(1)!.surname!;
      let personalNumber = this.drivers.at(1)!.personalNumber!.toString();
      return name + ' ' + surname + ' (' + personalNumber + ')';
    }
    else return 'not assigned';
  }

  // showFirstDriver() : number{
  //   return this.drivers.at(0)!.personalNumber!;
  // }

  findProperTrucks(orderId: number, city: string, state: string, capacity: number){
    localStorage.setItem('order-id', String(orderId));
    localStorage.setItem('city-item', city);
    localStorage.setItem('state-item', state);
    localStorage.setItem('capacity-item', String(capacity));
    this.router.navigate(['trucks/proper']);
  }

  findAllCargos(orderId: number){
    localStorage.setItem('order-id', String(orderId));
    this.router.navigate(['cargos/cargosInOrder']);
    // this.driverService.driversFindForOrder(orderId, city, state, hours).subscribe(drivers => {
    //   this.router.navigate(['drivers/proper']);
    // });
  }

  sendForDriverApprove(orderId: number){
    this.orderService.orderUpdateStatus(orderId, 'EXPECT_DRIVERS_CONFIRMATION').subscribe(orderDetails => {
      window.location.reload();
    });
  }



  deleteOrder(orderId: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this order?')
      .then((confirmed) => {
        if (confirmed) {
          this.orderService.orderDelete(orderId).subscribe(order => {
            //Renew table data after order deletion
            this.router.navigate(['orders']);
          })
        }
        else {
          this.router.navigate(['order/details/', orderId]);
        }
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
