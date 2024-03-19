import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationsComponent } from './user-applications.component';

describe('ApplicationsComponent', () => {
  let component: UserApplicationsComponent;
  let fixture: ComponentFixture<UserApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
