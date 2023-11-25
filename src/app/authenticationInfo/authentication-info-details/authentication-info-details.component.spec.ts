import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationInfoDetailsComponent } from './authentication-info-details.component';

describe('AuthenticationInfoDetailsComponent', () => {
  let component: AuthenticationInfoDetailsComponent;
  let fixture: ComponentFixture<AuthenticationInfoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationInfoDetailsComponent]
    });
    fixture = TestBed.createComponent(AuthenticationInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
