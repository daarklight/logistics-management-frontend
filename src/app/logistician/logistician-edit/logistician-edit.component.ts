import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LogisticianService, UpdateLogistician} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-logistician-edit',
  templateUrl: './logistician-edit.component.html',
  styleUrls: ['./logistician-edit.component.scss']
})
export class LogisticianEditComponent {
  id: number;
  errorMessage: string;
  isError: boolean;

  logisticianUpdate: UpdateLogistician = new class implements UpdateLogistician {
    name: string;
    surname: string;
  }

  constructor(private logisticianService: LogisticianService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.logisticianService.logisticianFindById(this.id).subscribe(logisticianResponse => {
      this.logisticianUpdate = logisticianResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.logisticianService.logisticianUpdate(this.logisticianUpdate, this.id).subscribe(updatedLogistician => {
      console.log(updatedLogistician);
      this.router.navigate(['logistician/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  logisticianValidation = new FormGroup({
    nameCheck: new FormControl(this.logisticianUpdate.name, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
    surnameCheck: new FormControl(this.logisticianUpdate.surname, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern("[A-Za-z\\d\\s]+")]),
  });

  get nameCheck() {
    return this.logisticianValidation.get('nameCheck')
  }
  get surnameCheck() {
    return this.logisticianValidation.get('surnameCheck')
  }
}
