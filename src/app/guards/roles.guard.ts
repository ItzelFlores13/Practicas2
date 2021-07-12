import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserProvider } from '../providers/UserProvider';
import { RolServiceService } from '../services/rol/rol-service.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  user: User = null;
  constructor(
    private totasController: ToastController,
    private router: Router,
    public rolService: RolServiceService, 
    ){
  }

   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.rolService.getUserRol().then((rol)=>{
        let rolF = next.data.roles.find(element => element == rol);
        if(rolF){      
          return true;
        }
        else{
          this.viewError(); 
          return false;
        }  		
      });   
  }
  async viewError(){
    const toast = await this.totasController.create({
      message: 'No tienes los permisos necesarios para acceder.',
      position: 'bottom',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
    this.router.navigate(['/home']);
  }
  
}
