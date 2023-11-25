import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticianCreateComponent } from './logistician-create.component';

describe('LogisticianCreateComponent', () => {
  let component: LogisticianCreateComponent;
  let fixture: ComponentFixture<LogisticianCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticianCreateComponent]
    });
    fixture = TestBed.createComponent(LogisticianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
