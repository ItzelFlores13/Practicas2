import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuClasePage } from './menu-clase.page';

const routes: Routes = [
  {
    path: '',
    component: MenuClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuClasePageRoutingModule {}
