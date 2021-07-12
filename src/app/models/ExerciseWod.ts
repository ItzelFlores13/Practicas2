import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { differenceInCalendarDays } from 'date-fns'; 
import { Exercise } from './Exercise';

export interface ExerciseWodParams {

   id:number,
   ejercicio: Exercise,
   repeticiones: number,
   intensidad: string,
   tiempo_limite: number,
   tiempo_trabajo: number,
   tiempo_descanso: number,
   id_unidad: number,
   id_ejercicio: number,
   sets: number
}

export interface ExerciseWodProps extends Modify<ExerciseWodParams, {
  direccion: any; 
  contacto_emergencia: any; 
  gimnasio: Gym; 
}> {}

export class ExerciseWod {

  private _props: Partial<ExerciseWodProps> = {}; 
    
  constructor(params?: ExerciseWodParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: ExerciseWodParams) {
    Object.assign(this._props, params); 
    if(params.ejercicio){
        this._props.ejercicio = new Exercise(params.ejercicio);
    }
  }

  get id(){ return this._props.id}
  get ejercicio(){ return this._props.ejercicio}
  get repeticiones(){ return this._props.repeticiones}
  get intensidad(){ return this._props.intensidad}
  get tiempo_limite(){ return this._props.tiempo_limite}
  get tiempo_trabajo(){ return this._props.tiempo_trabajo}
  get tiempo_descanso(){ return this._props.tiempo_descanso}
  get id_unidad(){ return this._props.id_unidad}
  get id_ejercicio(){ return this._props.id_ejercicio}
  get sets(){ return this._props.sets}

  

  set id(value){  this._props.id = value}
  set ejercicio(value){  this._props.ejercicio = value}
  set repeticiones(value){  this._props.repeticiones = value}
  set intensidad(value){  this._props.intensidad = value}
  set tiempo_limite(value){  this._props.tiempo_limite = value}
  set tiempo_trabajo(value){  this._props.tiempo_trabajo = value}
  set tiempo_descanso(value){  this._props.tiempo_descanso = value}
  set id_unidad(value){  this._props.id_unidad = value}
  set id_ejercicio(value){  this._props.id_ejercicio = value}
  set sets(value){  this._props.sets = value}
 


  initEmpty() {
    this._props.id = 0;
    this._props.ejercicio = null;
    this._props.repeticiones = null;
    this._props.intensidad = null;
    this._props.tiempo_limite = null;
    this._props.tiempo_trabajo = null;
    this._props.tiempo_descanso = null;
    this._props.id_unidad = 1;
    this._props.id_ejercicio = null;
    this._props.sets = null;
  }

}
