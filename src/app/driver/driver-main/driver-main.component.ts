import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.scss']
})
export class DriverMainComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
}
