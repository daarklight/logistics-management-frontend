import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Driver, DriverService, Order, OrderService, UpdateDriverStatusByDriver} from "../../../logistics-api";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  id: number;
  driver: Driver;
  order: Order;
  errorMessage: string;
  isError: boolean;
  userRole: string;

  //driverStatusBody: UpdateDriverStatusByDriver;
  driverStatusBody: UpdateDriverStatusByDriver = new class implements UpdateDriverStatusByDriver {
    status: UpdateDriverStatusByDriver.StatusEnum;
  };

  //
  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute, private driverService: DriverService, private router: Router,
              private orderService: OrderService, private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')!;
    this.id = this.route.snapshot.params['id'];
    if (localStorage.getItem('need-to-reload-page') === String(true)) {
      localStorage.setItem('need-to-reload-page', String(false));
      location.reload();
    }
    this.driverService.driverFindById(this.id).subscribe(driverDetails => {
      this.isError = false;
      this.driver = driverDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log("Driver details error: " + error);
      console.log(error.message)
    });

    if(localStorage.getItem('role') === 'ROLE_LOGISTICIAN') {
      this.driverService.driverFindById(this.id).subscribe(driverDetails => {
        this.isError = false;
        this.driver = driverDetails;
      }, error => {
        this.isError = true;
        this.errorMessage = error.message;
        //console.log("Driver details error: "+ error);
        //console.log(error.message)
      });
    }
    if(localStorage.getItem('role') === 'ROLE_DRIVER') {
      this.driverService.driverFindByUsername(localStorage.getItem('username')!).subscribe(driver => {
        this.driver = driver;
        this.isError = false;

        localStorage.setItem('driver-id', String(driver.personalNumber!));


      }, error => {
        this.isError = true;
        this.errorMessage = error.message;
        console.log("Driver details error: "+ error);
        console.log(error.message)
      });
    }
  }


  showOrderDetails(orderId: number) {
    this.router.navigate(['order/details/', orderId]);
  }


  updateDriver(personalNumber: number) {
    this.driverService.driverFindById(personalNumber).subscribe(driverDetails => {
      this.router.navigate(['driver/update/', personalNumber]);
    });
  }

  updateStatusToRest(personalNumber: number) {
    console.log('Driver status before set to rest: ' + this.driverStatusBody.status);
    this.driverStatusBody.status = 'REST';
    console.log('Driver status after set to rest: ' + this.driverStatusBody.status);
    this.driverService.driverUpdateStatusByDriver(this.driverStatusBody, personalNumber).subscribe(driverDetails => {
      driverDetails.status='REST';
      //this.router.navigate(['driver/update/', personalNumber]);
      window.location.reload();
    });
  }

  updateStatusToDriving(personalNumber: number) {
    console.log('Driver status before set to driving: ' + this.driverStatusBody.status)
    this.driverStatusBody.status = 'DRIVING';
    console.log('Driver status after set to driving: ' + this.driverStatusBody.status);
    this.driverService.driverUpdateStatusByDriver(this.driverStatusBody, personalNumber).subscribe(driverDetails => {
      driverDetails.status='DRIVING';
      //this.router.navigate(['driver/update/', personalNumber]);
      window.location.reload();
    });
  }

  deleteDriver(personalNumber: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this driver?')
      .then((confirmed) => {
        if (confirmed) {
          this.driverService.driverDelete(personalNumber).subscribe(driver => {
            //Renew table data after driver deletion
            this.router.navigate(['drivers']);
          })
        } else {
          this.router.navigate(['driver/details/', personalNumber]);
        }
      })
  }

}

