import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamientoPage } from './entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoPage
  },
  
  {
    path: 'mod-entre',
    loadChildren: () => import('./mod-entre/mod-entre.module').then( m => m.ModEntrePageModule)
  },
  {
    path: 'add-seccion',
    loadChildren: () => import('./add-seccion/add-seccion.module').then( m => m.AddSeccionPageModule)
  },
  {
    path: 'add-entre',
    loadChildren: () => import('./add-entre/add-entre.module').then( m => m.AddEntrePageModule)
  },
  {
    path: 'add-biblio',
    loadChildren: () => import('./add-biblio/add-biblio.module').then( m => m.AddBiblioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamientoPageRoutingModule {}
