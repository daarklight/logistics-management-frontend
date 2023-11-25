import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-logistician-main',
  templateUrl: './logistician-main.component.html',
  styleUrls: ['./logistician-main.component.scss']
})
export class LogisticianMainComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

}
