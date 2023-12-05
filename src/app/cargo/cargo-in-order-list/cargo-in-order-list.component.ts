import {Component, ViewChild} from '@angular/core';
import {Cargo, CargoService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-cargo-in-order-list',
  templateUrl: './cargo-in-order-list.component.html',
  styleUrls: ['./cargo-in-order-list.component.scss']
})
export class CargoInOrderListComponent {
  cargos: Cargo[]
  dataSource: MatTableDataSource<Cargo>
  displayedColumns =
    ['cargoId', 'orderForCargoId', 'cargoName', 'weight', 'startCity', 'startState', 'startAddress',
      'loaded', 'finalCity', 'finalState', 'finalAddress', 'unloaded', 'waypointIndex', 'rideDistanceFromStartPoint',
      'rideDurationFromStartPoint', 'rideDistanceFromPreviousPoint', 'rideDurationFromPreviousPoint',
      'expectedCompletionDateTime', 'realCompletionDateTime', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cargoService: CargoService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {

    // this.cargoService.cargosFindAll().subscribe(allCargos => {
    //   this.cargos = allCargos;
    //   this.dataSource = new MatTableDataSource(this.cargos);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })

    let orderIdResult: number = Number(localStorage.getItem('order-id'));

    this.cargoService.cargoFindByOrderId(orderIdResult).subscribe(allCargos => {
      this.cargos = allCargos;
      this.dataSource = new MatTableDataSource(this.cargos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
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
    this.confirmationDialogService.confirm('Do you really want to delete this cargo?')
      .then((confirmed) => {
        if (confirmed) {
          this.cargoService.cargoDelete(cargoId).subscribe(cargo => {
            //Renew table data after cargo deletion
            this.cargoService.cargosFindAll().subscribe(allCargos => {
              this.cargos = allCargos;
              this.dataSource = new MatTableDataSource(this.cargos);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          })
        }
        else {
          this.cargoService.cargosFindAll().subscribe(allCargos => {
            this.cargos = allCargos;
            this.dataSource = new MatTableDataSource(this.cargos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
  }

}
