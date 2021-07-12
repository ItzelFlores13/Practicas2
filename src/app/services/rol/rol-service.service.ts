import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  user: User;
  package: any;
  constructor(
    private storage: Storage
  ) { }
  public async getUserRol():Promise<number>{
    this.user = await this.storage.get("user");  
    return this.user.id_rol;
  }
  public async getPackageGym():Promise<any>{
    this.package = await this.storage.get('gymSubscription');
    // console.log(this.package);
    return this.package == null ? '': this.package.data;
  }
}
