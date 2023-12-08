import {Component, OnInit} from '@angular/core';
import {Cargo, CargoService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-cargo-details',
  templateUrl: './cargo-details.component.html',
  styleUrls: ['./cargo-details.component.scss']
})
export class CargoDetailsComponent implements OnInit {

  id: number;
  cargo: Cargo;
  errorMessage: string;
  isError: boolean;
  userRole: string;

  constructor(private route: ActivatedRoute, private cargoService: CargoService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')!;
    this.id = this.route.snapshot.params['id'];
    this.cargoService.cargoFindById(this.id).subscribe(cargoDetails => {
      this.isError = false;
      this.cargo = cargoDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }

  updateCargo(cargoId: number){
    this.cargoService.cargoFindById(cargoId).subscribe(cargoDetails => {
      this.router.navigate(['cargo/update/', cargoId]);
    });
  }

  deleteCargo(cargoId: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this cargo?')
      .then((confirmed) => {
        if (confirmed) {
          this.cargoService.cargoDelete(cargoId).subscribe(cargo => {
            //Renew table data after cargo deletion
            this.router.navigate(['cargos']);
          })
        }
        else {
          this.router.navigate(['cargo/details/', cargoId]);
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
