import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {CreateDriver, Driver, DriverService, UpdateDriverByLogistician} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss']
})
export class DriverEditComponent implements OnInit {

  id: number;
  errorMessage: String
  isError: boolean

  driverUpdate: UpdateDriverByLogistician = new class implements UpdateDriverByLogistician {
    name: string;
    surname: string;
    currentCity: string;
    currentState: string;
    currentTruckNumber:string
    workingHoursInCurrentMonth: number;
    workExperience: number;
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

  irAlaListaDeEmpleados() {
    //this.router.navigate(['/empleados']);
    //swal('Empleado actualizado',`El empleado ${this.driver.name} ha sido actualizado con exito`,`success`);
  }

  onSubmit() {
    this.driverService.driverUpdateByLogistician(this.driverUpdate, this.id).subscribe(updatedDriver => {
      console.log(updatedDriver);
      this.router.navigate(['driver/details/', this.id]);
    }, error => console.log(error));
  }


  //------------------VALIDATION--------------------------------
  driverValidation = new FormGroup({
    drName: new FormControl(this.driverUpdate.name, [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-zA-Z]*")]),
    drSurname: new FormControl(this.driverUpdate.name, [
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
