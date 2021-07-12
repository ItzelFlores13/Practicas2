import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearHoraPage } from './crear-hora.page';

const routes: Routes = [
  {
    path: '',
    component: CrearHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearHoraPageRoutingModule {}
