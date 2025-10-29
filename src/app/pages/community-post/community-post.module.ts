import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommunityPostPage } from './community-post.page';
import { CommunityPostPageRoutingModule } from './community-post-routing.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityPostPageRoutingModule,
    RouterModule.forChild([{ path: '', component: CommunityPostPage }])
  ],
  declarations: [CommunityPostPage]
})
export class CommunityPostPageModule {}
