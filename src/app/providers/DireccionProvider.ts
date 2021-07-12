import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { Address } from '../models/Address';



@Injectable({
  providedIn: 'root'
})
export class DireccionProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage
  ) {
  }
  public async updateDireccion(direccion: Address){
    let base = ROUTES.direccion.update;
    let data = {
      id: direccion.id,
      latitud: direccion.latitud,
      longitud: direccion.longitud,
      pais: direccion.pais,
      estado: direccion.estado,
      municipio: direccion.municipio,
      colonia: direccion.colonia,
      codigo_postal: direccion.codigo_postal,
      calle: direccion.calle,
      num_ext: direccion.num_ext,
      num_int: direccion.num_int == null ? '':direccion.num_int
    }
    let dir = ( await this.api.post(base,data));
    if(dir.data){
      return new Address(dir.data);
    }
  }
  public async createDireccion(direccion: Address){
    let base = ROUTES.direccion.create;
    let data = {
      latitud: direccion.latitud,
      longitud: direccion.longitud,
      pais: direccion.pais,
      estado: direccion.estado,
      municipio: direccion.municipio,
      colonia: direccion.colonia,
      codigo_postal: direccion.codigo_postal,
      calle: direccion.calle,
      num_ext: direccion.num_ext,
      num_int: direccion.num_int == null ? '':direccion.num_int
    }
    let dir = ( await this.api.post(base,data));
    if(dir.data){
      return new Address(dir.data);
    }
  }
}