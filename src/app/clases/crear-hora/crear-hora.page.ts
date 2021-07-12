import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crear-hora',
  templateUrl: './crear-hora.page.html',
  styleUrls: ['./crear-hora.page.scss'],
})
export class CrearHoraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public ocultar1: boolean = false;
    accion1(){
    this.ocultar1 = !this.ocultar1;
    }


    public ocultar2: boolean = false;
    accion2(){
    this.ocultar2 = !this.ocultar2;
    }

}
