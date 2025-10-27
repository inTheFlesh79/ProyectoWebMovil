import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationalInstitutionPage } from './educational-institution.page';

describe('EducationalInstitutionPage', () => {
  let component: EducationalInstitutionPage;
  let fixture: ComponentFixture<EducationalInstitutionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
