import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCreateComponent } from './driver-create.component';

describe('DriverCreateComponent', () => {
  let component: DriverCreateComponent;
  let fixture: ComponentFixture<DriverCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverCreateComponent]
    });
    fixture = TestBed.createComponent(DriverCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
