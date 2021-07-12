import { Component, OnInit } from '@angular/core';
import {MuroPage} from './muro/muro.page';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LoginPage } from './login/login.page';
import {Events} from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { qrService } from './services/qr-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  {
    rootPage: any  ;
    
  public selectedIndex = 0;
  public appPages = [
     {
      title: 'Login',
      url: '/login',
      icon: 'easel',
    },
    {
      title: 'Muro Principal',
      url: '/muro',
      icon: 'easel',
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      img: 'assets/icon/dashboard.svg',
    },
    {
      title: 'Usuarios',
      url: '/usuarios',
      img: 'assets/icon/oden-icon.svg',
      subList: [{
        subList_title:[
          {title: 'a'},
          {title: 'b'}
        ]
      }]
    },
    {
      title: 'Clases',
      url: '/menu-clase',
      img: 'assets/icon/icono clases 2.png',
    },
    {
      title: 'Tienda',
      url: '/tienda',
      img: 'assets/icon/icono tienda.png'
    },
    {
      title: 'Entrenamientos',
      url: '/entrenamiento',
      img: 'assets/icon/entrenamientos.svg'
    },
    {
      title: 'Notificaciones',
      url: '/notificacion',
      img: 'assets/icon/notificaciones.svg'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public storage: Storage,
    private ga: GoogleAnalytics,
    public events: Events,
    private nativeAudio: NativeAudio,
    private qrs:qrService
  ) {
      platform.ready().then(() => {
        this.storage.get("valid").then(valid=>{
    if (valid == true ){
      this.rootPage = MuroPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
      )});
}
}
