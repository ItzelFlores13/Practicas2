import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { MuroPage } from '../muro/muro.page';
import { SetPasswordPage } from '../set-password/set-password.page';
import { RecoverAccount } from '../recover-account/recover-account.page';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Events } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SharedEventService } from '../services/SharedEventService';
import { notificationCountService } from '../services/notificationCountService';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppModule } from '../app.module';

// import { RegistrationPage } from '../registration/registration';


@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [Api, SharedEventService]
  
})

export class LoginPage {
  @NgModule({
    imports: [AppModule],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA]
  })

  public email: any;
  public password: any;
  public notice: any = undefined;
  public user: any;
  browser: any;

  constructor(
    public http: Http, 
    public navCtrl: NavController, 
    public apiCtrl: Api, 
    public storage: Storage,
    public platform: Platform,
    private push: Push,
    public events: Events, 
    public alertCtrl: AlertController,
    public loading: LoadingController,
    private iab: InAppBrowser,
    public sharedEventService: SharedEventService,
    private notiNueva:notificationCountService,
    ) {

  }
  

  ionViewWillEnter() {
  }

  logIn() {
    const formData = new FormData();

    formData.append("email", this.email);
    formData.append("password", this.password);


    let url = this.apiCtrl.socket + 'auth/login-panel';

    var auth_token: any; 
    var user: any;
    var loader: any = this.loading.create({ 
      content: `<div><img class="loader" src="/assets/images/loader.gif" alt="loading..."/></div>`,
      spinner: 'hide',
      cssClass: 'custom-loading'
        
    });
    
    loader.present().then(() => {
      this.http.post(url, formData).subscribe( data => {
        user = data;
        user = user._body;
        user = JSON.parse(user);
        if (user.errors) {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            cssClass:'alertOden',
            title: 'No puedes acceder a la App',
            subTitle: 'Tu correo o contraseña son incorrectos.',
            buttons: [{text:'Ok',cssClass:'btn-2',}]
          });
          alert.present();

        } else {     
          user = user.data;
          auth_token = user.token;
          this.user = user;
          this.storage.set("bearer", auth_token).then((valid) => {
            this.storage.set("valid", true);
            this.storage.set("current_user", this.user);
            this.storage.set("user", this.user);
            this.events.publish('get_user');
            loader.dismiss();
            this.initPushNotification();
            this.getGymSubscription();
          });
        }

        }, error => {
           loader.dismiss();

          this.notice = "Contraseña o email incorrectos"
          // console.log('Bearer query failed');
        });
      });

      setTimeout(()=>{
        loader.dismiss();
        // this.navCtrl.setRoot(HomePage); 
      }, 5000); 

  }

  callAlert() {
    let alert = this.alertCtrl.create({
      cssClass:'alertOden',
      title: 'No puedes acceder a la App',
      subTitle: 'Solo los atletlas de gimnasios registrados en Oden pueden acceder.',
      buttons: [{text:'Ok',cssClass:'btn-2',}]
    });
    alert.present();
  }
  pushRecovery(){
    this.navCtrl.push(RecoverAccount);
  }
  
  initPushNotification() {
    
    if (!this.platform.is('cordova')) {
      this.navCtrl.setRoot(MuroPage); 
      return; 
    } 
    // to initialize push notifications
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
      } else {
        this.navCtrl.setRoot(MuroPage); 
      }

    });
    
    // this.push.createChannel({
    //    id: "odenchannel",
    //    description: "Oden",
    //    // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    //    importance: 3
    //   }).then(() => console.log('Channel created'));


    const options: PushOptions = {
       android: {
        senderID: "66343891246",
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'true'
       },
       windows: {},
       browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
       
    }
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      this.storage.set('device_token', data.registrationId);
      if (this.platform.is('ios')) {
        this.registerDevice('ios', data.registrationId);
       } else {
        this.registerDevice('android', data.registrationId);
       }
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((notification: any) => {
      let url = "notifications/historial/" + this.user.id;
      this.apiCtrl.get(url).then((n:any)=>{
        let notiNuevas=n.data.filter(item=>item.leida==0).length;
        // console.log(this.notiNuevas)
        this.notiNueva.setValue(notiNuevas)
      });          
        
      this.events.publish('notification', notification.additionalData.key);
        if (notification.additionalData.foreground) {
          this.notificationForeground(notification);
        } else {
          this.storage.set("notification-section", notification.additionalData.key);
          this.notificationBackground(notification);
        }
     
    });

    pushObject.on('error').subscribe((error: any) => {
      this.navCtrl.setRoot(MuroPage); 
    });

    
      // setTimeout(()=>{
      //   let view = this.navCtrl.getActive();
      //   if (view.component.name != "HomePage") {
      //     this.navCtrl.setRoot(HomePage)
      //   }
      // }, 3000); 
    

  }


  registerDevice(os, registration_id) {
    const formData = new FormData();

    formData.append("id_usuario", this.user.id);
    formData.append("device_token", registration_id);
    formData.append("os", os);

    this.apiCtrl.post('devices/store', formData).then(data => {
      this.navCtrl.setRoot(MuroPage); 

    });
   }

  notificationForeground(notification) {
     let notificationAlert = this.alertCtrl.create({
      cssClass:'alertOden',
      title: 'Oden',
      message: notification.message,
      buttons: [{
        cssClass:'btn-2',
        text: 'Cerrar',
        role: 'cancel'
      }, {
        cssClass:'btn-1',
        text: 'Ver',
        handler: () => {
          this.events.publish('notification', notification.additionalData.key);
        }
      }]
    });
   notificationAlert.present();
  }

  notificationBackground(notification) {

    this.events.publish('notification', notification.additionalData.key);
    
  }

  testLoader() {
    var loader: any = this.loading.create({ 
      content: `<div><img class="loader" src="/assets/images/loader.gif" alt="loading..."/></div>`,
      spinner: 'hide',
      cssClass: 'custom-loading'
        
    });

    loader.present();
  }

  openTerms() {
    this.browser = this.iab.create('https://www.oden.mx/trminos-y-condicones', '_blank');
  }

  setPassword() {
    this.navCtrl.push(SetPasswordPage);
  }

  getGymSubscription() {
    // console.log('Dentró de getGymSubscription: ', this.user);
    const endpoint = `gimnasio/getFreeSubscription/${this.user.id_gimnasio}`;
    this.apiCtrl.get(endpoint).then(response => {
      // console.log('the response of gymSubscription: ', response);
      const result: any = response;
      this.storage.set('gymSubscription', result.data);
    }, error => {
      // console.log('The error of gymSubscription: ', error);
    });
  }
}

