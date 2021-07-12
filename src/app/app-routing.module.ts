import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginGuard } from './guards/login.guard';
import {Api} from '../providers/api';
import {EjecucionProvider} from '../providers/EjecucionProvider';
import {S3DirectPostProvider} from '../providers/S3DirectPost'
const routes: Routes = [
 
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },{
    path: 'login',
    loadChildren: () => import ('./login/login.module').then (
      m => m.LoginPageModule)

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
    path: 'notificacion',
    loadChildren: () => import('./notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./clases/clases.module').then( m => m.ClasesPageModule)
  },{
    path: 'menu-clase',
    loadChildren: () => import('./clases/menu-clase/menu-clase.module').then (m =>m.MenuClasePageModule)
  },{
    path: 'crear-clase',
    loadChildren: () => import ('./clases/Subpage/crear-clase/crear-clase.module').then(m =>m.CrearClasePageModule)
  },
  {path: 'periodos',
  loadChildren: () => import('./clases/periodos/periodos.module').then(m =>m.PeriodosPageModule)  
},{
  path: 'asistencia',
  loadChildren: () => import ('./clases/asistencia/asistencia.module').then(m =>m.AsistenciaPageModule)
},{
    path: 'lista',
    loadChildren: () => import('./clases/lista/lista.module').then(m =>m.ListaPageModule)
  },{
    path: 'horario',
    loadChildren: () => import ('./clases/horario/horario.module').then(m => m.HorarioPageModule)
  },{
    path: 'crear-hora',
    loadChildren:() => import ('./clases/crear-hora/crear-hora.module').then(m => m.CrearHoraPageModule)
   },{
     path: 'crear',
      loadChildren: () => import ('./notificacion/crear/crear.module').then(m => m.CrearPageModule)
   },
  {
    path: 'entrenamiento',
    loadChildren: () => import('./entrenamiento/entrenamiento.module').then( m => m.EntrenamientoPageModule)
  },{
  path: 'mod-entre',
  loadChildren: () => import ('./entrenamiento/mod-entre/mod-entre.module').then (m=> m.ModEntrePageModule)
},{
  path: 'add-seccion',
  loadChildren: () => import ('./entrenamiento/add-seccion/add-seccion.module').then(m=> m.AddSeccionPageModule)
},{
  path: 'add-entre',
  loadChildren: () => import ('./entrenamiento/add-entre/add-entre.module').then(m=> m.AddEntrePageModule)
},{
  path: 'add-biblio',
  loadChildren: () => import ('./entrenamiento/add-biblio/add-biblio.module').then(m=> m.AddBiblioPageModule)
},
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then( m => m.TiendaPageModule)
  },{
    path: 'categoria',
    loadChildren: () => import ('./tienda/categoria/categoria.module').then (m => m.CategoriaPageModule)
  },{
    path: 'articulos',
    loadChildren: () => import ('./tienda/articulos/articulos.module').then(m => m.ArticulosPageModule)
  },{
    path: 'add-articulo',
    loadChildren: () => import ('./tienda/articulos/add-articulo/add-articulo.module').then(m => m.AddArticuloPageModule)
  },{
    path: 'op-a',
    loadChildren: () => import ('./tienda/articulos/op-a/op-a.module').then(m => m.OpAPageModule)
  },{
    path: 'compras',
    loadChildren: () =>import ('./tienda/compras/compras.module').then(m => m.ComprasPageModule)
  },{
    path: 'mod-op-a',
    loadChildren: () =>import ('./tienda/articulos/mod-op-a/mod-op-a.module').then(m=> m.ModOpAPageModule)
  },{
    path: 'mod-articulo',
    loadChildren: () => import ('./tienda/articulos/mod-articulo/mod-articulo.module').then (m=> m.ModArticuloPageModule)
  },
  {
    path: 'set-password',
    loadChildren: () => import('./set-password/set-password.module').then( m => m.SetPasswordPageModule)
  },
  {
    path: 'recover-account',
    loadChildren: () => import('./recover-account/recover-account.page').then( m => m.RecoverAccount)
  },
  {
    path: 'validators',
    loadChildren: () => import('./validators/MatchPassword').then( m => m.MatchPassword)
  },
  
  
  
];

@NgModule({
  providers: [
    Api,EjecucionProvider,S3DirectPostProvider
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


