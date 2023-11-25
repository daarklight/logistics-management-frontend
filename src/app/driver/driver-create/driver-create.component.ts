import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateDriver, DriverService} from "../../../logistics-api";
import {FormGroup, FormControl, Validators} from '@angular/forms';

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

  constructor(private driverService: DriverService) {
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
    drName: new FormControl(this.driver.name, [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-zA-Z]*")]),
    drSurname: new FormControl(this.driver.name, [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-zA-Z]*")]) //TODO продолжить в таком духе для остальных полей
  });

  get drName() {
    return this.driverValidation.get('drName')
  }

  get drSurname() {
    return this.driverValidation.get('drSurname')
  }

}
