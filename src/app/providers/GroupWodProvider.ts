import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { Routine } from '../models/Routine';
import { GroupWod } from '../models/GroupWod';

export interface GroupsWodParams {
  id_sucursal: number;
  page:number;
  query:string;
  id_gimnasio:number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * GroupsWod provider
  * Obtiene los entrenamientos
  */
export class GroupsWodProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de grupos de atletas para entrenamientos
    * @date 7 enero 2021
    * @param params parametros de filtracion como
    * @return
    * @exceptions lista de errores en petición de api
   */
  public async getGroupsWods(params: Partial< GroupsWodParams>){

    this.spinner.show();
    let base = ROUTES.grupos_entrenamientos.index;
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.query) base += `&q=${params.query}`; 
    if (params.id_gimnasio) base += `&id_gimnasio=${params.id_gimnasio}`; 


    
    let GroupsWod = (await this.api.get(base));

    this.spinner.hide();

    return GroupsWod;
  }
  public async createGroupWod(gWod: GroupWod){

    this.spinner.show();
    let base = ROUTES.grupos_entrenamientos.store;
    let data = {id_sucursal: gWod.id_sucursal, id_gimnasio: gWod.id_gimnasio, atletas: JSON.stringify( gWod.atletas), nombre: gWod.nombre };
    
    let groupWod = (await this.api.post(base,data));

    this.spinner.hide();

    return groupWod;
  }
  public async updateGroupWod(gWod: GroupWod){

    this.spinner.show();
    let base = ROUTES.grupos_entrenamientos.update;
    let data = {id: gWod.id, id_sucursal: gWod.id_sucursal, id_gimnasio: gWod.id_gimnasio, atletas: JSON.stringify( gWod.atletas), nombre: gWod.nombre };
    
    let groupWod = (await this.api.post(base,data));

    this.spinner.hide();

    return groupWod;
  }
  public async getGroupWod(id:number){

    this.spinner.show();
    let base = ROUTES.grupos_entrenamientos.show(id);


    let groupWod = (await this.api.get(base));

    this.spinner.hide();

    if(groupWod.data){
      groupWod.data = new GroupWod(groupWod.data);
    }

    return groupWod;
  }
  public async deleteGroup(id:number){

    this.spinner.show();
    let base = ROUTES.grupos_entrenamientos.destroy(id);


    let groupWod = (await this.api.delete(base));

    this.spinner.hide();

    if(groupWod.data){
      groupWod.data = new GroupWod(groupWod.data);
    }

    return groupWod;
  }
  

}