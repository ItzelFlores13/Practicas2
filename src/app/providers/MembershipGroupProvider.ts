import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { MembershipGroup } from '../models/MembershipGroup';
import { NgxSpinnerService } from 'ngx-spinner';

 export interface MembershipsGroupParams {
  page: number; 
  query: string; 
  id_sucursal: number;
}

@Injectable({
  providedIn: 'root'
})
export class MembershipGroupProvider{  
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
  ) {

  }
  
  public async getMembershipGroups(params: Partial<MembershipsGroupParams>){
    this.spinner.show();
      let base = ROUTES.membresias_group.index(params.id_sucursal);
      if(params.page) base += `?page=${params.page}`;
      if(params.query && params.query.length > 0) base += `&q=${params.query}`;
      let memberships_groups = (await this.api.get(base));
      this.spinner.hide();
      if(memberships_groups.data){
        let mG = [];
        memberships_groups.data.forEach(element => {
          mG.push( new MembershipGroup(element));
        });
        memberships_groups.data = mG;
  
      }
      return memberships_groups;
  }
  
  public async addMembershipGroup(membership: MembershipGroup){
    this.spinner.show();
    let base = ROUTES.membresias_group.create;
    var data = {nombre: membership.nombre, id_sucursal: membership.id_sucursal};
    let membership_group = (await this.api.post(base,data));
    this.spinner.hide();
    return membership_group;

  }

  public async updateMembershipGroup(membership: MembershipGroup){

    this.spinner.show();
    let base = ROUTES.membresias_group.update;
    var data = {nombre: membership.nombre, id: membership.id};
    let membership_group = (await this.api.post(base,data));
    this.spinner.hide();
    return membership_group;
  }

  public async deleteMembershipGRoup(membership: MembershipGroup){

    this.spinner.show();
    let base = ROUTES.membresias_group.destroy(membership.id);
    let membership_group = (await this.api.delete(base));
    this.spinner.hide();
    return membership_group;
  }

  public async getMembershipGroup(id: number){
    this.spinner.show();
    let base = ROUTES.membresias_group.show(id);
    let membership_group = (await this.api.get(base)).data;
    this.spinner.hide();
    let mGroup = new MembershipGroup();
    mGroup.initWithParams(membership_group);
    return  mGroup; 
  }
}
