import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InactivarpermisosPage } from './inactivarpermisos.page';

const routes: Routes = [
  {
    path: '',
    component: InactivarpermisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InactivarpermisosPageRoutingModule {}
