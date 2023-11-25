import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationInfoListComponent } from './authentication-info-list.component';

describe('AuthenticationInfoListComponent', () => {
  let component: AuthenticationInfoListComponent;
  let fixture: ComponentFixture<AuthenticationInfoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationInfoListComponent]
    });
    fixture = TestBed.createComponent(AuthenticationInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
