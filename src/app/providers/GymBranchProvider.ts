import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams } from '../models/User';
import { GymBranch, GymBranchParams } from '../models/GymBranch';
import { Contact } from '../models/Contact';
import { NgxSpinnerService } from 'ngx-spinner';

export interface BranchParams {
  page: number; 
  query: string; 
  id_gimnasio: number;
}

@Injectable({
  providedIn: 'root'
})
export class GymBranchProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }
  public async index(): Promise<GymBranch[]> {
    this.spinner.show();
    
    let branches = await this.storage.get('user').then((user: UserParams)=>{
      this.spinner.hide();
      return this.api.get(ROUTES.sucursales.index(user.id_gimnasio)); 
    }).then((resp)=>{
      this.spinner.hide();
      return resp.data.map((d: GymBranchParams)=>{
        return new GymBranch(d); 
      }); 
    }); 

    return branches
  }
  public async getBranch(id: number){
    this.spinner.show();
    let base = ROUTES.sucursales.show(id);
    let branch = (await this.api.get(base));
    this.spinner.hide();
    if(branch.data){
      branch = new GymBranch(branch.data);
    }
    return branch;
  }
  public async getBranches(params: BranchParams){
    let base = ROUTES.sucursales.index_paginate(params.id_gimnasio);
    if(params.page) base += `?page=${params.page}`;
    if(params.query && params.query.length > 0) base += `&q=${params.query}`;
    let branches = (await this.api.get(base));

    if(branches.data){
      return branches.data.map((d: GymBranchParams)=>{
        return new GymBranch(d); 
      }); 
    }
    else
      return branches;
  }

  public async updateBranch(branch: GymBranch){
    let base = ROUTES.sucursales.update;
    let data = {
      id: branch.id,
      id_gimnasio: branch.id_gimnasio,
      id_contacto: branch.id_contacto,
      id_direccion: branch.id_direccion,
      nombre: branch.nombre,
      spotify_link: branch.spotify_link,
      terms_and_conditions: branch.terms_and_conditions,
      informed_consent: branch.informed_consent,
      privacy_policy: branch.privacy_policy,
      paypal_client_id: branch.paypal_client_id,
      porcentaje_activo: branch.porcentaje_activo == true ? '1':'0',
      porcentaje: branch.porcentaje,
      dias_reservacion: branch.dias_reservacion,
      dias_cancelacion: branch.dias_cancelacion,
      horas_cancelacion: branch.horas_cancelacion
    };
    let branch_up = (await this.api.post(base,data))

    if(branch_up.data){
      return new GymBranch(branch_up.data);
    }
  }
  public async createBranch(branch: GymBranch){
    let base = ROUTES.sucursales.create;
    let data = {
      id_gimnasio: branch.id_gimnasio,
      id_contacto: branch.id_contacto,
      id_direccion: branch.id_direccion,
      nombre: branch.nombre,
      spotify_link: branch.spotify_link,
      terms_and_conditions: branch.terms_and_conditions,
      informed_consent: branch.informed_consent,
      privacy_policy: branch.privacy_policy,
      paypal_client_id: branch.paypal_client_id,
      porcentaje_activo: branch.porcentaje_activo == true ? '1':'0',
      porcentaje: branch.porcentaje,
      dias_reservacion: branch.dias_reservacion,
      dias_cancelacion: branch.dias_cancelacion,
      horas_cancelacion: branch.horas_cancelacion
    };
    let branch_up = (await this.api.post(base,data));
    if(branch_up.data){
      return  new GymBranch(branch_up.data);
    }
  }
  public async destroyBranch(id: number){
    let base = ROUTES.sucursales.destroy(id);

    let branch = ( await this.api.delete(base));
    if(branch.data){
      return  new GymBranch(branch.data);
    }
  }
}