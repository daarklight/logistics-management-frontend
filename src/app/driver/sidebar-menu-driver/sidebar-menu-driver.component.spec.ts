import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenuDriverComponent } from './sidebar-menu-driver.component';

describe('SidebarMenuDriverComponent', () => {
  let component: SidebarMenuDriverComponent;
  let fixture: ComponentFixture<SidebarMenuDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMenuDriverComponent]
    });
    fixture = TestBed.createComponent(SidebarMenuDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
