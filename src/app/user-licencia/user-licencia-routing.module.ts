import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLicenciaPage } from './user-licencia.page';

const routes: Routes = [
  {
    path: '',
    component: UserLicenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLicenciaPageRoutingModule {}
