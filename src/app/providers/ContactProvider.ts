import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage
  ) {
  }
  public async updateContacto(contacto: Contact){
    let base = ROUTES.contacto.update;
    let data = {
      id: contacto.id,
      nombre_completo: contacto.nombre_completo,
      telefono: contacto.telefono,
      correo: contacto.correo,
      horario_atencion_inicio: contacto.horario_atencion_inicio,
      horario_atencion_fin: contacto.horario_atencion_fin,
      url_facebook: contacto.url_facebook
    }
    let cont = ( await this.api.post(base,data));
    if(cont.data){
      return new Contact (cont.data);
    }
  }
  public async createContacto(contacto: Contact){
    let base = ROUTES.contacto.create;
    let data = {
      nombre_completo: contacto.nombre_completo,
      telefono: contacto.telefono,
      correo: contacto.correo,
      horario_atencion_inicio: contacto.horario_atencion_inicio,
      horario_atencion_fin: contacto.horario_atencion_fin,
      url_facebook: contacto.url_facebook
    }
    let cont = ( await this.api.post(base,data));
    if(cont.data){
      return  new Contact (cont.data);
    }
  }
}