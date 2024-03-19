import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompanyComponent } from './my-company.component';

describe('MyCompanyComponent', () => {
    let component: MyCompanyComponent;
    let fixture: ComponentFixture<MyCompanyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MyCompanyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyCompanyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
