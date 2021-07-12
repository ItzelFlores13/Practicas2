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
import { EmailGroup } from '../models/EmailGroup';

export interface EmailGroupsParams {
  id_sucursal: number;
  nombre:string;
  page:number;
  id_gimnasio:number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * EmailGroups provider
  * CRUD Y FILTROS
  */
export class EmailGroupsProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de grupos para correos personalizados
    * @date 12 Abril 2021
    * @param params parametros de filtracion como [page, query, id_gimnasio,id_sucursal]
    * @return a
    * @exceptions lista de errores en petición de api
   */
  public async getEmailGroups(params: Partial< EmailGroupsParams>){

    this.spinner.show();
    let base = ROUTES.emails_groups.index
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.nombre) base += `&q=${params.nombre}`; 
    if (params.id_gimnasio) base += `&id_gimnasio=${params.id_gimnasio}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    

    
    let emailGroups = (await this.api.get(base));


    if(emailGroups.data){
    /*   let data = [];
      emailGroups.data.forEach(element => {
        
        data.push(new EmailGroups(element));
      });
      emailGroups.data = data; */
    }

    this.spinner.hide();

    return emailGroups;
  }
  /**
    * @author Sergio Castro
    * @description Crea un registro de grupo
    * @date 12 Abril 2021
    * @param emailGroup objeto EmailGroup
    * @return grupo creado
    * @exceptions lista de errores en petición de api
   */
  public async createEmailGroups(emailGroup: EmailGroup){

    this.spinner.show();
    let base = ROUTES.emails_groups.store

    let atls = [];
    emailGroup.atletas.forEach(element => {
      atls.push(element.id);
    });
    let fCreate = new Date();
    let data = {nombre:emailGroup.nombre,id_sucursal:emailGroup.id_sucursal,id_gimnasio:emailGroup.id_gimnasio,atletas:JSON.stringify(atls),fecha_creacion:this.formatFecha(fCreate)}
    let emailGroups = (await this.api.post(base,data));


    if(emailGroups.data){
      
      emailGroups.data = new EmailGroup(emailGroups.data);
    }

    this.spinner.hide();

    return emailGroups;
  }

  /**
    * @author Sergio Castro
    * @description Actualiza un registro de grupo
    * @date 12 Abril 2021
    * @param emailGroup objeto EmailGroup
    * @return grupo actualizado
    * @exceptions lista de errores en petición de api
   */
  public async updateEmailGroups(emailGroup: EmailGroup){

    this.spinner.show();
    let base = ROUTES.emails_groups.update(emailGroup.id)

    let atls = [];
    emailGroup.atletas.forEach(element => {
      atls.push(element.id);
    });
    console.log(emailGroup);
    let data = {nombre:emailGroup.nombre,id_sucursal:emailGroup.id_sucursal,id_gimnasio:emailGroup.id_gimnasio,atletas:JSON.stringify(atls)}
    let emailGroups = (await this.api.put(base,data));


    if(emailGroups.data){
      
      emailGroups.data = new EmailGroup(emailGroups.data);
    }

    this.spinner.hide();

    return emailGroups;
  }

  /**
    * @author Sergio Castro
    * @description Elimina un registro de grupo
    * @date 12 Abril 2021
    * @param id identificador del grupo
    * @return grupo eliminado
    * @exceptions lista de errores en petición de api
   */
  public async deleteEmailGroup(id:number){

    this.spinner.show();
    let base = ROUTES.emails_groups.destroy(id)

    
    let emailGroups = (await this.api.delete(base));


    this.spinner.hide();

    return emailGroups;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la información de un registro de grupo
    * @date 12 Abril 2021
    * @param id identificador del grupo
    * @return informacion del grupo
    * @exceptions lista de errores en petición de api
   */
  public async getEmailGroup(id:number){

    this.spinner.show();
    let base = ROUTES.emails_groups.show(id)

    let emailGroup = (await this.api.get(base));

    if(emailGroup.data){
      
      emailGroup.data = new EmailGroup( emailGroup.data);
    }

    this.spinner.hide();

    return emailGroup;
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