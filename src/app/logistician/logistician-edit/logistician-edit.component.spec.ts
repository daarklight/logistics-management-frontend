import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticianEditComponent } from './logistician-edit.component';

describe('LogisticianEditComponent', () => {
  let component: LogisticianEditComponent;
  let fixture: ComponentFixture<LogisticianEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticianEditComponent]
    });
    fixture = TestBed.createComponent(LogisticianEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
