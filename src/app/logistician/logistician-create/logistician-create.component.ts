import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateLogistician, LogisticianService} from "../../../logistics-api";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logistician-create',
  templateUrl: './logistician-create.component.html',
  styleUrls: ['./logistician-create.component.scss']
})
export class LogisticianCreateComponent implements OnInit {
  errorMessage: String
  isError: boolean
  logistician: CreateLogistician = new class implements CreateLogistician {
    logisticianAuthenticationId: number;
    name: string;
    surname: string;
  }

  constructor(private logisticianService: LogisticianService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.logistician)
  }

  onSubmit() {
    this.logisticianService.logisticianCreate(this.logistician).subscribe(createdLogistician => {
        this.isError = false;
        console.log(createdLogistician)
        this.router.navigate(['logistician/details/', createdLogistician.personalNumber]);
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
        //TODO: redirect to the page with error (make component to show error)
        //redirect to view all logisticians (button Show Details)
      })
  }


  //protected readonly onsubmit = onsubmit;


  //----------------- VALIDATION----------------------------
  logisticianValidation = new FormGroup({
    authenticationIdCheck: new FormControl(this.logistician.logisticianAuthenticationId, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    nameCheck: new FormControl(this.logistician.name, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    surnameCheck: new FormControl(this.logistician.surname, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
  });

  get authenticationIdCheck() {
    return this.logisticianValidation.get('authenticationIdCheck')
  }
  get nameCheck() {
    return this.logisticianValidation.get('nameCheck')
  }
  get surnameCheck() {
    return this.logisticianValidation.get('surnameCheck')
  }
}
