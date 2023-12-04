import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Driver, DriverService} from "../../../logistics-api";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  id: number;
  driver: Driver;
  errorMessage: string;
  isError: boolean;

  //
  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute, private driverService: DriverService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
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
      console.log("Driver details error: "+ error);
      console.log(error.message)
    });


  }


  updateDriver(personalNumber: number) {
    this.driverService.driverFindById(personalNumber).subscribe(driverDetails => {
      this.router.navigate(['driver/update/', personalNumber]);
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


export class HttpError {
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}
