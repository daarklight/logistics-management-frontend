import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Driver, DriverService} from "../../../logistics-api";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  id: number;
  driver: Driver;
  errorMessage:String
  isError:boolean

  constructor(private route: ActivatedRoute, private driverService: DriverService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.driverService.driverFindById(this.id).subscribe(driverDetails => {
      this.isError = false;
      this.driver = driverDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)



      // if(error instanceof HttpErrorResponse) { //TODO: IT IS ABLE TO WORK WITH ERRORS, TO PROVIDE OWN MESSAGES
      //   switch (error.status) {
      //     case 500:
      //       this.errorMessage = "500 error message";
      //       break;
      //   }
      // }
    });
  }

  updateDriver(personalNumber: number){
    this.driverService.driverFindById(personalNumber).subscribe(driverDetails => {
      this.router.navigate(['driver/update/', personalNumber]);
    });
  }

  deleteDriver(personalNumber: number) {
    this.driverService.driverDelete(personalNumber).subscribe(driver => {
      //Renew table data after driver deletion
      this.router.navigate(['drivers']);
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
