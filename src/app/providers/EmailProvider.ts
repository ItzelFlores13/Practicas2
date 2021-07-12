import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { Routine } from '../models/Routine';
import { Round } from '../models/Round';
import { Email } from '../models/Email';

export interface EmailParams {
  id_sucursal: number;
  titulo:string;
  page:number;
  id_gimnasio:number;
}
/**
 * Provider de correos personalizados
 * CRUD Y FILTROS
 */

@Injectable({
  providedIn: 'root'
})

/**
  * Email provider
  * Obtiene los entrenamientos
  */
export class EmailProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de correos personalizados
    * @date 12 Abril 2021
    * @param params parametros de filtracion [page, query, id_gimnasio]
    * @return lista de correos
    * @exceptions lista de errores en petición de api
   */
  public async getEmails(params: Partial< EmailParams>){

    this.spinner.show();
    let base = ROUTES.emails.index;
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.titulo) base += `&q=${params.titulo}`; 
    if (params.id_gimnasio) base += `&id_gimnasio=${params.id_gimnasio}`;     
    let emails = (await this.api.get(base));

    if(emails.data){
      let data = [];
      emails.data.forEach(element => {
        
        data.push(new Email(element));
      });
      emails.data = data;
    }

    this.spinner.hide();

    return emails;
  }

  /**
    * @author Sergio Castro
    * @description Crea un registro de correo
    * @date 12 Abril 2021
    * @param email objeto email
    * @return email creado
    * @exceptions lista de errores en petición de api
   */
  public async createEmail(email:Email){

    this.spinner.show();
    let base = ROUTES.emails.store;
    
    let atls = [];
    email.atletas.forEach(element => {
      atls.push(element.id);
    });
    let grs = [];
    email.grupos.forEach(element => {
      grs.push(element.id);
    });
/*     let data = {id_gimnasio: email.id_gimnasio,id_sucursal:email.id_sucursal,contenido_quill:email.contenido_quill,contenido_html:email.contenido_html,programada:email.programada,fecha_programada:email.fecha_programada, hora_programada: email.hora_programada,atletas:JSON.stringify(atls),grupos:JSON.stringify(grs), sucursales:email.sucursales, fecha_creacion: this.formatFecha(new Date()),titulo:email.titulo} */
    let data = {
      envio_sucursal: email.envio_sucursal == true ? 1:0,
      id_gimnasio:email.id_gimnasio,
      contenido_quill:email.contenido_quill,
      contenido_html:email.contenido_html,
      tipo_email:email.tipo_email,
      fecha_programada:email.fecha_programada.length > 10 ? email.fecha_programada.substr(0,10):email.fecha_programada,
      hora_programada: email.hora_programada,
      atletas:JSON.stringify(atls),
      grupos:JSON.stringify(grs), 
      sucursales: JSON.stringify( email.sucursales),
      dias_semana:email.dias_semana,
      dias_mes:email.dias_mes,
      recurrencia_activa:email.recurrencia_activa == true ? 1:0,
      fecha_creacion: this.formatFecha(new Date()),
      titulo:email.titulo
    }
    let emails = (await this.api.post(base,data));

    if(emails.data){
      emails.data = new Email(emails.data);
    }

    this.spinner.hide();

    return emails;
  }

  /**
    * @author Sergio Castro
    * @description Actualiza un registro de correo
    * @date 12 Abril 2021
    * @param email objeto email
    * @return email actualizado
    * @exceptions lista de errores en petición de api
   */
  public async updateEmail(email:Email){

    this.spinner.show();
    let base = ROUTES.emails.update(email.id);
    
    let atls = [];
    email.atletas.forEach(element => {
      atls.push(element.id);
    });
    let grs = [];
    email.grupos.forEach(element => {
      grs.push(element.id);
    });
    let data = {
      envio_sucursal: email.envio_sucursal == true ? 1:0,
      id_gimnasio:email.id_gimnasio,
      contenido_quill:email.contenido_quill,
      contenido_html:email.contenido_html,
      tipo_email:email.tipo_email,
      fecha_programada:email.fecha_programada.length > 10 ? email.fecha_programada.substr(0,10):email.fecha_programada,
      hora_programada: email.hora_programada,
      atletas:JSON.stringify(atls),
      grupos:JSON.stringify(grs), 
      sucursales:JSON.stringify( email.sucursales),
      dias_semana:email.dias_semana,
      dias_mes:email.dias_mes,
      recurrencia_activa:email.recurrencia_activa == true ? 1:0,
      fecha_creacion: this.formatFecha(new Date()),
      titulo:email.titulo
    }
    let emails = (await this.api.put(base,data));

    if(emails.data){
      emails.data = new Email(emails.data);
    }

    this.spinner.hide();

    return emails;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la información de un registro de correo
    * @date 12 Abril 2021
    * @param id identificador del correo
    * @return correo 
    * @exceptions lista de errores en petición de api
   */
  public async getEmail(id:number){

    this.spinner.show();
    let base = ROUTES.emails.show(id);
  
    let emails = (await this.api.get(base));

    if(emails.data){
      emails.data = new Email(emails.data);
    }

    this.spinner.hide();

    return emails;
  }

  /**
    * @author Sergio Castro
    * @description Elimina un registro de correo personalizado
    * @date 12 Abril 2021
    * @param id identificador de correo
    * @return correo eliminado
    * @exceptions lista de errores en petición de api
   */
  public async deleteEmail(id:number){

    this.spinner.show();
    let base = ROUTES.emails.destroy(id);
  
    let emails = (await this.api.delete(base));

    if(emails.data){
      emails.data = new Email(emails.data);
    }

    this.spinner.hide();

    return emails;
  }

  /**
    * @author Sergio Castro
    * @description Reenvia un correo a sus destinatarios correspondientes
    * @date 12 Abril 2021
    * @param id identificador del correo
    * @return success
    * @exceptions lista de errores en petición de api
   */
  public async resendEmail(id:number){

    this.spinner.show();
    let base = ROUTES.emails.resend(id);
  
    let emails = (await this.api.get(base));

    this.spinner.hide();

    return emails;
  }
  /**
  * @author Sergio Castro
  * @description Obtiene la fecha en formato yyyy-mm-dd
  * @date 26 diciembre 2020
  * @param fecha
  * @return fecha
  */
 formatFecha(fecha){
  let mes = fecha.getMonth()+1;
  let dia = fecha.getDate();
  return fecha.getFullYear()+'-'+(mes < 10 ? '0'+mes:mes)+'-'+(dia < 10 ? '0'+dia:dia);
}
  

}