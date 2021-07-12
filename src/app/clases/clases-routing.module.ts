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
  },{
    path: 'crear-clase',
    loadChildren: () => import('./Subpage/crear-clase/crear-clase.module').then(m => m.CrearClasePageModule)
  },{
    path: 'asistencia',
    loadChildren: () => import ('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
   },
  {
    path: 'lista',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./horario/horario.module').then( m => m.HorarioPageModule)
  },
  {
    path: 'crear-hora',
    loadChildren: () => import('./crear-hora/crear-hora.module').then( m => m.CrearHoraPageModule)
  }
 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
