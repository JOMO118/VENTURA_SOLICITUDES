import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPoliticasPageRoutingModule } from './auth-politicas-routing.module';

import { AuthPoliticasPage } from './auth-politicas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AuthPoliticasPageRoutingModule
  ],
  declarations: [AuthPoliticasPage]
})
export class AuthPoliticasPageModule {}
