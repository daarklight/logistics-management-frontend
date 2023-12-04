import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCommonComponent } from './error-common.component';

describe('ErrorCommonComponent', () => {
  let component: ErrorCommonComponent;
  let fixture: ComponentFixture<ErrorCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorCommonComponent]
    });
    fixture = TestBed.createComponent(ErrorCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
