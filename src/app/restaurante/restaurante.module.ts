import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantePageRoutingModule } from './restaurante-routing.module';

import { RestaurantePage } from './restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RestaurantePageRoutingModule
  ],
  declarations: [RestaurantePage]
})
export class RestaurantePageModule {}
