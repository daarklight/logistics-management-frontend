import {Component} from '@angular/core';
import {Cargo, CargoService, Driver, DriverService, Order, OrderService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-order-for-driver',
  templateUrl: './order-for-driver.component.html',
  styleUrls: ['./order-for-driver.component.scss']
})
export class OrderForDriverComponent {

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
    this.driverService.driverFindByUsername(localStorage.getItem('username')!).subscribe(driver => {
      this.orderService.orderFindByDriver(driver.personalNumber!).subscribe(order => {
          this.order = order;
          {
            this.cargoService.cargoFindByOrderId(this.order.orderId!).subscribe(cargoList => {
              this.cargos = cargoList;
            })
          }
        this.driverService.driversFindByCurrentOrderId(this.order.orderId!).subscribe(driverList => {
          this.drivers = driverList;
        })

        }
      )
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });

  }

  calculateNumberOfCargos(): number {
    return this.cargos.length;
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

  findFirstAssignedDriverPersonalNumber() : string{
    if(this.drivers.length>0){
      return this.drivers.at(0)!.personalNumber!.toString();
    }
    else return 'not assigned';
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

  findSecondAssignedDriverPersonalNumber() : string{
    if(this.drivers.length===2){
      return this.drivers.at(1)!.personalNumber!.toString();
    }
    else return 'not assigned';
  }

  findAllCargos(orderId: number) {
    localStorage.setItem('order-id', String(orderId));
    this.router.navigate(['cargos/cargosInOrder']);
  }

  confirmOrder(orderAcceptance: string) {
    this.driverService.driverFindByUsername(localStorage.getItem('username')!).subscribe(driver => {
      console.log('username: ' + localStorage.getItem('username')!);
      console.log('driverPersonalNumber: ' + driver.personalNumber!);
      this.driverService.driversUpdateOrderAcceptance(driver.personalNumber!, orderAcceptance).subscribe(driver => {
          window.location.reload();
        }
      )
    });
  }

}
