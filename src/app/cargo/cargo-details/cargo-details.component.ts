import {Component, OnInit} from '@angular/core';
import {Cargo, CargoService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cargo-details',
  templateUrl: './cargo-details.component.html',
  styleUrls: ['./cargo-details.component.scss']
})
export class CargoDetailsComponent implements OnInit {

  id: number;
  cargo: Cargo;
  errorMessage:String
  isError:boolean

  constructor(private route: ActivatedRoute, private cargoService: CargoService, private router: Router) {
  }

  ngOnInit(): void {
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
