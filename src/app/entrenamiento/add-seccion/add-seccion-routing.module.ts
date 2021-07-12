import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSeccionPage } from './add-seccion.page';

const routes: Routes = [
  {
    path: '',
    component: AddSeccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSeccionPageRoutingModule {}
