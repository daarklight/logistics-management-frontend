import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DriverService, UpdateDriverByLogistician} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss']
})
export class DriverEditComponent implements OnInit {
  id: number;
  errorMessage: string;
  isError: boolean;

  driverUpdate: UpdateDriverByLogistician = new class implements UpdateDriverByLogistician {
    name: string;
    surname: string;
    phone: string;
    email: string;
    workExperience: number;
    workingHoursInCurrentMonth: number;
    currentCity: string;
    currentState: string;
  }

  constructor(private driverService: DriverService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.driverService.driverFindById(this.id).subscribe(driverResponse => {
      this.driverUpdate = driverResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.driverService.driverUpdateByLogistician(this.driverUpdate, this.id).subscribe(updatedDriver => {
      console.log(updatedDriver);
      this.router.navigate(['driver/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  driverValidation = new FormGroup({
    drName: new FormControl(this.driverUpdate.name, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    drSurname: new FormControl(this.driverUpdate.surname, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    drPhone: new FormControl(this.driverUpdate.phone, [
      Validators.required,
      Validators.maxLength(19),
      Validators.pattern("^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$")]),
    drEmail: new FormControl(this.driverUpdate.email, [
      Validators.required,
      Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
    drWorkExperience: new FormControl(this.driverUpdate.workExperience, [
      Validators.required,
      Validators.min(1),
      Validators.max(57),
      Validators.pattern("\\d+")]),
    drWorkingHoursInCurrentMonth: new FormControl(this.driverUpdate.workingHoursInCurrentMonth, [
      Validators.required,
      Validators.min(0),
      Validators.max(176),
      Validators.pattern("\\d+")]),
    drCurrentCity: new FormControl(this.driverUpdate.currentCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    drCurrentState: new FormControl(this.driverUpdate.currentState, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
  });

  get drAuthenticationId() {
    return this.driverValidation.get('drAuthenticationId')
  }

  get drName() {
    return this.driverValidation.get('drName')
  }

  get drSurname() {
    return this.driverValidation.get('drSurname')
  }

  get drPhone() {
    return this.driverValidation.get('drPhone')
  }

  get drEmail() {
    return this.driverValidation.get('drEmail')
  }

  get drWorkExperience() {
    return this.driverValidation.get('drWorkExperience')
  }

  get drWorkingHoursInCurrentMonth() {
    return this.driverValidation.get('drWorkingHoursInCurrentMonth')
  }

  get drCurrentCity() {
    return this.driverValidation.get('drCurrentCity')
  }

  get drCurrentState() {
    return this.driverValidation.get('drCurrentState')
  }
}
