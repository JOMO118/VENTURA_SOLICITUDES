import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserLicenciaPageRoutingModule } from './user-licencia-routing.module';

import { UserLicenciaPage } from './user-licencia.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLicenciaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserLicenciaPage]
})
export class UserLicenciaPageModule { }
