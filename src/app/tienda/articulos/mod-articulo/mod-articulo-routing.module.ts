import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModArticuloPage } from './mod-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: ModArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModArticuloPageRoutingModule {}
