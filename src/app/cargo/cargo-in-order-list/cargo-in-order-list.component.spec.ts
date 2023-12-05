import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoInOrderListComponent } from './cargo-in-order-list.component';

describe('CargoInOrderListComponent', () => {
  let component: CargoInOrderListComponent;
  let fixture: ComponentFixture<CargoInOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoInOrderListComponent]
    });
    fixture = TestBed.createComponent(CargoInOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
