import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { MembershipGroup } from '../models/MembershipGroup';
import { Membership } from '../models/Membership';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';

export interface MembershipParams {
  page: number;
  query: string;
  id_tipo_membresia: number;
}

@Injectable({
  providedIn: 'root'
})
export class MembershipProvider {
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
  ) {

  }
  /* public async getMemberships(params: Partial<MembershipParams>){
     let base = ROUTES.membresias.index(params.id_tipo_membresia);
     if(params.page) base += `?page=${params.page}`;
     if(params.query && params.query.length > 0) base += `&q=${params.query}`;
     let memberships = (await this.api.get(base)).data;
     return memberships.map((mp) => {
       return new Membership(mp);
     }) 
 } */
  public async searchMemberships(query: string, id_sucursal: number) {
    let base = ROUTES.membresias.search;
    base += `?id_sucursal=${id_sucursal}`;
    base += `&q=${query}`;
    let memberships = (await this.api.get(base));

    if (memberships.data) {
      let data = [];
      memberships.data.map((mp) => {
        data.push(new Membership(mp));
      })
      memberships.data = data;
    }
    return memberships;
  }
  public async getMembershipsInGroup(id: number) {
    this.spinner.show();
    let base = ROUTES.membresias.inGroup(id);
    let memberships = (await this.api.get(base)).data;
    this.spinner.hide();
    return memberships.map((mp) => {
      return new Membership(mp);
    })
  }
  /*  public async showMembership(id: number){
      let base = ROUTES.membresias.show(id);
      let membership = (await this.api.get(base)).data;
   } */
  public async getMemberships(params: Partial<MembershipParams>) {
    this.spinner.show();
    let base = ROUTES.membresias.index(params.id_tipo_membresia);
    if (params.page) base += `?page=${params.page}`;
    if (params.query && params.query.length > 0) base += `&q=${params.query}`;
    let memberships = (await this.api.get(base));
    this.spinner.hide();
    if (memberships.data) {
      let mem = [];
      memberships.data.forEach(element => {
        mem.push(new Membership(element));
      });
      memberships.data = mem;
    }
    return memberships;

  }
  public async showMembership(id: number) {
    this.spinner.show();
    let base = ROUTES.membresias.show(id);
    let membership = (await this.api.get(base)).data;
    this.spinner.hide();
    return membership;
  }
  public async updateMembership(membership: Membership) {

    this.spinner.show();
    let costo:number=parseFloat((membership.costo).replace(',',''))
    let base = ROUTES.membresias.update;
    let new_membership = {
      id: membership.id,
      id_tipo_membresia: membership.id_tipo_membresia,
      accumulates_points: membership.accumulates_points,
      clases: JSON.stringify(membership.clases),
      costo: costo,
      duracion: membership.duracion,
      hide: membership.hide,
      limitada: membership.limitada,
      nombre: membership.nombre,
      num_vigencia: membership.num_vigencia,
      points: membership.points,
      tipo_vigencia: membership.tipo_vigencia,
      visitas_ilimitadas: membership.visitas_ilimitadas,
      cantidad_visitas: membership.cantidad_visitas
    }
    let member = (await this.api.post(base, new_membership)).data;
    this.spinner.hide();
    return member;
  }

  public async addMembership(membership: Membership) {

    this.spinner.show();
    let costo:number=parseFloat((membership.costo).replace(',',''))
    console.log(membership.costo,costo)
    let base = ROUTES.membresias.create;
    let new_membership = {
      id_tipo_membresia: membership.id_tipo_membresia,
      accumulates_points: membership.accumulates_points,
      clases: JSON.stringify(membership.clases),
      costo: costo,
      duracion: membership.duracion,
      hide: membership.hide,
      limitada: membership.limitada,
      nombre: membership.nombre,
      num_vigencia: membership.num_vigencia,
      points: membership.points,
      tipo_vigencia: membership.tipo_vigencia,
      visitas_ilimitadas: membership.visitas_ilimitadas,
      cantidad_visitas: membership.cantidad_visitas
    }
    let member = (await this.api.post(base, new_membership)).data;
    this.spinner.hide();
    return member;
  }
  /* public async deleteMembership(id: number){
    let base = ROUTES.membresias.destroy(id);
    let membership = ( await this.api.delete(base)).data;
    return membership;
  }
} 
    this.spinner.hide();
    return member;
  } */
  public async deleteMembership(id: number) {
    this.spinner.show();
    let base = ROUTES.membresias.destroy(id);
    let membership = (await this.api.delete(base)).data;
    this.spinner.hide();
    return membership;
  }

  /**
    * @author Sergio Castro
    * @description  Obtiene las membresias del gimnasio para la págna del gimnasio
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @return lista de membresías
    * @exceptions lista de errores en petición de api
   */
  public async getMembershipsByGym(id: number) {
    this.spinner.show();
    let base = ROUTES.membresias.membershipGym(id);
    let membership = (await this.api.get(base));
    this.spinner.hide();
    return membership;
  }
}
