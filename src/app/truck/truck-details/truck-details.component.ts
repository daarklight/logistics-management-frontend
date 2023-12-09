import {Component, OnInit} from '@angular/core';
import {Truck, TruckService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.scss']
})
export class TruckDetailsComponent implements OnInit {

  id: string;
  truck: Truck;
  errorMessage: string;
  isError: boolean;
  userRole: string;

  constructor(private route: ActivatedRoute, private truckService: TruckService, private router: Router,
              private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')!;
    this.id = this.route.snapshot.params['id'];
    this.truckService.truckFindByNumber(this.id).subscribe(truckDetails => {
      this.isError = false;
      this.truck = truckDetails;
    }, error => {
      this.isError = true;
      this.errorMessage = error.message;
      console.log(error)
    });
  }

  updateTruck(number: string){
    this.truckService.truckFindByNumber(number).subscribe(truckDetails => {
      this.router.navigate(['truck/update/', number]);
    });
  }

  deleteTruck(number: string) {
    this.confirmationDialogService.confirm('Do you really want to delete this truck?')
      .then((confirmed) => {
        if (confirmed) {
          this.truckService.truckDelete(number).subscribe(truck => {
            //Renew table data after truck deletion
            this.router.navigate(['trucks']);
          })
        }
        else {
          this.router.navigate(['truck/details/', number]);
        }
      })
  }

}
