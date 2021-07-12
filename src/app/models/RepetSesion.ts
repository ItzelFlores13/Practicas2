import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 

export interface RepetSesionParams {
     id: number,
     hora_inicio: string ,
     hora_fin: string,
     dia: any,   
}
export interface RepetSesionProps extends Modify<RepetSesionParams, {

}> {}

export class RepetSesion {

  private _props: Partial<RepetSesionProps> = {}; 
    
  constructor(params?: RepetSesionParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: RepetSesionParams) {
    Object.assign(this._props, params); 
  }

  set id(value) { this._props.id = value }
  set hora_inicio(value) { this._props.hora_inicio = value }
  set hora_fin(value) { this._props.hora_fin = value }
  set dia(value) { this._props.dia = value }
  


  get id() { return this._props.id}
  get hora_inicio() { return this._props.hora_inicio}
  get hora_fin() { return this._props.hora_fin}
  get dia() { return this._props.dia}
  

  
  initEmpty() {
    this._props.id = 0;
    this._props.hora_inicio = "";
    this._props.hora_fin = "";
    this._props.dia = "";
    

  }

}