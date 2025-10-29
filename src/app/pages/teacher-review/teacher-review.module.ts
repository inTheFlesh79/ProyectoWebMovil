import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TeacherReviewPageRoutingModule } from './teacher-review-routing.module';
import { TeacherReviewPage } from './teacher-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherReviewPageRoutingModule
  ],
  declarations: [TeacherReviewPage]
})
export class TeacherReviewPageModule {}
