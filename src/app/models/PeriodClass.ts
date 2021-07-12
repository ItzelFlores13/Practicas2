import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 

export interface PeriodClassParams {
    id: number;
    dia:any;
    id_clase:number;
    id_dia:number;
    hora_inicio:string;
    hora_fin:string;
    id_wod:number;
    id_profesor:number;
    periodo:any;
    
}
export interface PeriodClassProps extends Modify<PeriodClassParams, {

}> {}

export class PeriodClass {

  private _props: Partial<PeriodClassProps> = {}; 
    
  constructor(params?: PeriodClassParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: PeriodClassParams) {
    Object.assign(this._props, params); 
  }

  set id(value) { this._props.id = value }
  set dia(value) { this._props.dia = value }
  set id_clase(value) { this._props.id_clase = value }
  set hora_inicio(value) { this._props.hora_inicio = value }
  set hora_fin(value) { this._props.hora_fin = value }
  set id_wod(value) { this._props.id_wod = value }
  set id_profesor(value) { this._props.id_profesor = value }
  set periodo(value) { this._props.periodo = value }
  set id_dia(value) { this._props.id_dia = value }



  get id() { return this._props.id}
  get id_profesor() { return this._props.id_profesor}
  get dia() { return this._props.dia}
  get id_dia() { return this._props.id_dia}
  get id_clase() { return this._props.id_clase}
  get id_wod() { return this._props.id_wod}
  get hora_inicio() { return this._props.hora_inicio}
  get hora_fin() { return this._props.hora_fin}
  get periodo() { return this._props.periodo}


  
  initEmpty() {
    this._props.id = 0;
    this._props.id_profesor = 0;
    this._props.dia = '';
    this._props.id_dia = -1;
    this._props.id_clase = 0;
    this._props.hora_fin = '';
    this._props.hora_inicio = '';
    this._props.id_wod = null;
    this._props.periodo = null;
  }

}