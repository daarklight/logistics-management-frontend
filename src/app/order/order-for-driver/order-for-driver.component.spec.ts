import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderForDriverComponent } from './order-for-driver.component';

describe('OrderForDriverComponent', () => {
  let component: OrderForDriverComponent;
  let fixture: ComponentFixture<OrderForDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderForDriverComponent]
    });
    fixture = TestBed.createComponent(OrderForDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
