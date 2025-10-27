import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommunityPostPage } from './community-post.page';
import { CommunityPostPageRoutingModule } from './community-post-routing.module'; // 👈 usa este

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityPostPageRoutingModule // 👈 aquí
  ],
  declarations: [CommunityPostPage]
})
export class CommunityPostPageModule {}
