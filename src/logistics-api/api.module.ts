import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthenticationInfoService } from './api/authenticationInfo.service';
import { CargoService } from './api/cargo.service';
import { CustomerService } from './api/customer.service';
import { DriverService } from './api/driver.service';
import { LogisticianService } from './api/logistician.service';
import { OrderService } from './api/order.service';
import { TruckService } from './api/truck.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthenticationInfoService,
    CargoService,
    CustomerService,
    DriverService,
    LogisticianService,
    OrderService,
    TruckService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
