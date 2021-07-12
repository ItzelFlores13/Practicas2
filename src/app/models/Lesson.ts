import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 
import {Sesion} from '../models/Sesion';


export interface LessonParams {
  id: number;
  nombre:string;
  id_sucursal: number;
  cupo:number;
  notas_especiales:string;
  profesores:any;
  periodos_clase: any[];
  isChecked: boolean;
  sesiones: Sesion[];
  cantidadInscritos: number;
  //sucursal: Sucursal = null,
}
export interface LessonProps extends Modify<LessonParams, {

}> {}

export class Lesson {

  private _props: Partial<LessonProps> = {}; 
    
  constructor(params?: LessonParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: LessonParams) {
    
    let sesion = [];
    if(params.sesiones){
      params.sesiones.forEach(element => {
        sesion.push(new Sesion(element));
      });
      params.sesiones = sesion;
    }
    params.isChecked = false;
    Object.assign(this._props, params); 
  }

  set id(value) { this._props.id = value }
  set nombre(value) { this._props.nombre = value }
  set id_sucursal(value) { this._props.id_sucursal = value }
  set cupo(value) { this._props.cupo = value }
  set notas_especiales(value) { this._props.notas_especiales = value }
  set profesores(value) { this._props.profesores = value }
  set periodos_clase(value) { this._props.periodos_clase = value }
  set isChecked(value) { this._props.isChecked = value }
  set sesiones(value) { this._props.sesiones = value }
  set cantidadInscritos(value) { this._props.cantidadInscritos = value }

  get id() { return this._props.id}
  get nombre() { return this._props.nombre}
  get id_sucursal() { return this._props.id_sucursal}
  get cupo() { return this._props.cupo}
  get notas_especiales() { return this._props.notas_especiales}
  get profesores() { return this._props.profesores}
  get periodos_clase() { return this._props.periodos_clase}
  get isChecked() { return this._props.isChecked}
  get sesiones() { return this._props.sesiones}
  get cantidadInscritos() { return this._props.cantidadInscritos}
  
  initEmpty() {
    this._props.id = 0;
    this._props.nombre = "";
    this._props.cupo = 0;
    this._props.notas_especiales = "";
    this._props.id_sucursal = 0;
    this._props.isChecked = false;
    this._props.periodos_clase = [];
    this._props.sesiones = [];
    this.cantidadInscritos = 0 ;
  }

}