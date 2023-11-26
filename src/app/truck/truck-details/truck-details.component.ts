import {Component, OnInit} from '@angular/core';
import {Truck, TruckService} from "../../../logistics-api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.scss']
})
export class TruckDetailsComponent implements OnInit {

  id: string;
  truck: Truck;
  errorMessage:String
  isError:boolean

  constructor(private route: ActivatedRoute, private truckService: TruckService, private router: Router) {
  }

  ngOnInit(): void {
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
    this.truckService.truckDelete(number).subscribe(truck => {
      this.router.navigate(['trucks']);
    })
  }

}
