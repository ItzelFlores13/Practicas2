import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { Membership } from '../models/Membership';
import { UserMermbership } from '../models/UserMembership';
import { da } from 'date-fns/locale';
import { NgxSpinnerService } from 'ngx-spinner';


 export interface UserMembershipParams {
  page: number; 
  query: string; 
  id_tipo_membresia: number;
}

@Injectable({
  providedIn: 'root'
})

/**
 * User Membership Provider
 * Crud de usuario membresia, filtros de busqueda
 */
export class UserMembershipProvider{  
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) {
    
  }
  public async getUserMemberships(id: number){
    this.spinner.show();
    let base = ROUTES.usuariomembresia.index;

    let data = { id_usuario: id };
    let usMemberships =  ( await this.api.post(base,data));

    if(usMemberships.activas || usMemberships.inactivas || usMemberships.futuras)
    {
      this.spinner.hide();
      let activas = []
       usMemberships.activas.forEach(element => {
        activas.push(new UserMermbership(element)); 
      });
      let futuras = []
       usMemberships.futuras.forEach(element => {
        futuras.push(new UserMermbership(element)); 
      });
      usMemberships.activas = activas;
      usMemberships.futuras = futuras;
      return usMemberships;
    }
    else{
      this.spinner.hide();
      return usMemberships;
    }
      

  }
   
  async deleteUserMembership(id:number){
    this.spinner.show();
    let base = ROUTES.usuariomembresia.destroy;
    let data = { id: id }
    let membership = (await this.api.post(base,data))
    this.spinner.hide();
    if(membership.data)
      return membership.data;
    else 
      return membership  
  }
    /**
    * @author Sergio Castro
    * @description Actualiza la fecha de inicio de un registro de usuario membresia
    * @date 24 Febrero 2021
    * @param id identificador del registro de usuario membresia
    * @param dateInit fecha nueva de fecha de inicio
    * @return membresia actualizada
    * @exceptions lista de errores en petición de api
   */
  async updateDateStart(id:number,dateInit:string){
    this.spinner.show();
    let base = ROUTES.usuariomembresia.updateDateStart;
    let data = { id_usuario_membresia: id, fecha_inicio:dateInit }
    let membership = (await this.api.post(base,data))
    this.spinner.hide();

      return membership  
  }
  /**
    * @author Sergio Castro
    * @description Actualiza la fecha de corte de un registro de usuario membresia
    * @date 24 Febrero 2021
    * @param id identificador del registro de usuario membresia
    * @param dateEnd fecha nueva de fecha de corte
    * @return membresia actualizada
    * @exceptions lista de errores en petición de api
   */
  async updateDateEnd(id:number,dateEnd:string){
    this.spinner.show();
    let base = ROUTES.usuariomembresia.updateDateEnd;
    let data = { id_usuario_membresia: id, fecha_corte:dateEnd }
    let membership = (await this.api.post(base,data))
    this.spinner.hide();
      return membership  
  }
}