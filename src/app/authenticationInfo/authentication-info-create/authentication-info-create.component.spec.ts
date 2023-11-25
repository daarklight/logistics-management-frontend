import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationInfoCreateComponent } from './authentication-info-create.component';

describe('AuthenticationInfoCreateComponent', () => {
  let component: AuthenticationInfoCreateComponent;
  let fixture: ComponentFixture<AuthenticationInfoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationInfoCreateComponent]
    });
    fixture = TestBed.createComponent(AuthenticationInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
