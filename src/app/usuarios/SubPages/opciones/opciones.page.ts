import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {
  
  numI = new FormControl('');
  numE = new FormControl('');
  col = new FormControl('');
  calle= new FormControl('');
  mun= new FormControl('');
  estado = new FormControl('');
  pais = new FormControl('');
  cp= new FormControl('');
  nom = new FormControl('');
  tel = new FormControl('');

  
  constructor() { }

  ngOnInit() {
  }

}
