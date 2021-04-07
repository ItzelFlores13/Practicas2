import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
     {
      title: 'Login',
      url: '/login',
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
      url: '/cuarta',
      img: 'assets/icon/icono tienda.png'
    },
    {
      title: 'Entrenamientos',
      url: '/quinta',
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
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}

