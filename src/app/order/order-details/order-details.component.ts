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
  userRole: string;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private driverService: DriverService,
              private router: Router, private confirmationDialogService: ConfirmationDialogService, private cargoService: CargoService) {
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')!;
    console.log('role: ' + localStorage.getItem('role')!)
    this.id = this.route.snapshot.params['id'];
    this.orderService.orderFindById(this.id).subscribe(orderDetails => {
      this.isError = false;
      this.order = orderDetails;

      localStorage.setItem('order-id-item', this.order.orderId!.toString());

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

  findFirstAssignedDriver() : string{
    if(this.drivers.length>0){
      let name = this.drivers.at(0)!.name!;
      let surname = this.drivers.at(0)!.surname!;
      let personalNumber = this.drivers.at(0)!.personalNumber!.toString();
      return name + ' ' + surname + ' (' + personalNumber + ')';
    }
    else return 'not assigned';
  }

  findFirstPersonalNumberOfAssignedDrivers() : number{
    if(this.drivers.length>0){
      let personalNumber = this.drivers.at(0)!.personalNumber!;
      return personalNumber;
    }
    else return 0;
  }

  findSecondAssignedDriver() : string{
    if(this.drivers.length===2){
      let name = this.drivers.at(1)!.name!;
      let surname = this.drivers.at(1)!.surname!;
      let personalNumber = this.drivers.at(1)!.personalNumber!.toString();
      return name + ' ' + surname + ' (' + personalNumber + ')';
    }
    else return 'not assigned';
  }

  findSecondPersonalNumberOfAssignedDrivers() : number{
    if(this.drivers.length===2){
      let personalNumber = this.drivers.at(1)!.personalNumber!;
      return personalNumber;
    }
    else return 0;
  }

  findProperTrucks(orderId: number, city: string, state: string, capacity: number){
    localStorage.setItem('order-id', String(orderId));
    localStorage.setItem('city-item', city);
    localStorage.setItem('state-item', state);
    localStorage.setItem('capacity-item', String(capacity));
    this.router.navigate(['trucks/proper']);
  }

  unassignTruck(orderId: number){
    this.orderService.orderUnassignTruck(orderId).subscribe(order =>{
      window.location.reload();
    })

  }

  unassignDrivers(orderId: number, personalNumber: number){
    this.driverService.driverUnassignOrder(orderId, personalNumber).subscribe(driver=>{
      window.location.reload();
    })
  }

  findAllCargos(orderId: number){
    localStorage.setItem('order-id', String(orderId));
    this.router.navigate(['cargos/cargosInOrder']);
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

  protected readonly parseInt = parseInt;
}
