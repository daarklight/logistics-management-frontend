import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ApiModule, BASE_PATH} from "../logistics-api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import { LogisticianMainComponent } from './logistician/logistician-main/logistician-main.component';
import { DriverListComponent } from './driver/driver-list/driver-list.component';
import { DriverCreateComponent } from './driver/driver-create/driver-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { SidebarMenuLogisticianComponent } from './logistician/sidebar-menu-logistician/sidebar-menu-logistician.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { DriverEditComponent } from './driver/driver-edit/driver-edit.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { CargoCreateComponent } from './cargo/cargo-create/cargo-create.component';
import { CargoEditComponent } from './cargo/cargo-edit/cargo-edit.component';
import { CargoDetailsComponent } from './cargo/cargo-details/cargo-details.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
import { TruckCreateComponent } from './truck/truck-create/truck-create.component';
import { TruckDetailsComponent } from './truck/truck-details/truck-details.component';
import { TruckEditComponent } from './truck/truck-edit/truck-edit.component';
import { TruckListComponent } from './truck/truck-list/truck-list.component';
import { LogisticianCreateComponent } from './logistician/logistician-create/logistician-create.component';
import { LogisticianDetailsComponent } from './logistician/logistician-details/logistician-details.component';
import { LogisticianEditComponent } from './logistician/logistician-edit/logistician-edit.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AuthenticationInfoCreateComponent } from './authenticationInfo/authentication-info-create/authentication-info-create.component';
import { AuthenticationInfoDetailsComponent } from './authenticationInfo/authentication-info-details/authentication-info-details.component';
import { AuthenticationInfoEditComponent } from './authenticationInfo/authentication-info-edit/authentication-info-edit.component';
import { AuthenticationInfoListComponent } from './authenticationInfo/authentication-info-list/authentication-info-list.component';
import { LogisticianListComponent } from './logistician/logistician-list/logistician-list.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogService} from "./confirmation-dialog/confirmation-dialog.service";

@NgModule({
  declarations: [
    AppComponent,
    LogisticianMainComponent,
    DriverListComponent,
    DriverCreateComponent,
    SidebarMenuLogisticianComponent,
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
    ConfirmationDialogComponent
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
    NgbModule
  ],
  providers: [{
    provide: BASE_PATH, useValue: environment.basePath
  }, ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
