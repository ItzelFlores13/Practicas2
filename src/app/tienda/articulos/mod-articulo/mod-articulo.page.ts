import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'mod-articulo',
  templateUrl: './mod-articulo.page.html',
  styleUrls: ['./mod-articulo.page.scss'],
})
export class ModArticuloPage implements OnInit {
  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  async presentAlert () {
    const alert = await this.alertCtrl.create({
      header: '¿Cuantos puntos acumula?',
      cssClass: 'Insertar',
      inputs: [
        {
          name: 'Puntos',
          placeholder: 'ej. 5'
        },],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel',
          handler: (blah) =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: (blah) => {
            console.log('Boton OK');
          }
        }]
    });
    await alert.present();
  }
}
