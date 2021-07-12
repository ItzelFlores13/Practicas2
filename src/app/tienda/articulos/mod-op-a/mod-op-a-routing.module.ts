import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModOpAPage } from './mod-op-a.page';

const routes: Routes = [
  {
    path: '',
    component: ModOpAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModOpAPageRoutingModule {}
