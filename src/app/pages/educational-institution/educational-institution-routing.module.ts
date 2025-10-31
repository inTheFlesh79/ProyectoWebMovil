import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationalInstitutionPage } from './educational-institution.page';

const routes: Routes = [
  {
    path: ':id',
    component: EducationalInstitutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationalInstitutionPageRoutingModule {}
