import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 

export interface SesionParams {
    id: number;
    id_profesor: number;
    id_clase: number;
    fecha_inicio: string;
    fecha_fin: string;
    id_sucursal: number;
    id_rutina: number;
    notas_especiales: string;
    cupo: number;
    cupo_disponible: number;
    id_periodo: number;
    wod: any;
    profesor: any;
    updateRepetitivo:boolean;
    zoom_link: string;
}
export interface SesionProps extends Modify<SesionParams, {

}> {}

export class Sesion {

  private _props: Partial<SesionProps> = {}; 
    
  constructor(params?: SesionParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: SesionParams) {
    Object.assign(this._props, params); 
  }

  set id(value) { this._props.id = value }
  set id_profesor(value) { this._props.id_profesor = value }
  set id_clase(value) { this._props.id_clase = value }
  set fecha_inicio(value) { this._props.fecha_inicio = value }
  set fecha_fin(value) { this._props.fecha_fin = value }
  set id_sucursal(value) { this._props.id_sucursal = value }
  set id_rutina(value) { this._props.id_rutina = value }
  set notas_especiales(value) { this._props.notas_especiales = value }
  set cupo(value) { this._props.cupo = value }
  set cupo_disponible(value) { this._props.cupo_disponible = value }
  set id_periodo(value) { this._props.id_periodo = value }
  set wod(value) { this._props.wod = value }
  set profesor(value) { this._props.profesor = value }
  set updateRepetitivo(value) { this._props.updateRepetitivo = value }
  set zoom_link(value) { this._props.zoom_link = value }


  get id() { return this._props.id}
  get id_profesor() { return this._props.id_profesor}
  get id_clase() { return this._props.id_clase}
  get fecha_inicio() { return this._props.fecha_inicio}
  get fecha_fin() { return this._props.fecha_fin}
  get id_sucursal() { return this._props.id_sucursal}
  get id_rutina() { return this._props.id_rutina}
  get notas_especiales() { return this._props.notas_especiales}
  get cupo() { return this._props.cupo}
  get cupo_disponible() { return this._props.cupo_disponible}
  get id_periodo() { return this._props.id_periodo}
  get wod() { return this._props.wod}
  get profesor() { return this._props.profesor}
  get updateRepetitivo() { return this._props.updateRepetitivo}
  get zoom_link() { return this._props.zoom_link}

  
  initEmpty() {
    this._props.id = 0;
    this._props.id_profesor = -1;
    this._props.id_clase = -1;
    this._props.fecha_inicio = "";
    this._props.fecha_fin = "";
    this._props.id_sucursal = 0;
    this._props.id_rutina = 0;
    this._props.notas_especiales = "";
    this._props.cupo = 0;
    this._props.cupo_disponible = 0;
    this._props.id_periodo = 0;
    this._props.wod = null;
    this._props.profesor = [];
    this._props.updateRepetitivo = false;
    this._props.zoom_link = '';
  }

}