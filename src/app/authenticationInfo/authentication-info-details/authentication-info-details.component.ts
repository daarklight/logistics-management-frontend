import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationInfo, AuthenticationInfoService} from "../../../logistics-api";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-authentication-info-details',
  templateUrl: './authentication-info-details.component.html',
  styleUrls: ['./authentication-info-details.component.scss']
})
export class AuthenticationInfoDetailsComponent implements OnInit {

  id: number;
  authenticationInfo: AuthenticationInfo;
  errorMessage: string;
  isError: boolean;

  constructor(private route: ActivatedRoute, private authenticationInfoService: AuthenticationInfoService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.authenticationInfoService.authenticationInfoFindById(this.id).subscribe(authenticationInfoDetails => {
      this.isError = false;
      this.authenticationInfo = authenticationInfoDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }

  updateAuthenticationInfo(id: number){
    this.authenticationInfoService.authenticationInfoFindById(id).subscribe(authenticationInfoDetails => {
      this.router.navigate(['authenticationInfo/update/', id]);
    });
  }




  deleteAuthenticationInfo(id: number) {
    this.confirmationDialogService.confirm('Do you really want to delete this authentication info?')
      .then((confirmed) => {
        if (confirmed) {
          this.authenticationInfoService.authenticationInfoDelete(id).subscribe(authenticationInfo => {
            //Renew table data after authenticationInfo deletion
            this.router.navigate(['authenticationInfo']);
          })
        }
        else {
          this.router.navigate(['authenticationInfo/details/', id]);
        }
      })
  }

}

