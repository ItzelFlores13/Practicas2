import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBiblioPage } from './add-biblio.page';

const routes: Routes = [
  {
    path: '',
    component: AddBiblioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBiblioPageRoutingModule {}
