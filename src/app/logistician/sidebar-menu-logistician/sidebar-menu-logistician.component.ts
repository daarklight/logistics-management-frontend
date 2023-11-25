import {BreakpointObserver} from '@angular/cdk/layout';
import {
  Component, OnInit,
  ViewChild,
} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar-menu-logistician',
  templateUrl: './sidebar-menu-logistician.component.html',
  styleUrls: ['./sidebar-menu-logistician.component.scss']
})
export class SidebarMenuLogisticianComponent implements OnInit {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;


  constructor(private observer: BreakpointObserver) {
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

}
