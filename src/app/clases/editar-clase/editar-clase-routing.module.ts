import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarClasePage } from './editar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: EditarClasePage
  },{
    path: 'editar-clase',
    loadChildren: () => import('./editar-clase.module').then( m => m.EditarClasePageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarClasePageRoutingModule {}
