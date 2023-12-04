import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DriverCreateComponent} from "./driver/driver-create/driver-create.component";
import {DriverDetailsComponent} from "./driver/driver-details/driver-details.component";
import {DriverEditComponent} from "./driver/driver-edit/driver-edit.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {OrderCreateComponent} from "./order/order-create/order-create.component";
import {OrderDetailsComponent} from "./order/order-details/order-details.component";
import {OrderEditComponent} from "./order/order-edit/order-edit.component";
import {CargoListComponent} from "./cargo/cargo-list/cargo-list.component";
import {CargoCreateComponent} from "./cargo/cargo-create/cargo-create.component";
import {CargoDetailsComponent} from "./cargo/cargo-details/cargo-details.component";
import {CargoEditComponent} from "./cargo/cargo-edit/cargo-edit.component";
import {
  AuthenticationInfoListComponent
} from "./authenticationInfo/authentication-info-list/authentication-info-list.component";
import {
  AuthenticationInfoCreateComponent
} from "./authenticationInfo/authentication-info-create/authentication-info-create.component";
import {
  AuthenticationInfoDetailsComponent
} from "./authenticationInfo/authentication-info-details/authentication-info-details.component";
import {
  AuthenticationInfoEditComponent
} from "./authenticationInfo/authentication-info-edit/authentication-info-edit.component";
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";
import {CustomerCreateComponent} from "./customer/customer-create/customer-create.component";
import {CustomerDetailsComponent} from "./customer/customer-details/customer-details.component";
import {CustomerEditComponent} from "./customer/customer-edit/customer-edit.component";
import {LogisticianEditComponent} from "./logistician/logistician-edit/logistician-edit.component";
import {LogisticianDetailsComponent} from "./logistician/logistician-details/logistician-details.component";
import {LogisticianCreateComponent} from "./logistician/logistician-create/logistician-create.component";
import {LogisticianListComponent} from "./logistician/logistician-list/logistician-list.component";
import {DriverListComponent} from "./driver/driver-list/driver-list.component";
import {DriverProperComponent} from "./driver/driver-proper/driver-proper.component";
import {TruckEditComponent} from "./truck/truck-edit/truck-edit.component";
import {TruckDetailsComponent} from "./truck/truck-details/truck-details.component";
import {TruckCreateComponent} from "./truck/truck-create/truck-create.component";
import {TruckListComponent} from "./truck/truck-list/truck-list.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthorityGuard} from "./authority-guard";
import {Error403Component} from "./errors/error-403/error-403.component";
import {Error404Component} from "./errors/error-404/error-404.component";
import {ErrorCommonComponent} from "./errors/error-common/error-common.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'authenticationInfo', component: AuthenticationInfoListComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'authenticationInfo', redirectTo: 'authenticationInfo', pathMatch: 'full'},
  {path: 'authenticationInfo/create', component: AuthenticationInfoCreateComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'authenticationInfo/create', redirectTo: 'authenticationInfo/create', pathMatch: 'full'},
  {path: 'authenticationInfo/details/:id', component: AuthenticationInfoDetailsComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'authenticationInfo/details/:id', redirectTo: 'authenticationInfo/details/:id', pathMatch: 'full'},
  {path: 'authenticationInfo/update/:id', component: AuthenticationInfoEditComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'authenticationInfo/update/:id', redirectTo: 'authenticationInfo/update/:id', pathMatch: 'full'},

  {path: 'cargos', component: CargoListComponent},
  {path: 'cargos', redirectTo: 'cargos', pathMatch: 'full'},
  {path: 'cargo/create', component: CargoCreateComponent},
  {path: 'cargo/create', redirectTo: 'cargo/create', pathMatch: 'full'},
  {path: 'cargo/details/:id', component: CargoDetailsComponent},
  {path: 'cargo/details/:id', redirectTo: 'cargo/details/:id', pathMatch: 'full'},
  {path: 'cargo/update/:id', component: CargoEditComponent},
  {path: 'cargo/update/:id', redirectTo: 'cargo/update/:id', pathMatch: 'full'},

  {path: 'customers', component: CustomerListComponent},
  {path: 'customers', redirectTo: 'customers', pathMatch: 'full'},
  {path: 'customer/create', component: CustomerCreateComponent},
  {path: 'customer/create', redirectTo: 'customer/create', pathMatch: 'full'},
  {path: 'customer/details/:id', component: CustomerDetailsComponent},
  {path: 'customer/details/:id', redirectTo: 'customer/details/:id', pathMatch: 'full'},
  {path: 'customer/update/:id', component: CustomerEditComponent},
  {path: 'customer/update/:id', redirectTo: 'customer/update/:id', pathMatch: 'full'},

  {path: 'drivers', component: DriverListComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'drivers', redirectTo: 'drivers', pathMatch: 'full'},
  {path: 'driver/create', component: DriverCreateComponent,  canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'driver/create', redirectTo: 'driver/create', pathMatch: 'full'},
  {path: 'driver/details/:id', component: DriverDetailsComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_DRIVER', 'ROLE_LOGISTICIAN'] }},
  {path: 'driver/details/:id', redirectTo: 'driver/details/:id', pathMatch: 'full'},
  {path: 'driver/update/:id', component: DriverEditComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'driver/update/:id', redirectTo: 'driver/update/:id', pathMatch: 'full'},
  {path: 'drivers/proper', component: DriverProperComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'drivers/proper', redirectTo: 'drivers/proper', pathMatch: 'full'},

  {path: 'logisticians', component: LogisticianListComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'logisticians', redirectTo: 'logisticians', pathMatch: 'full'},
  {path: 'logistician/create', component: LogisticianCreateComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'logistician/create', redirectTo: 'logistician/create', pathMatch: 'full'},
  {path: 'logistician/details/:id', component: LogisticianDetailsComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'logistician/details/:id', redirectTo: 'logistician/details/:id', pathMatch: 'full'},
  {path: 'logistician/update/:id', component: LogisticianEditComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_ADMIN'] }},
  {path: 'logistician/update/:id', redirectTo: 'logistician/update/:id', pathMatch: 'full'},

  {path: 'orders', component: OrderListComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'orders', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'order/create', component: OrderCreateComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'order/create', redirectTo: 'order/create', pathMatch: 'full'},
  {path: 'order/details/:id', component: OrderDetailsComponent},
  {path: 'order/details/:id', redirectTo: 'order/details/:id', pathMatch: 'full'},
  {path: 'order/update/:id', component: OrderEditComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'order/update/:id', redirectTo: 'order/update/:id', pathMatch: 'full'},

  {path: 'trucks', component: TruckListComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'trucks', redirectTo: 'trucks', pathMatch: 'full'},
  {path: 'truck/create', component: TruckCreateComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'truck/create', redirectTo: 'truck/create', pathMatch: 'full'},
  {path: 'truck/details/:id', component: TruckDetailsComponent},
  {path: 'truck/details/:id', redirectTo: 'truck/details/:id', pathMatch: 'full'},
  {path: 'truck/update/:id', component: TruckEditComponent, canActivate: [AuthorityGuard], data: { roles: ['ROLE_LOGISTICIAN'] }},
  {path: 'truck/update/:id', redirectTo: 'truck/update/:id', pathMatch: 'full'},

  {path: 'error/403', component: Error403Component},
  {path: 'error/403', redirectTo: 'error/404', pathMatch: 'full'},
  {path: 'error/404', component: Error404Component},
  {path: 'error/404', redirectTo: 'error/404', pathMatch: 'full'},
  {path: 'error/common', component: ErrorCommonComponent},
  {path: 'error/common', redirectTo: 'error/common', pathMatch: 'full'},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {

  ngOnInit(): void {
  }


}
