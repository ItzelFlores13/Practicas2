import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate():Promise<boolean> {
  	return this.auth.isAuthenticated().then((isAuthenticated)=>{
	  	if (!isAuthenticated) {
	      return true;   		
	  	}
      this.router.navigate(['/dashboard']);
			return false;  		
  	}); 
  }
}
