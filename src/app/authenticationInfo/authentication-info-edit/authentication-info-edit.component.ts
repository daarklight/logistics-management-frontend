import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationInfo, AuthenticationInfoService} from "../../../logistics-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication-info-edit',
  templateUrl: './authentication-info-edit.component.html',
  styleUrls: ['./authentication-info-edit.component.scss']
})
export class AuthenticationInfoEditComponent {
  id: number;
  errorMessage: string;
  isError: boolean;

  authenticationInfoUpdate: AuthenticationInfo = new class implements AuthenticationInfo{
    login: string;
    password: string;
  }

  constructor(private authenticationInfoService: AuthenticationInfoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.authenticationInfoService.authenticationInfoFindById(this.id).subscribe(authenticationInfoResponse => {
      this.authenticationInfoUpdate = authenticationInfoResponse;
      this.isError = false;
    }, error => {
      this.isError = true;
      this.errorMessage = error.error.message;
    });
  }

  onSubmit() {
    this.authenticationInfoService.authenticationInfoUpdate(this.authenticationInfoUpdate, this.id).subscribe(updatedAuthenticationInfo => {
      console.log(updatedAuthenticationInfo);
      this.router.navigate(['authenticationInfo/details/', this.id]);
    }, error => console.log(error));
  }

  //----------------- VALIDATION----------------------------
  authenticationInfoValidation = new FormGroup({
    loginCheck: new FormControl(this.authenticationInfoUpdate.login, [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern("[A-Za-z1-9_]+")]),
    passwordCheck: new FormControl(this.authenticationInfoUpdate.password, [
      Validators.required]),
  });

  get idCheck() {
    return this.authenticationInfoValidation.get('idCheck')
  }
  get loginCheck() {
    return this.authenticationInfoValidation.get('loginCheck')
  }
  get passwordCheck() {
    return this.authenticationInfoValidation.get('passwordCheck')
  }
}
