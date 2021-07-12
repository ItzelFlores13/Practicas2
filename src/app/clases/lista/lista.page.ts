import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public ocultar1: boolean = false;
  accion1(){
  this.ocultar1 = !this.ocultar1;
  }
}
