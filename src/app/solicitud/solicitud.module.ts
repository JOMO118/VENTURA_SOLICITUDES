import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SolicitudPageRoutingModule } from './solicitud-routing.module';

import { SolicitudPage } from './solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SolicitudPageRoutingModule
  ],
  declarations: [SolicitudPage]
})
export class SolicitudPageModule {}
