import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrdersListComponent } from './customer-orders-list.component';

describe('CustomerOrdersListComponent', () => {
  let component: CustomerOrdersListComponent;
  let fixture: ComponentFixture<CustomerOrdersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerOrdersListComponent]
    });
    fixture = TestBed.createComponent(CustomerOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
