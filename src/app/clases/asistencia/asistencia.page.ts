import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
    public ocultar1: boolean = false;
    accion1(){
    this.ocultar1 = !this.ocultar1;
    }

}
