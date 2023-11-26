import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TruckService, UpdateTruckByLogistician} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-truck-edit',
  templateUrl: './truck-edit.component.html',
  styleUrls: ['./truck-edit.component.scss']
})
export class TruckEditComponent implements OnInit {
  id: string;
  errorMessage: string;
  isError: boolean;
  truckUpdate: UpdateTruckByLogistician = new class implements UpdateTruckByLogistician {
    model: string;
    capacity: number;
    totalOperatingTime: number;
    currentCity: string
    currentState: string;
  }

  constructor(private truckService: TruckService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.truckService.truckFindByNumber(this.id).subscribe(truckResponse => {
      this.truckUpdate = truckResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.truckService.truckUpdateByLogistician(this.truckUpdate, this.id).subscribe(updatedTruck => {
      console.log(updatedTruck);
      this.router.navigate(['truck/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  truckValidation = new FormGroup({
    modelCheck: new FormControl(this.truckUpdate.model, [
      Validators.required,
      Validators.maxLength(30)]),
    capacityCheck: new FormControl(this.truckUpdate.capacity, [
      Validators.required,
      Validators.min(0.1),
      Validators.max(30.0),
      Validators.pattern("[+]?[0-9]*\\.?[0-9]+")]),
    totalOperatingTimeCheck: new FormControl(this.truckUpdate.totalOperatingTime, [
      Validators.required,
      Validators.min(0),
      Validators.max(30),
      Validators.pattern("\\d+")]),
    currentCityCheck: new FormControl(this.truckUpdate.currentCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    currentStateCheck: new FormControl(this.truckUpdate.currentState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
  });

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
