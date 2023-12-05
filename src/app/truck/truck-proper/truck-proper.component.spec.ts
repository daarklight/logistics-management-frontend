import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckProperComponent } from './truck-proper.component';

describe('TruckProperComponent', () => {
  let component: TruckProperComponent;
  let fixture: ComponentFixture<TruckProperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruckProperComponent]
    });
    fixture = TestBed.createComponent(TruckProperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
