import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEntrePage } from './add-entre.page';

const routes: Routes = [
  {
    path: '',
    component: AddEntrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEntrePageRoutingModule {}
