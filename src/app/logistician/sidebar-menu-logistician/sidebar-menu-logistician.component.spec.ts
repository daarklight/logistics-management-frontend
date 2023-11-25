import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuLogisticianComponent } from './sidebar-menu-logistician.component';

describe('SidebarMenuLogisticianComponent', () => {
  let component: SidebarMenuLogisticianComponent;
  let fixture: ComponentFixture<SidebarMenuLogisticianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMenuLogisticianComponent]
    });
    fixture = TestBed.createComponent(SidebarMenuLogisticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
