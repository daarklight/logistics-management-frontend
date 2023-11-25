import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticianListComponent } from './logistician-list.component';

describe('LogisticianListComponent', () => {
  let component: LogisticianListComponent;
  let fixture: ComponentFixture<LogisticianListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticianListComponent]
    });
    fixture = TestBed.createComponent(LogisticianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
