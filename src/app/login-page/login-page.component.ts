import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AuthenticationInfoService,
  AuthenticationInfoToSend, CustomerService, DriverService, LogisticianService,
} from "../../logistics-api";
import {take} from "rxjs";
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() error: string | null;

  isLoggedIn: boolean;
  username: string;
  showErrorMessage: boolean;

  user: AuthenticationInfoToSend = new class implements AuthenticationInfoToSend {
    username: string;
    password: string;
  }


  constructor(private authService: AuthenticationInfoService, private router: Router,
              private driverService: DriverService,
              private logisticianService: LogisticianService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('auth-token') !== '';
    console.log("login-page1: " + this.isLoggedIn);
    localStorage.setItem('is-logged-in', String(this.isLoggedIn));
    console.log("login-page: " + this.isLoggedIn);
  }

  onSubmit() {
    this.authService.authenticationInfoSend(this.user)
      .pipe(take(1))
      .subscribe(response => {
        localStorage.setItem(
          'auth-token',
          response.headers.get('auth-token') || ''
        );

        if (localStorage.getItem('auth-token') !== '') {
          this.showErrorMessage = false;
          this.isLoggedIn = true;
          localStorage.setItem('is-logged-in', String(true));
          localStorage.setItem(
            'username',
            response.headers.get('username') || ''
          );
          localStorage.setItem(
            'role',
            response.headers.get('roles') || ''
          );
        }
        this.redirectDependingOnTheRole();
      }, error => {
        this.showErrorMessage = true;
      });
  }

  onKeyUp() {
    this.showErrorMessage = false;
  }

  redirectDependingOnTheRole() {
    localStorage.setItem('need-to-reload-page', String(true));
    let username = localStorage.getItem('username')!;
    // NAVIGATE TO ADMIN (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.router.navigate(['logisticians']);
    }

    // NAVIGATE TO LOGISTICIAN (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_LOGISTICIAN') {
      this.logisticianService.logisticianFindByUsername(username)
        .subscribe(logistician => {
          localStorage.setItem('username-name', logistician.name!);
          localStorage.setItem('username-surname', logistician.surname!);
          this.router.navigate(['orders']);
        });
    }

    // NAVIGATE TO DRIVER (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_DRIVER') {
      this.driverService.driverFindByUsername(username).subscribe(driver => {
        localStorage.setItem('username-name', driver.name!);
        localStorage.setItem('username-surname', driver.surname!);
        this.router.navigate(['driver/details/', driver.personalNumber]);
      });
    }

    // NAVIGATE TO CUSTOMER (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_CUSTOMER') {
      this.customerService.customerFindByUsername(username).subscribe(customer =>{
        localStorage.setItem('username-name', customer.customerName!);
        this.router.navigate(['customer/orders']);
      });
    }
  }

  function() {
    setTimeout(function () {
      $("#validationAlert2").fadeOut(1500);
    }, 5000)

  }


// ----------------- VALIDATION -----------------------------------------------------
  userAuthValidation = new FormGroup({
    userUsername: new FormControl(this.user.username, [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[A-Za-z1-9_]+")]),
    userPassword: new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern("[A-Za-z1-9_]+")]),
  })

  get userUsername() {
    return this.userAuthValidation.get('userUsername')
  }

  get userPassword() {
    return this.userAuthValidation.get('userPassword')
  }

  protected readonly localStorage = localStorage;
  protected readonly String = String;

}
