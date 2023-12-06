import {Component, OnInit} from '@angular/core';
import {CreateCargo, CargoService} from "../../../logistics-api";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.scss']
})
export class CargoCreateComponent implements OnInit{

  errorMessage: String
  isError: boolean
  cargo: CreateCargo = new class implements CreateCargo {
    orderForCargoId: number;
    cargoName: string;
    weight: number;
    startCity: string;
    startState: string;
    startAddress: string;
    finalCity: string;
    finalState: string;
    finalAddress: string;
  }

  constructor(private cargoService: CargoService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.cargo)
  }

  onSubmit() {
    this.cargoService.cargoCreate(this.cargo).subscribe(createdCargo => {
        this.isError = false;
        console.log(createdCargo)
        this.router.navigate(['cargo/details/', createdCargo.cargoId]);
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      })
  }

  //----------------- VALIDATION----------------------------
  cargoValidation = new FormGroup({
    orderForCargoIdCheck: new FormControl(this.cargo.orderForCargoId, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    cargoNameCheck: new FormControl(this.cargo.cargoName, [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    weightCheck: new FormControl(this.cargo.weight, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(30.0),
      Validators.pattern("[+]?[0-9]*\\.?[0-9]+")]),
    startCityCheck: new FormControl(this.cargo.startCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    startStateCheck: new FormControl(this.cargo.startState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z.\\s]+")]),
    startAddressCheck: new FormControl(this.cargo.startAddress, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("[A-Za-z#,\\d\\s]+")]),
    finalCityCheck: new FormControl(this.cargo.finalCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    finalStateCheck: new FormControl(this.cargo.finalState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z.\\s]+")]),
    finalAddressCheck: new FormControl(this.cargo.finalAddress, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern("[A-Za-z#,\\d\\s]+")]),
  });

  get orderForCargoIdCheck() {
    return this.cargoValidation.get('orderForCargoIdCheck')
  }
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
