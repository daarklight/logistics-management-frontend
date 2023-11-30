import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationInfo, AuthenticationInfoService} from "../../../logistics-api";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication-info-create',
  templateUrl: './authentication-info-create.component.html',
  styleUrls: ['./authentication-info-create.component.scss']
})
export class AuthenticationInfoCreateComponent implements OnInit {
  errorMessage: string;
  isError: boolean;
  authenticationInfo: AuthenticationInfo = new class implements AuthenticationInfo {
    id: number;
    login: string;
    password: string;
  }

  constructor(private authenticationInfoService: AuthenticationInfoService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.authenticationInfo)
  }

  onSubmit() {
    this.authenticationInfoService.authenticationInfoCreate(this.authenticationInfo).subscribe(createdAuthenticationInfo => {
        this.isError = false;
        console.log(createdAuthenticationInfo)
        this.router.navigate(['authenticationInfo/details/', createdAuthenticationInfo.id]);
      },
      error => {
        this.isError = true;
        this.errorMessage = error.error.message;
        //TODO: redirect to the page with error (make component to show error)
        //redirect to view all authenticationInfos (button Show Details)
      })
  }


  //protected readonly onsubmit = onsubmit;


  //----------------- VALIDATION----------------------------
  authenticationInfoValidation = new FormGroup({
    idCheck: new FormControl(this.authenticationInfo.id, [
      Validators.required,
      Validators.min(1),
      Validators.pattern("\\d+")]),
    usernameCheck: new FormControl(this.authenticationInfo.username, [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern("[A-Za-z1-9_]+")]),
    passwordCheck: new FormControl(this.authenticationInfo.password, [
      Validators.required]),
  });

  get idCheck() {
    return this.authenticationInfoValidation.get('idCheck')
  }
  get loginCheck() {
    return this.authenticationInfoValidation.get('usernameCheck')
  }
  get passwordCheck() {
    return this.authenticationInfoValidation.get('passwordCheck')
  }
}
