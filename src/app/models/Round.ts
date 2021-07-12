import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { differenceInCalendarDays } from 'date-fns'; 
import { Exercise } from './Exercise';
import { ExerciseWod } from './ExerciseWod';

export interface RoundParams {

   id:number,
   nombre:string,
   id_tipo_ronda:number,
   id_tipo_wod:number,
   tiempo_limite: number,
   sets:number,
   notas:string,
   content:any,
   descanso:any,
   ejercicios:ExerciseWod[];
   editor:any;
   tipo_de_resultado:string,
   viewMore: boolean,
   id_order:number
}

export interface RoundProps extends Modify<RoundParams, {
  direccion: any; 
  contacto_emergencia: any; 
  gimnasio: Gym; 
}> {}

export class Round {

  private _props: Partial<RoundProps> = {}; 
    
  constructor(params?: RoundParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: RoundParams) {
    Object.assign(this._props, params); 
    if(params.ejercicios){
      let data = [];
      params.ejercicios.forEach(element => {
        data.push(new ExerciseWod(element));
      });
      this._props.ejercicios = data;
    }
  }

  get id(){ return this._props.id}
  get nombre(){ return this._props.nombre}
  get id_tipo_ronda(){ return this._props.id_tipo_ronda}
  get id_tipo_wod(){ return this._props.id_tipo_wod}
  get tiempo_limite(){ return this._props.tiempo_limite}
  get sets(){ return this._props.sets}
  get notas(){ return this._props.notas}
  get content(){ return this._props.content}
  get descanso(){ return this._props.descanso}
  get ejercicios(){ return this._props.ejercicios}
  get editor(){ return this._props.editor}
  get tipo_de_resultado(){ return this._props.tipo_de_resultado}
  get viewMore(){ return this._props.viewMore}
  get id_order(){ return this._props.id_order}
  

  set id(value){  this._props.id = value}
  set nombre(value){  this._props.nombre = value}
  set id_tipo_ronda(value){  this._props.id_tipo_ronda = value}
  set id_tipo_wod(value){  this._props.id_tipo_wod = value}
  set tiempo_limite(value){  this._props.tiempo_limite = value}
  set sets(value){  this._props.sets = value}
  set notas(value){  this._props.notas = value}
  set content(value){  this._props.content = value}
  set descanso(value){  this._props.descanso = value}
  set ejercicios(value){  this._props.ejercicios = value}
  set editor(value){  this._props.editor = value}
  set tipo_de_resultado(value){  this._props.tipo_de_resultado = value}
  set viewMore(value){  this._props.viewMore = value}
  set id_order(value){  this._props.id_order = value}


  initEmpty() {
    this._props.id = 0;
    this._props.nombre = '',
    this._props.id_tipo_ronda = 7;
    this._props.id_tipo_wod = 3;
    this._props.tiempo_limite = null;
    this._props.sets = null;
    this._props.notas = '';
    this._props.content = null;
    this._props.descanso = null;
    this._props.ejercicios = [];
    this._props.editor = null;
    this._props.tipo_de_resultado = '12';
    this._props.viewMore = false;
    this._props.id_order = null;
  }

}
