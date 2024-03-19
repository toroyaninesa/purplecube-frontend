import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleApplicantComponent } from './single-applicant.component';

describe('SingleApplicantComponent', () => {
  let component: SingleApplicantComponent;
  let fixture: ComponentFixture<SingleApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleApplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
