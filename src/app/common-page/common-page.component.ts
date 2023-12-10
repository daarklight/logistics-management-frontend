import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {Driver, DriverService, OrderService} from "../../logistics-api";

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

  driver: Driver;

  constructor(private orderService: OrderService, private driverService: DriverService,
              private observer: BreakpointObserver, private router: Router) {
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
    console.log("Common page : " + this.isLoggedIn + " role: " + this.userRole);

    //console.log('username: ' + localStorage.getItem('username')!);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // OLD VARIANT:
    // this.driverService.driverFindByUsername(localStorage.getItem('username')!).subscribe(driver => {
    //   this.driver = driver;
    //   //console.log('number: ' + driver.personalNumber)
    // })
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // NEW VARIANT TO INVESTIGATE:
    console.log('local storage results for role: ' + localStorage.getItem("role"));
    if (this.userRole = 'ROLE_DRIVER') {
      console.log('We think this is driver in method ngOnInit() - before driver service...')
      this.driverService.driverFindByUsername(localStorage.getItem('username')!).subscribe(driver => {
        this.driver = driver;
        console.log('We think this is driver in method ngOnInit() - after driver service...')
        //console.log('number: ' + driver.personalNumber)
      })
    }else{
      console.log('We DO NOT think that this is driver')
    }



  }

  // findOrderForDriver(){
  //   this.driverService.driverFindByUsername(localStorage.getItem('username')!).subscribe(driver =>{
  //     this.orderService.orderFindByDriver(driver.personalNumber!).subscribe(order =>
  //       this.router.navigate(['order/forDriver']))
  //   })
  //
  //   // localStorage.getItem("order-id")!
  //   //
  //   // this.orderService.orderFindByDriver().subscribe(orderDetails => {
  //   //   this.router.navigate(['order/update/', orderId]);
  //   // });
  // }


  logOut() {
    //localStorage.clear();
    this.isLoggedIn = "false";
    this.userRole = '';
    localStorage.setItem('auth-token', '');
    localStorage.setItem('is-logged-in', String(false))
    localStorage.setItem('username', '');
    localStorage.setItem('role', '');
    localStorage.setItem('username-name', '');
    localStorage.setItem('username-surname', '');
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

  getCustomerDetails() {
    let customerId = localStorage.getItem('customer-id')!;
    this.router.navigate(['customer/details/', customerId]);
  }

  // getDriverPersonalNumber(): number{
  //   return this.driver.personalNumber!;
  // }

  getDriverPersonalNumber(): number {
    if (this.userRole === 'ROLE_DRIVER') {
      console.log('We think this is driver in method getDriverPersonalNumber()...')
      return this.driver.personalNumber!;
    } else {
      return 0;
    }
  }

  protected readonly localStorage = localStorage;
}
