import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { MuroPage } from '../muro/muro.page';
import { LoginPage } from '../login/login.page';

@Component({

    selector: 'app-recover-account',
    templateUrl: './recover-account.page.html',
  providers: [Api]
})

export class RecoverAccount {

  public email: any;

  constructor(
    public http: Http, 
    public navCtrl: NavController, 
    public apiCtrl: Api, 
    public platform: Platform, 
    public alertCtrl: AlertController,
    public loading: LoadingController) {

  }

  ionViewWillEnter() {
  }
  pushLogIn() {
    this.navCtrl.setRoot(LoginPage);
  }

  recoverPassword() {
    let loader = this.loading.create({});

    var data = {
      email: this.email
    }
    loader.present().then(() => {});
    let alert = this.alertCtrl.create({
        cssClass:'alertOden',
        title: 'Te hemos enviado un correo',
        message: 'Revisa tu correo electrónico y revisa las instrucciones para restablecer la contraseña',
        buttons: [{
          cssClass:'btn-2',
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop(); 
          } 
          
        }
        ]
      }); 
    

    this.apiCtrl.postWithoutAthentication("user/solicitar-recovery", data).then(function (data) {
      loader.dismiss();
      
      alert.present(); 

    }, error => {
         loader.dismiss();
    });

    setTimeout(() => {
      loader.dismiss();
    }, 5000);
  }

}