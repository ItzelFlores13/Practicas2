import { Component, ElementRef, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { NavController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class Api {
  public data: any;
  public credentials: any;
  public socket: any;
  constructor(
    public http: HttpClient,
    private el: ElementRef,
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController


  ) {
    //NOTAS DEL PROGRAMADOR: ESTA CAMBIALA DEPENDIENDO DE SI QUIERES USAR LOCAL O NRUTAS
    //Endpoints
    this.socket = "https://ylm.oden.mx/api/";
    //this.socket = "https://lcg.oden.mx/api/";
  }

  get(url) {
    url = this.socket + url;
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        this.credentials = credentials;
        let api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.credentials);
        api_headers.set('Access-Control-Allow-Origin:', '*');

        this.http.get(url,  {headers: api_headers} ).subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.storage.set("valid", true);

        }, error => {
          if (error.status == 401 || error.status == 403 ) {
            this.storage.set("valid", false);
            if (error.status == 403) {
              let alert = this.alertCtrl.create({
                title: 'Tu cuenta se ha desactivado por falta de pago.',
                message: 'Consulta al administrador de tu gimnasio o adquiere una nueva membresía en la sección de membresías de la app.',
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                  }
                }]
              });
              alert.present();
              setTimeout(() => {
                alert.dismiss();
              }, 3000);
            }

          } else {
            let alert = this.alertCtrl.create({
              title: 'Algo salió mal',
              message: error.error.errors,
              buttons: [{
                text: 'Ok',
                handler: () => {
                }
              }]
            });
            alert.present();
          }

          console.log('Get to url: ' + url + ' failed');
          console.log("error");
          console.log(JSON.stringify(error));
        });
      });
    });
  }


  delete(url) {
    url = this.socket + url;
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        this.credentials = credentials;
        let api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.credentials);
        api_headers.set('Access-Control-Allow-Origin:', '*');
        this.http.delete(url,  {headers: api_headers} ).subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.storage.set("valid", true);

        }, error => {
          if (error.status == 401) {
            this.storage.set("valid", false);

          } else {
            let alert = this.alertCtrl.create({
              title: 'Algo salió mal',
              message: error.error.errors,
              buttons: [{
                text: 'Ok',
                handler: () => {
                }
              }]
            });
            alert.present();
          }
          console.log('Get to url: ' + url + ' failed');
          console.log("error");
          console.log(JSON.stringify(error));
        });
      });
    });
  }


  post(url, data) {
    url = this.socket + url;
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        this.credentials = credentials;
        let params = new HttpParams();
        // let api_headers = new HttpHeaders();
        let headerJson = {
          'Authorization': 'Bearer ' + this.credentials,
          'Timestamp': (new Date().getTime() / 1000).toFixed(0)
        };
        let api_headers = new HttpHeaders( headerJson );

        this.http.post(url, data, {headers: api_headers}).subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.storage.set("valid", true);

        }, error => {
          if (error.status == 401) {
            this.storage.set("valid", false);

          } else {
            let alert = this.alertCtrl.create({
              title: 'Algo salió mal',
              message: error.error.errors,
              buttons: [{
                text: 'Ok',
                handler: () => {
                }
              }]
            });
            alert.present();
          }
          console.log('Get to url: ' + url + ' failed');
          console.log("error");
          console.log(JSON.stringify(error));
          console.log(error.status);
        });
      });
    });
  }

  postWithoutAthentication(url, data) {
    url = this.socket + url;
    return new Promise (resolve => {
        let params = new HttpParams();

        let headerJson = {
          'Timestamp': (new Date().getTime() / 1000).toFixed(0)
        };
        let api_headers = new HttpHeaders( headerJson );
        this.http.post(url, data, {headers: api_headers}).subscribe(data => {
          this.data = data;
          resolve(this.data);

        }, error => {
          if (error.status == 401) {

          } else {
            let alert = this.alertCtrl.create({
              title: 'Algo salió mal',
              message: error.error.errors,
              buttons: [{
                text: 'Ok',
                handler: () => {
                }
              }]
            });
            alert.present();
          }
          console.log('Get to url: ' + url + ' failed');
          console.log("error");
          console.log(JSON.stringify(error));
          console.log(error.status);
        });
      });

  }

  getExternalApi(url){
     return new Promise (resolve => {
        this.http.get(url ).subscribe(data => {
          this.data = data;
          resolve(this.data);

        }, error => {

          let alert = this.alertCtrl.create({
            title: 'Tuvimos un problema al obtener la tarifa más reciente.',
            message: 'Los precios solo se mostrarán en pesos mexicanos.',
            buttons: [{
              text: 'Ok'
            }]
          });
          alert.present();

          console.log("URL ", url);
          console.log('Get to url: ' + url + ' failed');
          console.log("error");
          console.log(JSON.stringify(error));

        });
      });


   }
}
