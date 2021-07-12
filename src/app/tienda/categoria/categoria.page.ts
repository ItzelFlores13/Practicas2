import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  async presentAlert () {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Categoría',
      message: 'Escribe el nombre de la nueva categoría',
      cssClass: 'Insertar',
      inputs: [
        {
          name: 'Categoría',
          placeholder: 'ej. Accesorios'
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
  async presentAlert2 () {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoría',
      message: 'Escribe el nuevo nombre de la categoría',
      cssClass: 'Insertar',
      inputs: [
        {
          name: 'Categoría',
          placeholder: 'ej. Accesorios'
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