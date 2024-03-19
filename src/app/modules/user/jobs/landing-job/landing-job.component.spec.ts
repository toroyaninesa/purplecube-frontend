import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingJobComponent } from './landing-job.component';

describe('LandingJobComponent', () => {
    let component: LandingJobComponent;
    let fixture: ComponentFixture<LandingJobComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LandingJobComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingJobComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
