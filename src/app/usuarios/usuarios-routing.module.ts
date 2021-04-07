import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPage } from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  },
  {
    path: 'agregar-usuario',
    loadChildren: () => import('./subPages/agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule)
  },
  {
    path: 'opciones',
    loadChildren: () => import('./subpages/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./subpages/users/users.module').then( m => m.UsersPageModule)
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
