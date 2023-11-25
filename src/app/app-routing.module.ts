import {NgModule, OnInit} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import {TruckEditComponent} from "./truck/truck-edit/truck-edit.component";
import {TruckDetailsComponent} from "./truck/truck-details/truck-details.component";
import {TruckCreateComponent} from "./truck/truck-create/truck-create.component";
import {TruckListComponent} from "./truck/truck-list/truck-list.component";

const routes: Routes = [
  {path: 'authenticationInfo', component: AuthenticationInfoListComponent},
  {path: '', redirectTo: 'authenticationInfo', pathMatch: 'full'},
  {path: 'authenticationInfo/create', component: AuthenticationInfoCreateComponent},
  {path: '', redirectTo: 'authenticationInfo/create', pathMatch: 'full'},
  {path: 'authenticationInfo/details/:id', component: AuthenticationInfoDetailsComponent},
  {path: '', redirectTo: 'authenticationInfo/details/:id', pathMatch: 'full'},
  {path: 'authenticationInfo/update/:id', component: AuthenticationInfoEditComponent},
  {path: '', redirectTo: 'authenticationInfo/update/:id', pathMatch: 'full'},

  {path: 'cargos', component: CargoListComponent},
  {path: '', redirectTo: 'cargos', pathMatch: 'full'},
  {path: 'cargo/create', component: CargoCreateComponent},
  {path: '', redirectTo: 'cargo/create', pathMatch: 'full'},
  {path: 'cargo/details/:id', component: CargoDetailsComponent},
  {path: '', redirectTo: 'cargo/details/:id', pathMatch: 'full'},
  {path: 'cargo/update/:id', component: CargoEditComponent},
  {path: '', redirectTo: 'cargo/update/:id', pathMatch: 'full'},

  {path: 'customers', component: CustomerListComponent},
  {path: '', redirectTo: 'customers', pathMatch: 'full'},
  {path: 'customer/create', component: CustomerCreateComponent},
  {path: '', redirectTo: 'customer/create', pathMatch: 'full'},
  {path: 'customer/details/:id', component: CustomerDetailsComponent},
  {path: '', redirectTo: 'customer/details/:id', pathMatch: 'full'},
  {path: 'customer/update/:id', component: CustomerEditComponent},
  {path: '', redirectTo: 'customer/update/:id', pathMatch: 'full'},

  {path: 'drivers', component: DriverListComponent},
  {path: '', redirectTo: 'drivers', pathMatch: 'full'},
  {path: 'driver/create', component: DriverCreateComponent},
  {path: '', redirectTo: 'driver/create', pathMatch: 'full'},
  {path: 'driver/details/:id', component: DriverDetailsComponent},
  {path: '', redirectTo: 'driver/details/:id', pathMatch: 'full'},
  {path: 'driver/update/:id', component: DriverEditComponent},
  {path: '', redirectTo: 'driver/update/:id', pathMatch: 'full'},

  {path: 'logisticians', component: LogisticianListComponent},
  {path: '', redirectTo: 'logisticians', pathMatch: 'full'},
  {path: 'logistician/create', component: LogisticianCreateComponent},
  {path: '', redirectTo: 'logistician/create', pathMatch: 'full'},
  {path: 'logistician/details/:id', component: LogisticianDetailsComponent},
  {path: '', redirectTo: 'logistician/details/:id', pathMatch: 'full'},
  {path: 'logistician/update/:id', component: LogisticianEditComponent},
  {path: '', redirectTo: 'logistician/update/:id', pathMatch: 'full'},

  {path: 'orders', component: OrderListComponent},
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'order/create', component: OrderCreateComponent},
  {path: '', redirectTo: 'order/create', pathMatch: 'full'},
  {path: 'order/details/:id', component: OrderDetailsComponent},
  {path: '', redirectTo: 'order/details/:id', pathMatch: 'full'},
  {path: 'order/update/:id', component: OrderEditComponent},
  {path: '', redirectTo: 'order/update/:id', pathMatch: 'full'},

  {path: 'trucks', component: TruckListComponent},
  {path: '', redirectTo: 'trucks', pathMatch: 'full'},
  {path: 'truck/create', component: TruckCreateComponent},
  {path: '', redirectTo: 'truck/create', pathMatch: 'full'},
  {path: 'truck/details/:id', component: TruckDetailsComponent},
  {path: '', redirectTo: 'truck/details/:id', pathMatch: 'full'},
  {path: 'truck/update/:id', component: TruckEditComponent},
  {path: '', redirectTo: 'truck/update/:id', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit{

  //TODO:здесь будет логика по выводу страницы авторизации
  // и роутинга на страницу админа, логиста или драйвера в зависимости от роли
  // или вывод ошибки о провальной авторизации
  ngOnInit(): void {
  }



}
