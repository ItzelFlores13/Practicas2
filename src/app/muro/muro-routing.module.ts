import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuroPage } from './muro.page';

const routes: Routes = [
  {
    path: '',
    component: MuroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuroPageRoutingModule {}
