import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { ROUTES } from '../api/api.constants';
import { GymProvider } from 'src/app/providers/GymProvider';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage,
    private toast: ToastController,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService,
    private gymProvider: GymProvider,
  ) { }

  public async isAuthenticated(): Promise<boolean> {
    const token: any = await this.storage.get("token");
    let isAuthenticated = !this.jwtHelper.isTokenExpired(token);
    return isAuthenticated;
  }

  public async authenticate(data: { email: string, password: string }) {
    return fetch(environment.base_url + ROUTES.authentication, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    })
      .then(this.errorHandler.handleErrors)
      .then(async (response) => {
        let tutorialShow = await this.storage.get('tutoShow');
        // console.log('The response en login: ', response,tutorialShow);
        await this.storage.clear();
        await this.storage.set('tutoShow', tutorialShow);
        console.log(response)
        if (response.data) {
          if (response.data.id_rol != 6) {
            // console.log('response del login en auth esr: ', response)
            // await this.storage.remove('user');
            // await this.storage.remove('token');
            // await this.storage.remove('usersCheck');

            await this.storage.set('user', response.data);
            await this.storage.set('token', response.data.token);
            //console.log(await this.storage.keys())
            this.gymProvider.getGymSubscription(response.data.id_gimnasio).then(async result => {
              // console.log('result get gym subs en auth: ', result);
              if (result.success) {
                await this.storage.set('gymSubscription', result);
              }
              setTimeout(() => {
                window.location.reload();
                //this.router.navigateByUrl('/');
              }, 100);
            }, error => {
              // console.log('error de getGymSubscription: ', error);
            });

          } else {
            const toast = await this.toast.create({
              message: 'Los atletas no tienen permisos para acceder',
              duration: 10000,
              color: 'danger',
              buttons: [
                {
                  icon: 'close',
                  handler: () => { toast.dismiss(); }
                }
              ]
            });
            toast.present();
          }
        } else {
          let error=response.errores?response.errores:response.errors
          
          const toast = await this.toast.create({
            message: error[0],
            // message: 'Gimnasio Inactivo',
            duration: 10000,
            color: 'danger',
            buttons: [
              {
                icon: 'close',
                handler: () => { toast.dismiss(); }
              }
            ]
          });
          toast.present();
          //this.router.navigate(['/chargesOnly']);
        }
      })
      .catch(async (error) => {
      //   console.log('Entró al error en login: ', error);
      //   const toast = await this.toast.create({
      //     // message: 'Credenciales incorrectas',
      //     message: error,
      //     duration: 10000,
      //     color: 'danger',
      //     buttons: [
      //       {
      //         icon: 'close',
      //         handler: () => { toast.dismiss(); }
      //       }
      //     ]
      //   });
      //   toast.present();
      });
  }
}
