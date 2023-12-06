import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CargoService, UpdateCargoByLogistician} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cargo-edit',
  templateUrl: './cargo-edit.component.html',
  styleUrls: ['./cargo-edit.component.scss']
})
export class CargoEditComponent implements OnInit {
  id: number;
  errorMessage: string;
  isError: boolean;

  cargoUpdate: UpdateCargoByLogistician = new class implements UpdateCargoByLogistician {
    cargoName: string;
    weight: number;
    startCity: string;
    startState: string;
    startAddress: string;
    finalCity: string;
    finalState: string;
    finalAddress: string;
  }


  constructor(private cargoService: CargoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cargoService.cargoFindById(this.id).subscribe(cargoResponse => {
      this.cargoUpdate = cargoResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.cargoService.cargoUpdateByLogistician(this.cargoUpdate, this.id).subscribe(updatedCargo => {
      console.log(updatedCargo);
      this.router.navigate(['cargo/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  cargoValidation = new FormGroup({
    cargoNameCheck: new FormControl(this.cargoUpdate.cargoName, [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    weightCheck: new FormControl(this.cargoUpdate.weight, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(30.0),
      Validators.pattern("[+]?[0-9]*\\.?[0-9]+")]),
    startCityCheck: new FormControl(this.cargoUpdate.startCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    startStateCheck: new FormControl(this.cargoUpdate.startState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z.\\s]+")]),
    startAddressCheck: new FormControl(this.cargoUpdate.startAddress, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("A-Za-z#,\\d\\s]+")]),
    finalCityCheck: new FormControl(this.cargoUpdate.finalCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    finalStateCheck: new FormControl(this.cargoUpdate.finalState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z.\\s]+")]),
    finalAddressCheck: new FormControl(this.cargoUpdate.finalAddress, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("A-Za-z#,\\d\\s]+")]),
  });

  get cargoNameCheck() {
    return this.cargoValidation.get('cargoNameCheck')
  }
  get weightCheck() {
    return this.cargoValidation.get('weightCheck')
  }
  get startCityCheck() {
    return this.cargoValidation.get('startCityCheck')
  }
  get startStateCheck() {
    return this.cargoValidation.get('startStateCheck')
  }
  get startAddressCheck() {
    return this.cargoValidation.get('startAddressCheck')
  }
  get finalCityCheck() {
    return this.cargoValidation.get('finalCityCheck')
  }
  get finalStateCheck() {
    return this.cargoValidation.get('finalStateCheck')
  }
  get finalAddressCheck() {
    return this.cargoValidation.get('finalAddressCheck')
  }
}

