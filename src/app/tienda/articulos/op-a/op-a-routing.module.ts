import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpAPage } from './op-a.page';

const routes: Routes = [
  {
    path: '',
    component: OpAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpAPageRoutingModule {}
