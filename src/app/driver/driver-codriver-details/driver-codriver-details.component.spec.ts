import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCodriverDetailsComponent } from './driver-codriver-details.component';

describe('DriverCodriverDetailsComponent', () => {
  let component: DriverCodriverDetailsComponent;
  let fixture: ComponentFixture<DriverCodriverDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverCodriverDetailsComponent]
    });
    fixture = TestBed.createComponent(DriverCodriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
