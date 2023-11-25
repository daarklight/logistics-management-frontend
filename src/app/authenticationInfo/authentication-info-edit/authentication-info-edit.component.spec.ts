import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationInfoEditComponent } from './authentication-info-edit.component';

describe('AuthenticationInfoEditComponent', () => {
  let component: AuthenticationInfoEditComponent;
  let fixture: ComponentFixture<AuthenticationInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationInfoEditComponent]
    });
    fixture = TestBed.createComponent(AuthenticationInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
