import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProperComponent } from './driver-proper.component';

describe('DriverProperComponent', () => {
  let component: DriverProperComponent;
  let fixture: ComponentFixture<DriverProperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverProperComponent]
    });
    fixture = TestBed.createComponent(DriverProperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
