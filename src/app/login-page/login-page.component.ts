import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AuthenticationInfo,
  AuthenticationInfoService,
  AuthenticationInfoToSend,
  DriverService
} from "../../logistics-api";
import {JwtHelperService} from "@auth0/angular-jwt";
// import localStorage from "$GLOBAL$";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @Input() error: string | null;

  isLoggedIn: boolean = false;
  name = '';
  roles: string[] = [];

  user: AuthenticationInfoToSend = new class implements AuthenticationInfoToSend {
    username: string;
    password: string;
  }


  constructor(private authService: AuthenticationInfoService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('auth-token') !== '') {
      this.isLoggedIn = true;
      this.setName();
    }
  }

  onSubmit() {
    console.log(456456546)
    this.authService.authenticationInfoSend(this.user)
      .pipe(take(1))
      .subscribe((response) => {
        console.log(response)
        // localStorage.setItem(
        //   'auth-token',
        //   response.headers.get('auth-token') || ''
        // );
        // if (localStorage.getItem('auth-token') !== '') {
        //   this.isLoggedIn = true;
        //   this.setName();
        // }
      });
  }





  userAuthValidation = new FormGroup({
    userUsername: new FormControl(this.user.username, [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[A-Za-z1-9_\\s]+")]),
    userPassword: new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("[A-Za-z1-9_\\s]+")]), //TODO check
  })

  get userUsername() {
    return this.userAuthValidation.get('userUsername')
  }

  get userPassword() {
    return this.userAuthValidation.get('userPassword')
  }

  private setName() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(
      localStorage.getItem('auth-token') || ''
    );
    this.name = decodedToken?.sub;
   //this.roles = decodedToken['roles'];
  }


}
