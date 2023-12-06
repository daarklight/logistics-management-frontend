import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule, BASE_PATH} from "../logistics-api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {DriverListComponent} from './driver/driver-list/driver-list.component';
import {DriverCreateComponent} from './driver/driver-create/driver-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {DriverEditComponent} from './driver/driver-edit/driver-edit.component';
import {DriverDetailsComponent} from './driver/driver-details/driver-details.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {OrderCreateComponent} from './order/order-create/order-create.component';
import {OrderDetailsComponent} from './order/order-details/order-details.component';
import {OrderEditComponent} from './order/order-edit/order-edit.component';
import {CargoCreateComponent} from './cargo/cargo-create/cargo-create.component';
import {CargoEditComponent} from './cargo/cargo-edit/cargo-edit.component';
import {CargoDetailsComponent} from './cargo/cargo-details/cargo-details.component';
import {CargoListComponent} from './cargo/cargo-list/cargo-list.component';
import {TruckCreateComponent} from './truck/truck-create/truck-create.component';
import {TruckDetailsComponent} from './truck/truck-details/truck-details.component';
import {TruckEditComponent} from './truck/truck-edit/truck-edit.component';
import {TruckListComponent} from './truck/truck-list/truck-list.component';
import {LogisticianCreateComponent} from './logistician/logistician-create/logistician-create.component';
import {LogisticianDetailsComponent} from './logistician/logistician-details/logistician-details.component';
import {LogisticianEditComponent} from './logistician/logistician-edit/logistician-edit.component';
import {CustomerCreateComponent} from './customer/customer-create/customer-create.component';
import {CustomerDetailsComponent} from './customer/customer-details/customer-details.component';
import {CustomerEditComponent} from './customer/customer-edit/customer-edit.component';
import {CustomerListComponent} from './customer/customer-list/customer-list.component';
import {
  AuthenticationInfoCreateComponent
} from './authenticationInfo/authentication-info-create/authentication-info-create.component';
import {
  AuthenticationInfoDetailsComponent
} from './authenticationInfo/authentication-info-details/authentication-info-details.component';
import {
  AuthenticationInfoEditComponent
} from './authenticationInfo/authentication-info-edit/authentication-info-edit.component';
import {
  AuthenticationInfoListComponent
} from './authenticationInfo/authentication-info-list/authentication-info-list.component';
import {LogisticianListComponent} from './logistician/logistician-list/logistician-list.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogService} from "./confirmation-dialog/confirmation-dialog.service";
import {LoginPageComponent} from './login-page/login-page.component';
import {MatCardModule} from "@angular/material/card";
import {AuthInterceptor} from "./login-page/auth.interceptor";
import {CommonPageComponent} from './common-page/common-page.component';
import {Error403Component} from "./errors/error-403/error-403.component";
import {Error404Component} from './errors/error-404/error-404.component';
import {ErrorCommonComponent} from './errors/error-common/error-common.component';
import {ErrorInterceptor} from "./errors/error.interceptor";
import {ToastrModule} from "ngx-toastr";
import { DriverProperComponent } from './driver/driver-proper/driver-proper.component';
import { TruckProperComponent } from './truck/truck-proper/truck-proper.component';
import { CargoInOrderListComponent } from './cargo/cargo-in-order-list/cargo-in-order-list.component';
import { OrderForDriverComponent } from './order/order-for-driver/order-for-driver.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    DriverCreateComponent,
    DriverEditComponent,
    DriverDetailsComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderDetailsComponent,
    OrderEditComponent,
    CargoCreateComponent,
    CargoEditComponent,
    CargoDetailsComponent,
    CargoListComponent,
    TruckCreateComponent,
    TruckDetailsComponent,
    TruckEditComponent,
    TruckListComponent,
    LogisticianCreateComponent,
    LogisticianDetailsComponent,
    LogisticianEditComponent,
    LogisticianListComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    CustomerListComponent,
    AuthenticationInfoCreateComponent,
    AuthenticationInfoDetailsComponent,
    AuthenticationInfoEditComponent,
    AuthenticationInfoListComponent,
    ConfirmationDialogComponent,
    LoginPageComponent,
    CommonPageComponent,
    Error403Component,
    Error404Component,
    ErrorCommonComponent,
    DriverProperComponent,
    TruckProperComponent,
    CargoInOrderListComponent,
    OrderForDriverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    NgbModule,
    MatCardModule,
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.basePath},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
