import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticianDetailsComponent } from './logistician-details.component';

describe('LogisticianDetailsComponent', () => {
  let component: LogisticianDetailsComponent;
  let fixture: ComponentFixture<LogisticianDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticianDetailsComponent]
    });
    fixture = TestBed.createComponent(LogisticianDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
