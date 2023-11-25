import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoEditComponent } from './cargo-edit.component';

describe('CargoEditComponent', () => {
  let component: CargoEditComponent;
  let fixture: ComponentFixture<CargoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoEditComponent]
    });
    fixture = TestBed.createComponent(CargoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
