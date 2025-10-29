import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherReviewPage } from './teacher-review.page';

describe('TeacherReviewPage', () => {
  let component: TeacherReviewPage;
  let fixture: ComponentFixture<TeacherReviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
