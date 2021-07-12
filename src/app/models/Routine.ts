import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { differenceInCalendarDays } from 'date-fns'; 
import { Round } from './Round';

export interface RoutineParams {

    id:number;
    id_tipo_wod: number,
    id_usuario: number,
    nombre: string,
    descripcion: string,
    texto: string,
    fecha_de_publicacion: string,
    publicar_ahora: number,
    content: any ,
    rondas: Round[],
    tipo_de_resultado: string,
    fecha_de_realizacion: string,
    wod_especificos: boolean,
    atletas: any,
    crear_grupo: boolean,
    nombre_grupo: string, 
    viewMore: boolean,
    rondas_eliminar: number [];
    tz: string;
    enviar_notificacion:boolean;
}
export interface RoutineProps extends Modify<RoutineParams, {
  direccion: any; 
  contacto_emergencia: any; 
  gimnasio: Gym; 
}> {}

export class Routine {

  private _props: Partial<RoutineProps> = {}; 
    
  constructor(params?: RoutineParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: RoutineParams) {
    Object.assign(this._props, params); 
    if(params.rondas.length > 0){
      let data = []
      params.rondas.forEach(element => {
        data.push(new Round(element))
      });
      this._props.rondas = data;
    }
    this._props.rondas_eliminar = [];
  }

  get id(){ return this._props.id}
  get id_tipo_wod(){ return this._props.id_tipo_wod}
  get id_usuario(){ return this._props.id_usuario}
  get nombre(){ return this._props.nombre}
  get descripcion(){ return this._props.descripcion}
  get texto(){ return this._props.texto}
  get fecha_de_publicacion(){ return this._props.fecha_de_publicacion}
  get publicar_ahora(){ return this._props.publicar_ahora}
  get content(){ return this._props.content}
  get rondas(){ return this._props.rondas}
  get tipo_de_resultado(){ return this._props.tipo_de_resultado}
  get fecha_de_realizacion(){ return this._props.fecha_de_realizacion}
  get wod_especificos(){ return this._props.wod_especificos}
  get atletas(){ return this._props.atletas}
  get crear_grupo(){ return this._props.crear_grupo}
  get nombre_grupo(){ return this._props.nombre_grupo}
  get viewMore(){ return this._props.viewMore}
  get rondas_eliminar(){ return this._props.rondas_eliminar}
  get tz(){ return this._props.tz}
  get enviar_notificacion(){ return this._props.enviar_notificacion}


  set id(value){  this._props.id = value}
  set id_tipo_wod(value){  this._props.id_tipo_wod = value}
  set id_usuario(value){  this._props.id_usuario = value}
  set nombre(value){  this._props.nombre = value}
  set descripcion(value){  this._props.descripcion = value}
  set texto(value){  this._props.texto = value}
  set fecha_de_publicacion(value){  this._props.fecha_de_publicacion = value}
  set publicar_ahora(value){  this._props.publicar_ahora = value}
  set content(value){  this._props.content = value}
  set rondas(value){  this._props.rondas = value}
  set tipo_de_resultado(value){  this._props.tipo_de_resultado = value}
  set fecha_de_realizacion(value){  this._props.fecha_de_realizacion = value}
  set wod_especificos(value){  this._props.wod_especificos = value}
  set atletas(value){  this._props.atletas = value}
  set crear_grupo(value){  this._props.crear_grupo = value}
  set nombre_grupo(value){  this._props.nombre_grupo = value}
  set viewMore(value){  this._props.viewMore = value}
  set rondas_eliminar(value){  this._props.rondas_eliminar = value}
  set tz(value){  this._props.tz = value}
  set enviar_notificacion(value){  this._props.enviar_notificacion = value}


  initEmpty() {
    this._props.id = 0;
    this._props.id_tipo_wod = 3;
    this._props.id_usuario = -1;
    this._props.nombre = ''
    this._props.descripcion = '';
    this._props.texto = '';
    this._props.fecha_de_publicacion = '';
    this._props.publicar_ahora = 0;
    this._props.content = '';
    this._props.rondas = [];
    this._props.tipo_de_resultado = '';
    this._props.fecha_de_realizacion = '';
    this._props.wod_especificos = false;
    this._props.atletas = [];
    this._props.crear_grupo = false;
    this._props.nombre_grupo = '';
    this._props.viewMore = false;
    this._props.rondas_eliminar = [];
    this.tz = null;
    this.enviar_notificacion = false;
  }

}




/* 
public id: number = 0,
    public id_tipo_wod: number = 0,
    public id_usuario: number = 0,
    public nombre: string = "",
    public descripcion: string = "",
    public texto: string = "",
    public fecha_de_publicacion: string = "",
    public publicar_ahora: number = 0,
    public content: any = "",
    public rondas: Ronda[] = [],
    public tipo_de_resultado: string = "",
    public fecha_de_realizacion: string = "",
    public wod_especificos: boolean = true,
    public atletas: Routine[] = [],
    public crear_grupo: boolean = false,
    public nombre_grupo: string = "", */