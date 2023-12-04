import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AuthenticationInfoService,
  AuthenticationInfoToSend, DriverService,
} from "../../logistics-api";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() error: string | null;

  isLoggedIn: boolean;
  username: string;

  user: AuthenticationInfoToSend = new class implements AuthenticationInfoToSend {
    username: string;
    password: string;
  }


  constructor(private authService: AuthenticationInfoService, private router: Router,
              private driverService: DriverService) {
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
      });
  }

  redirectDependingOnTheRole() {
    localStorage.setItem('need-to-reload-page', String(true));

    // NAVIGATE TO ADMIN (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_ADMIN') {

    }

    // NAVIGATE TO LOGISTICIAN (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_LOGISTICIAN') {
      this.router.navigate(['orders']);
    }

    // NAVIGATE TO DRIVER (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_DRIVER') {
      this.router.navigate(['driver/details/', "153067"]); //TODO: DELETE WHEN ENDPOINT IS READY TO USE

      // this.driverService.driverFindByUsername(this.username).subscribe(foundDriver => {  //TODO: UNCOMMENT WHEN ENDPOINT IS READY TO USE
      //     this.router.navigate(['driver/details/', foundDriver.personalNumber]);
      // });
    }

    // NAVIGATE TO CUSTOMER (AFTER AUTH)
    if (localStorage.getItem('role') === 'ROLE_CUSTOMER') {

    }
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
      Validators.pattern("[A-Za-z1-9_]+")]), //TODO check
  })

  get userUsername() {
    return this.userAuthValidation.get('userUsername')
  }

  get userPassword() {
    return this.userAuthValidation.get('userPassword')
  }


}
