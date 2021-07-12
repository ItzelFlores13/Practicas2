import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public ocultar1: boolean = false;
  accion1(){
  this.ocultar1 = !this.ocultar1;
  }
}
