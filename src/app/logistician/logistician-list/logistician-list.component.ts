import {Component, OnInit, ViewChild} from '@angular/core';
import {Logistician, LogisticianService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-logistician-list',
  templateUrl: './logistician-list.component.html',
  styleUrls: ['./logistician-list.component.scss']
})
export class LogisticianListComponent implements OnInit {
  logisticians: Logistician[]
  dataSource: MatTableDataSource<Logistician>
  displayedColumns =
    ['personalNumber', 'name', 'surname', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private logisticianService: LogisticianService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('need-to-reload-page') === String(true)) { //To show sidebar
      console.log("HELLO")
      localStorage.setItem('need-to-reload-page', String(false));
      location.reload();
    }
    this.logisticianService.logisticiansFindAll().subscribe(allLogisticians => {
      this.logisticians = allLogisticians;
      this.dataSource = new MatTableDataSource(this.logisticians);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showLogisticianDetails(personalNumber: number) {
    this.logisticianService.logisticianFindById(personalNumber).subscribe(logisticianDetails => {
      console.log(logisticianDetails);
      this.router.navigate(['logistician/details/', personalNumber]);
    });
  }

  updateLogistician(personalNumber: number){
    this.logisticianService.logisticianFindById(personalNumber).subscribe(logisticianDetails => {
      this.router.navigate(['logistician/update/', personalNumber]);
    });
  }

  deleteLogistician(personalNumber: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this logistician?')
      .then((confirmed) => {
        if (confirmed) {
          this.logisticianService.logisticianDelete(personalNumber).subscribe(logistician => {
            //Renew table data after logistician deletion
            this.logisticianService.logisticiansFindAll().subscribe(allLogisticians => {
              this.logisticians = allLogisticians;
              this.dataSource = new MatTableDataSource(this.logisticians);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          })
        }
        else {
          this.logisticianService.logisticiansFindAll().subscribe(allLogisticians => {
            this.logisticians = allLogisticians;
            this.dataSource = new MatTableDataSource(this.logisticians);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
  }

}
