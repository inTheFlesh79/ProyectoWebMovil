import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationalInstitutionPageRoutingModule } from './educational-institution-routing.module';

import { EducationalInstitutionPage } from './educational-institution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationalInstitutionPageRoutingModule
  ],
  declarations: [EducationalInstitutionPage]
})
export class EducationalInstitutionPageModule {}
