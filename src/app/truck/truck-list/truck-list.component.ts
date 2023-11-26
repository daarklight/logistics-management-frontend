import {Component, OnInit, ViewChild} from '@angular/core';
import {Truck, TruckService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit{
  trucks: Truck[]
  dataSource: MatTableDataSource<Truck>
  displayedColumns =
    ['number', 'model', 'capacity', 'totalOperatingTime', 'technicalCondition', 'busy', 'currentCity',
      'currentState', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private truckService: TruckService, private router: Router) {
  }

  ngOnInit(): void {
    this.truckService.trucksFindAll().subscribe(allTrucks => {
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

  deleteTruck(number: string) {
    this.truckService.truckDelete(number).subscribe(cargo => {
      this.truckService.trucksFindAll().subscribe(allTrucks => {
        this.trucks = allTrucks;
        this.dataSource = new MatTableDataSource(this.trucks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
}
