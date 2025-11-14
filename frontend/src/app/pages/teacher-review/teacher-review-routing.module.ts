import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherReviewPage } from './teacher-review.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherReviewPageRoutingModule {}
