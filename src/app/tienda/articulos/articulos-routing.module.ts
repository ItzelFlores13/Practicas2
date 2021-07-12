import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticulosPage } from './articulos.page';

const routes: Routes = [
  {
    path: '',
    component: ArticulosPage
  },
  {
    path: 'add-articulo',
    loadChildren: () => import('./add-articulo/add-articulo.module').then( m => m.AddArticuloPageModule)
  },
  {
    path: 'op-a',
    loadChildren: () => import('./op-a/op-a.module').then( m => m.OpAPageModule)
  },
  {
    path: 'mod-articulo',
    loadChildren: () => import('./mod-articulo/mod-articulo.module').then( m => m.ModArticuloPageModule)
  },
  {
    path: 'mod-op-a',
    loadChildren: () => import('./mod-op-a/mod-op-a.module').then( m => m.ModOpAPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticulosPageRoutingModule {}
