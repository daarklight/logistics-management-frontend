import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Logistician, LogisticianService} from "../../../logistics-api";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-logistician-details',
  templateUrl: './logistician-details.component.html',
  styleUrls: ['./logistician-details.component.scss']
})
export class LogisticianDetailsComponent implements OnInit {

  id: number;
  logistician: Logistician;
  errorMessage: string;
  isError: boolean;

  constructor(private route: ActivatedRoute, private logisticianService: LogisticianService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.logisticianService.logisticianFindById(this.id).subscribe(logisticianDetails => {
      this.isError = false;
      this.logistician = logisticianDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }

  updateLogistician(personalNumber: number){
    this.logisticianService.logisticianFindById(personalNumber).subscribe(logisticianDetails => {
      this.router.navigate(['logistician/update/', personalNumber]);
    });
  }

  deleteLogistician(personalNumber: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this logistician?')
      .then((confirmed) => {
        if (confirmed) {
          this.logisticianService.logisticianDelete(personalNumber).subscribe(logistician => {
            //Renew table data after logistician deletion
            this.router.navigate(['logisticians']);
          })
        }
        else {
          this.router.navigate(['logistician/details/', personalNumber]);
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
