import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'op-a',
  templateUrl: './op-a.page.html',
  styleUrls: ['./op-a.page.scss'],
})
export class OpAPage implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  async presentAlert () {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Tipo Variante',
      cssClass: 'Insertar',
      inputs: [
        {
          name: 'Variante',
          placeholder: 'nombre (ej. color, tamaño)'
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


  public ocultar1: boolean = false;
  accion1(){
  this.ocultar1 = !this.ocultar1;
  }
  
}