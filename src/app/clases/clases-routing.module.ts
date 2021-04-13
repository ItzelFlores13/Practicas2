import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesPage } from './clases.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage
  },
  {
    path: 'menu-clase',
    loadChildren: () => import('./menu-clase/menu-clase.module').then( m => m.MenuClasePageModule)
  },{
    path: 'clases',
    loadChildren: () => import('./clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'periodos',
    loadChildren: () => import('./periodos/periodos.module').then( m => m.PeriodosPageModule)
  },
  {
    path: 'editar-clase',
    loadChildren: () => import('./editar-clase/editar-clase.module').then( m => m.EditarClasePageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
