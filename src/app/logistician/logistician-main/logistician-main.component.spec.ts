import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticianMainComponent } from './logistician-main.component';

describe('LogisticianMainComponent', () => {
  let component: LogisticianMainComponent;
  let fixture: ComponentFixture<LogisticianMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticianMainComponent]
    });
    fixture = TestBed.createComponent(LogisticianMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
