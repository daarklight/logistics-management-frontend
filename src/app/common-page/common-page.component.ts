import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.scss']
})
export class CommonPageComponent implements OnInit {

  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

//Authentication and authority logic
  isLoggedIn: string;
  userRole: string;

  constructor(private observer: BreakpointObserver, private router: Router) {
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.isLoggedIn = localStorage.getItem('is-logged-in') || "false";
    this.userRole = localStorage.getItem("role") || '';
    console.log("main: " + this.isLoggedIn + " role: " + this.userRole);
  }


  logOut() {
    this.isLoggedIn = "false";
    this.userRole = '';
    localStorage.setItem('auth-token', '');
    localStorage.setItem('is-logged-in', String(false))
    localStorage.setItem('username', '');
    localStorage.setItem('role', '');
    this.router.navigate(['login']);
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
