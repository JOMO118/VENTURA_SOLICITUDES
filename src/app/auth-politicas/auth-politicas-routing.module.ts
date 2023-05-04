import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPoliticasPage } from './auth-politicas.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPoliticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPoliticasPageRoutingModule {}
