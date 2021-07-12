import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 
import {Sesion} from '../models/Sesion';
import { User } from './User';


export interface GroupWodParams {
  id: number;
  id_gimnasio:number;
  id_sucursal:number;
  nombre:string;
  atletas: User[];
}
export interface GroupWodProps extends Modify<GroupWodParams, {

}> {}

export class GroupWod {

  private _props: Partial<GroupWodProps> = {}; 
    
  constructor(params?: GroupWodParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: GroupWodParams) {
    Object.assign(this._props, params); 
    if(params.atletas.length > 0){
        let data = [];
        params.atletas.forEach(element => {
            data.push(new User(element));
        });
        this._props.atletas = data;
    }
  }

  set id(value) { this._props.id = value }
  set id_gimnasio(value) { this._props.id_gimnasio = value }
  set id_sucursal(value) { this._props.id_sucursal = value }
  set nombre(value) { this._props.nombre = value }
  set atletas(value) { this._props.atletas = value }
  


  get id() { return this._props.id}
  get id_gimnasio() { return this._props.id_gimnasio}
  get id_sucursal() { return this._props.id_sucursal}
  get nombre() { return this._props.nombre}
  get atletas() { return this._props.atletas}


  
  initEmpty() {
    this._props.id = 0;
    this._props.id_gimnasio = 0;
    this._props.id_sucursal = 0;
    this._props.nombre = '';
    this._props.atletas = [];

  }

}