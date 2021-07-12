import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers/api';
import { LoadingController } from 'ionic-angular';
import { MuroPage } from '../muro/muro.page';
import { RecoverAccount } from '../recover-account/recover-account.page';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Events } from 'ionic-angular';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Validators, FormGroup, FormControl } from '@angular/forms'; 
import { MatchPassword } from '../validators/MatchPassword';
// import { RegistrationPage } from '../registration/registration';

declare var TweenMax:any; 
declare var Power2:any; 

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-password',
  templateUrl: 'set-password.page.html',
  providers: [Api, MatchPassword]
})

export class SetPasswordPage {

  // public email: any;
  // public password: any;
  // public password_confirmation: any;
  public notice: any = undefined;
  public user: any;
  browser: any;

  public formGroup: FormGroup; 
  public email: FormControl; 
  public password: FormControl; 
  public password_confirmation: FormControl; 

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
    private matchPassword: MatchPassword
    ) {

  }

  ngOnInit(){
    this.email = new FormControl('',
      [
        Validators.required, 
        Validators.email
      ]
    );
    this.password = new FormControl('',
      [
        Validators.minLength(6),
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
      ]
    );
    this.password_confirmation = new FormControl('',
      [
        Validators.minLength(6),
        Validators.required,
      ]
    );
    this.formGroup = new FormGroup({
      email: this.email, 
      password: this.password, 
      password_confirmation: this.password_confirmation
    },{
      validators: [
        this.matchPassword.validate
      ]
    });    
  }
  ionViewWillEnter() {
  }
  login() {
    this.navCtrl.pop();
  }
  setPassword() {
    const formData = new FormData();

    formData.append("email", this.email.value);
    formData.append("password", this.password.value);

    let url = this.apiCtrl.socket + 'auth/set-password';

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
        
        user = JSON.parse(user)
        if (user.errors) {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            cssClass:'alertOden',
            title: 'No puedes acceder a la App',
            subTitle: user.errors[0],
            buttons: [{text:'Ok',cssClass:'btn-2'}]
          });
          alert.present();

        } else {     
          user = user.data;
          auth_token = user.token;
          this.user = user;
          // if (this.user.rol.id == 6 || this.user.rol.id == 5) {
            this.storage.set("bearer", auth_token).then((valid) => {
              this.storage.set("valid", true);
              this.storage.set("current_user", this.user);
              this.storage.set("user", this.user);
              this.events.publish('get_user');
              loader.dismiss();
              this.initPushNotification(); 
            });
          // } else {
          //   this.storage.set("valid", false);
          //   loader.dismiss();
          //   this.callAlert();
          // }
        }

        }, error => {
           loader.dismiss();

          this.notice = "Contraseña o email incorrectos"
          console.log('Bearer query failed');
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
      buttons: [{text:'Ok',cssClass:'btn-2'}]
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
       
        if (notification.additionalData.foreground) {
          this.notificationForeground(notification);
        } else {
          this.notificationBackground(notification);
        }
     
    });

    pushObject.on('error').subscribe((error: any) => {
      console.log("ERROR EN LA NOTIFICACION ", error);
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
    console.log("DEVICE TOKEN!!!! ", registration_id);
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
        text: 'Cerrar',
        cssClass:'btn-2',
        role: 'cancel'
      }, {
        text: 'Ver',
        cssClass:'btn-1',
        handler: () => {
          
          
        }

      }]
    });
   notificationAlert.present();
  }

  notificationBackground(notification) {
    
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
}


