import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RolServiceService } from '../services/rol/rol-service.service';

@Injectable({
  providedIn: 'root'
})
export class PackageOdenGuard implements CanActivate {
  
  package:any;
  constructor(
    private totasController: ToastController,
    private router: Router,
    public rolService: RolServiceService, 
    ){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.rolService.getPackageGym().then((pack)=>{
        if (pack) {
          let packF = next.data.plans.find(element => element == pack.plan);
          if(packF){      
            return true;
          }
          else{
            this.viewError(); 
            return false;
          }
        } else {
          return true;
        }
      });   
  }
  async viewError(){
    const toast = await this.totasController.create({
      message: 'Tu plan no incluye esta sección.',
      position: 'bottom',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
    this.router.navigate(['/']);
  }
  
}
