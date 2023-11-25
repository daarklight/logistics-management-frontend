export * from './authenticationInfo.service';
import { AuthenticationInfoService } from './authenticationInfo.service';
export * from './cargo.service';
import { CargoService } from './cargo.service';
export * from './customer.service';
import { CustomerService } from './customer.service';
export * from './driver.service';
import { DriverService } from './driver.service';
export * from './logistician.service';
import { LogisticianService } from './logistician.service';
export * from './order.service';
import { OrderService } from './order.service';
export * from './truck.service';
import { TruckService } from './truck.service';
export const APIS = [AuthenticationInfoService, CargoService, CustomerService, DriverService, LogisticianService, OrderService, TruckService];
