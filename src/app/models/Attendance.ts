import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 
import {Sesion} from '../models/Sesion';


export interface AttendanceParams {
  id: number;
  asistio: boolean;
  id_sesion:number;
  id_usuario:number;
  usuario:any;
  usuario_membresia:any;
}
export interface AttendanceProps extends Modify<AttendanceParams, {

}> {}

export class Attendance {

  private _props: Partial<AttendanceProps> = {}; 
    
  constructor(params?: AttendanceParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: AttendanceParams) {
    Object.assign(this._props, params); 
  }

  set id(value) { this._props.id = value }
  set asistio(value) { this._props.asistio = value }
  set id_sesion(value) { this._props.id_sesion = value }
  set id_usuario(value) { this._props.id_usuario = value }
  set usuario(value) { this._props.usuario = value }
  set usuario_membresia(value) { this._props.usuario_membresia = value }


  get id() { return this._props.id}
  get asistio() { return this._props.asistio}
  get id_sesion() { return this._props.id_sesion}
  get id_usuario() { return this._props.id_usuario}
  get usuario() { return this._props.usuario}
  get usuario_membresia() { return this._props.usuario_membresia}

  
  initEmpty() {
    this._props.id = 0;
    this._props.asistio = false;
    this._props.id_sesion = 0;
    this._props.id_usuario = 0;
    this._props.usuario = null;
    this._props.usuario_membresia = null;

  }

}