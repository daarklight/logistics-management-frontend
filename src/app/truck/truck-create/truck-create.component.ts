import { Component } from '@angular/core';
import {CreateTruck, TruckService} from "../../../logistics-api";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.scss']
})
export class TruckCreateComponent {

  errorMessage: String
  isError: boolean
  truck: CreateTruck = new class implements CreateTruck {
    number: string;
    model: string;
    capacity: number;
    totalOperatingTime: number;
    currentCity: string
    currentState: string;
  }

  constructor(private truckService: TruckService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.truck)
  }

  onSubmit() {
    this.truckService.truckCreate(this.truck).subscribe(createdTruck => {
        this.isError = false;
        console.log(createdTruck)
        this.router.navigate(['truck/details/', this.truck.number]);
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      })
  }

  //----------------- VALIDATION----------------------------
  truckValidation = new FormGroup({
    numberCheck: new FormControl(this.truck.number, [
      Validators.required,
      Validators.pattern("[A-Z]{3}\\d{4}")]),
    modelCheck: new FormControl(this.truck.model, [
      Validators.required,
      Validators.maxLength(30)]),
    capacityCheck: new FormControl(this.truck.capacity, [
      Validators.required,
      Validators.min(0.1),
      Validators.max(30.0),
      Validators.pattern("[+]?[0-9]*\\.?[0-9]+")]),
    totalOperatingTimeCheck: new FormControl(this.truck.totalOperatingTime, [
      Validators.required,
      Validators.min(0),
      Validators.max(30),
      Validators.pattern("\\d+")]),
    currentCityCheck: new FormControl(this.truck.currentCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    currentStateCheck: new FormControl(this.truck.currentState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
  });

  get numberCheck() {
    return this.truckValidation.get('numberCheck')
  }
  get modelCheck() {
    return this.truckValidation.get('modelCheck')
  }
  get capacityCheck() {
    return this.truckValidation.get('capacityCheck')
  }
  get totalOperatingTimeCheck() {
    return this.truckValidation.get('totalOperatingTimeCheck')
  }
  get currentCityCheck() {
    return this.truckValidation.get('currentCityCheck')
  }
  get currentStateCheck() {
    return this.truckValidation.get('currentStateCheck')
  }
}
