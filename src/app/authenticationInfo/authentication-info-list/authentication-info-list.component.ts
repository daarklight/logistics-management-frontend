import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationInfo, AuthenticationInfoService} from "../../../logistics-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-authentication-info-list',
  templateUrl: './authentication-info-list.component.html',
  styleUrls: ['./authentication-info-list.component.scss']
})
export class AuthenticationInfoListComponent implements OnInit {
  authenticationInfos: AuthenticationInfo[]
  dataSource: MatTableDataSource<AuthenticationInfo>
  displayedColumns =
    ['id', 'login', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authenticationInfoService: AuthenticationInfoService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.authenticationInfoService.authenticationInfoFindAll().subscribe(allAuthenticationInfos => {
      this.authenticationInfos = allAuthenticationInfos;
      this.dataSource = new MatTableDataSource(this.authenticationInfos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showAuthenticationInfoDetails(id: number) {
    this.authenticationInfoService.authenticationInfoFindById(id).subscribe(authenticationInfoDetails => {
      console.log(authenticationInfoDetails);
      this.router.navigate(['authenticationInfo/details/', id]);
    });
  }

  updateAuthenticationInfo(id: number){
    this.authenticationInfoService.authenticationInfoFindById(id).subscribe(authenticationInfoDetails => {
      this.router.navigate(['authenticationInfo/update/', id]);
    });
  }

  deleteAuthenticationInfo(personalNumber: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this authentication info?')
      .then((confirmed) => {
        if (confirmed) {
          this.authenticationInfoService.authenticationInfoDelete(personalNumber).subscribe(authenticationInfo => {
            //Renew table data after authenticationInfo deletion
            this.authenticationInfoService.authenticationInfoFindAll().subscribe(allAuthenticationInfos => {
              this.authenticationInfos = allAuthenticationInfos;
              this.dataSource = new MatTableDataSource(this.authenticationInfos);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
          })
        }
        else {
          this.authenticationInfoService.authenticationInfoFindAll().subscribe(allAuthenticationInfos => {
            this.authenticationInfos = allAuthenticationInfos;
            this.dataSource = new MatTableDataSource(this.authenticationInfos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      })
  }

}

