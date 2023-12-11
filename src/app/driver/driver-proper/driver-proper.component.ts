import {Component, ViewChild} from '@angular/core';
import {Driver, DriverService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-driver-proper',
  templateUrl: './driver-proper.component.html',
  styleUrls: ['./driver-proper.component.scss']
})
export class DriverProperComponent {
  drivers: Driver[]
  dataSource: MatTableDataSource<Driver>
  displayedColumns =
    ['personalNumber', 'name', 'surname', 'phone', 'email', 'workExperience', 'workingHoursInCurrentMonth',
      'status', 'busy', 'currentCity', 'currentState', 'currentTruckNumber', 'currentOrderId', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private driverService: DriverService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    let orderIdResult: number = Number(localStorage.getItem('order-id'));
    let cityResult: string = localStorage.getItem('city-item')!;
    let stateResult: string = localStorage.getItem('state-item')!;

    this.driverService.driversFindForOrder(orderIdResult, cityResult, stateResult, 150).subscribe(allDrivers => {
      this.drivers = allDrivers;
      this.dataSource = new MatTableDataSource(this.drivers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showDriverDetails(personalNumber: number) {
    this.driverService.driverFindById(personalNumber).subscribe(driverDetails => {
      console.log(driverDetails);
      this.router.navigate(['driver/details/', personalNumber]);
    });
  }

  updateDriver(personalNumber: number){
    this.driverService.driverFindById(personalNumber).subscribe(driverDetails => {
      this.router.navigate(['driver/update/', personalNumber]);
    });
  }

  assignDriver(personalNumber: number){
    let orderIdResult: number = Number(localStorage.getItem('order-id'));
    this.driverService.driverUpdateCurrentOrder(orderIdResult, personalNumber).subscribe(driverDetails => {
      this.router.navigate(['driver/details/', personalNumber]);
    });
  }

  deleteDriver(personalNumber: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this driver?')
      .then((confirmed) => {
        if (confirmed) {
          this.driverService.driverDelete(personalNumber).subscribe(driver => {
            //Renew table data after driver deletion
            this.driverService.driversFindAll().subscribe(allDrivers => {
              this.drivers = allDrivers;
              this.dataSource = new MatTableDataSource(this.drivers);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          })
        }
        else {
          this.driverService.driversFindAll().subscribe(allDrivers => {
            this.drivers = allDrivers;
            this.dataSource = new MatTableDataSource(this.drivers);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
  }
}
