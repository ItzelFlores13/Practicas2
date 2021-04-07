import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  nombre = new FormControl('');
  ApellidoPaterno = new FormControl('');
  ApellidoMaterno = new FormControl('');
  Genero = new FormControl('');
  Correo = new FormControl('');
  Telefono = new FormControl('');
  Cumple = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
