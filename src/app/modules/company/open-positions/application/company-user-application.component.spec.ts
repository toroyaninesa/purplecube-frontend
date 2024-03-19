import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserApplicationComponent } from './company-user-application.component';

describe('ApplicationComponent', () => {
    let component: CompanyUserApplicationComponent;
    let fixture: ComponentFixture<CompanyUserApplicationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyUserApplicationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyUserApplicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
