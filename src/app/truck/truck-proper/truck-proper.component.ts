import {Component, ViewChild} from '@angular/core';
import {OrderService, Truck, TruckService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-truck-proper',
  templateUrl: './truck-proper.component.html',
  styleUrls: ['./truck-proper.component.scss']
})
export class TruckProperComponent {
  trucks: Truck[]
  dataSource: MatTableDataSource<Truck>
  displayedColumns =
    ['number', 'model', 'capacity', 'totalOperatingTime', 'technicalCondition', 'busy', 'currentCity',
      'currentState', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private truckService: TruckService, private orderService: OrderService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    let orderIdResult: number = Number(localStorage.getItem('order-id'));
    let cityResult: string = localStorage.getItem('city-item')!;
    let stateResult: string = localStorage.getItem('state-item')!;
    let capacityResult: number = Number(localStorage.getItem('capacity-item'));

    this.truckService.trucksFindForOrder(orderIdResult, cityResult, stateResult, capacityResult).subscribe(allTrucks => {
      this.trucks = allTrucks;
      this.dataSource = new MatTableDataSource(this.trucks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showTruckDetails(number: string) {
    this.truckService.truckFindByNumber(number).subscribe(truckDetails => {
      console.log(truckDetails);
      this.router.navigate(['truck/details/', number]);
    });
  }

  updateTruck(number: string){
    this.truckService.truckFindByNumber(number).subscribe(truckDetails => {
      this.router.navigate(['truck/update/', number]);
    });
  }

  assignTruck(orderId: number, number: string){
    let orderIdResult: number = Number(localStorage.getItem('order-id'));
    this.orderService.orderUpdateAssignedTruckNumber(orderIdResult, number).subscribe(truckDetails => {
      this.router.navigate(['truck/details/', number]);
    });
  }

  deleteTruck(number: string) {
    this.confirmationDialogService.confirm('Do you really want to delete this truck?')
      .then((confirmed) => {
        if (confirmed) {
          this.truckService.truckDelete(number).subscribe(truck => {
            //Renew table data after truck deletion
            this.truckService.trucksFindAll().subscribe(allTrucks => {
              this.trucks = allTrucks;
              this.dataSource = new MatTableDataSource(this.trucks);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          })
        }
        else {
          this.truckService.trucksFindAll().subscribe(allTrucks => {
            this.trucks = allTrucks;
            this.dataSource = new MatTableDataSource(this.trucks);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
  }

}
