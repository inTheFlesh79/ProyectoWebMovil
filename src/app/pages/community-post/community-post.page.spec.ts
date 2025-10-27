import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityPostPage } from './community-post.page';

describe('CommunityPostPage', () => {
  let component: CommunityPostPage;
  let fixture: ComponentFixture<CommunityPostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
