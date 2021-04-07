import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'muro',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'muro',
    loadChildren: () => import('./muro/muro.module').then( m => m.MuroPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'agregar-usuario',
    loadChildren: () => import('./usuarios/SubPages/agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule)
  },
  {
    path: 'opciones',
    loadChildren: () => import('./usuarios/SubPages/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'crear-clase',
    loadChildren: () => import('./clases/Subpage/crear-clase/crear-clase.module').then( m => m.CrearClasePageModule)
  },{
    path: 'menu-clase',
    loadChildren: () => import('./clases/menu-clase/menu-clase.module').then( m => m.MenuClasePageModule)
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  },
  {
    path: 'periodos',
    loadChildren: () => import('./clases/periodos/periodos.module').then( m => m.PeriodosPageModule)
  },
  {
    path: 'editar-clase',
    loadChildren: () => import('./clases/editar-clase/editar-clase.module').then( m => m.EditarClasePageModule)
  },{
    path: 'asistencia',
    loadChildren: () => import('./clases/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)

  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
