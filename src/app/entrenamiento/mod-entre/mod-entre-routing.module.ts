import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModEntrePage } from './mod-entre.page';

const routes: Routes = [
  {
    path: '',
    component: ModEntrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModEntrePageRoutingModule {}
