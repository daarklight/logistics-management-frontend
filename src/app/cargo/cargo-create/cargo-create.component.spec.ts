import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoCreateComponent } from './cargo-create.component';

describe('CargoCreateComponent', () => {
  let component: CargoCreateComponent;
  let fixture: ComponentFixture<CargoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoCreateComponent]
    });
    fixture = TestBed.createComponent(CargoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
