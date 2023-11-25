import {Component, OnInit, ViewChild} from '@angular/core';
import {Cargo, CargoService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.scss']
})
export class CargoListComponent implements OnInit{
  cargos: Cargo[]
  dataSource: MatTableDataSource<Cargo>
  displayedColumns =
    ['cargoId', 'orderForCargoId', 'cargoName', 'weight', 'startCity', 'startState', 'startAddress',
      'loaded', 'finalCity', 'finalState', 'finalAddress', 'unloaded', 'waypointIndex', 'rideDistanceFromStartPoint',
      'rideDurationFromStartPoint', 'rideDistanceFromPreviousPoint', 'rideDurationFromPreviousPoint',
      'expectedCompletionDateTime', 'realCompletionDateTime'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cargoService: CargoService, private router: Router) {
  }

  ngOnInit(): void {
    this.cargoService.cargosFindAll().subscribe(allCargos => {
      this.cargos = allCargos;
      this.dataSource = new MatTableDataSource(this.cargos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showCargoDetails(cargoId: number) {
    this.cargoService.cargoFindById(cargoId).subscribe(cargoDetails => {
      console.log(cargoDetails);
      this.router.navigate(['cargo/details/', cargoId]);
    });
  }

  updateCargo(cargoId: number){
    this.cargoService.cargoFindById(cargoId).subscribe(cargoDetails => {
      this.router.navigate(['cargo/update/', cargoId]);
    });
  }

  deleteCargo(cargoId: number) {
    this.cargoService.cargoDelete(cargoId).subscribe(cargo => {
      this.cargoService.cargosFindAll().subscribe(allCargos => {
        this.cargos = allCargos;
        this.dataSource = new MatTableDataSource(this.cargos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
}
