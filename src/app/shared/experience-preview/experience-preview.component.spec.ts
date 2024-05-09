import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePreviewComponent } from './experience-preview.component';

describe('ExperiencePreviewComponent', () => {
  let component: ExperiencePreviewComponent;
  let fixture: ComponentFixture<ExperiencePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
