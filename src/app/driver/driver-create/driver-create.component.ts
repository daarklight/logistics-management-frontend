import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateDriver, DriverService} from "../../../logistics-api";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
  styleUrls: ['./driver-create.component.scss']
})
export class DriverCreateComponent implements OnInit {
  errorMessage: String
  isError: boolean
  driver: CreateDriver = new class implements CreateDriver {
    currentCity: string;
    currentState: string;
    driverAuthenticationId: number;
    name: string;
    surname: string;
    workExperience: number;
    workingHoursInCurrentMonth: number;
  }

  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.driver)
  }

  onSubmit() {
    this.driverService.driverCreate(this.driver).subscribe(createdDriver => {
        this.isError = false;
        console.log(createdDriver)
        //TODO: редиректнуть на страницу с деталями водителя
      },
      error => { //если ошибка
        this.isError = true;
        this.errorMessage = error.error.message;
        //TODO: редиректнуть на страницу с ошибкой (сделать компонент для вывода ошибки)
        //редирект посмотреть на странице вывода всех драйверов (кнопка показать детали)
      })
  }


  //protected readonly onsubmit = onsubmit;


  //----------------- VALIDATION----------------------------
  driverValidation = new FormGroup({
    drAuthenticationId: new FormControl(this.driver.driverAuthenticationId, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    drName: new FormControl(this.driver.name, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    drSurname: new FormControl(this.driver.surname, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    drPhone: new FormControl(this.driver.phone, [
      Validators.required,
      Validators.maxLength(19),
      Validators.pattern("^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$"
        + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$")]),
    drEmail: new FormControl(this.driver.email, [
      Validators.required,
      Validators.pattern("^[A-Za-z0-9+_.-]+@(.+)$")]),
    drWorkExperience: new FormControl(this.driver.workExperience, [
      Validators.required,
      Validators.min(1),
      Validators.max(57),
      Validators.pattern("\\d+")]),
    drWorkingHoursInCurrentMonth: new FormControl(this.driver.workingHoursInCurrentMonth, [
      Validators.required,
      Validators.min(0),
      Validators.max(176),
      Validators.pattern("\\d+")]),
    drCurrentCity: new FormControl(this.driver.currentCity, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern("[A-Za-z\\s]+")]),
    drCurrentState: new FormControl(this.driver.currentState, [
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

  // createDriver(personalNumber: number){
  //   this.driverService.driverCreate().subscribe(driver => {
  //     this.router.navigate(['driver/details/', personalNumber]);
  //   });
  // }

}
