import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { DispersionContactParams, DispersionContact } from '../models/DispersionContact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DispersionContactProvider {

  gymID: number = undefined; 
  
  constructor(
    private storage: Storage,
    private api: ApiService
  ) {
  }
  private async getGymID(){
    if (this.gymID) return this.gymID; 
    this.gymID = (await this.storage.get('user')).id_gimnasio; 
    return this.gymID; 
  }
  public async create(params: DispersionContact|DispersionContactParams) {    
    await this.getGymID();  
    return this.api.post(ROUTES.dispersionContact.create(this.gymID), {
      ...params
    }); 
  }
  public async update(params: DispersionContact|DispersionContactParams) {
    await this.getGymID();  
    return this.api.post(ROUTES.dispersionContact.update(this.gymID), {
      ...params
    }); 
  }
  public async show() {
    await this.getGymID();  
    return this.api.get(ROUTES.dispersionContact.show(this.gymID)); 
  } 
}