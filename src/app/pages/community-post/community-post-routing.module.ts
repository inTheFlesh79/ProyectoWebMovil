import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPostPage } from './community-post.page';

const routes: Routes = [
  {
    path: ':id',
    component: CommunityPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPostPageRoutingModule {}
