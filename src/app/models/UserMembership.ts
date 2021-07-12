import { Modify } from '../utilities/InterfaceUtilities';

export interface UserMermbershipParams {
  id: number;
  costo: any;
  costo_final: any;
  editado: boolean;
  descuento: number;
  fecha_inicio: string;
  fecha_corte: string;
  visitas: number;
  membresia: any;
}

export interface UserMermbershipProps extends Modify<UserMermbershipParams, {
}> {}

export class UserMermbership {
  private _props: Partial<UserMermbershipProps> = {};
  constructor(params?: UserMermbershipParams) {
    Object.assign(this._props,params)
    if (params) this.initParams(params); 
    if (!params) this.initEmpty(); 
  }

  get id() {return this._props.id}
  get costo() {return  this._props.costo}
  get costo_final() {return this._props.costo_final}
  get editado() {return this._props.editado}
  get fecha_corte() {return this._props.fecha_corte}
  get fecha_inicio() {return this._props.fecha_inicio}
  get visitas() {return this._props.visitas}
  get descuento() {return this._props.descuento}
  get membresia() { return this._props.membresia }
 
  set id(value)  { this._props.id =  value }
  set costo_final(value)  { this._props.costo_final =  value }
  set editado(value)  { this._props.editado =  value }
  set fecha_corte(value)  { this._props.fecha_inicio = this.formatFecha(value);}
  set fecha_inicio(value)  { this._props.fecha_inicio = this.formatFecha(value);}
  set visitas(value)  { this._props.visitas =  value }
  set descuento(value)  { this._props.descuento =  value }



  initParams(params: UserMermbershipParams){
    this._props.id = params.id;
    this._props.costo = params.costo;
    this._props.costo_final = params.costo_final;
    this._props.editado = params.editado;
    this._props.fecha_corte = this.formatFecha(params.fecha_corte);
    this._props.fecha_inicio = this.formatFecha(params.fecha_inicio);
    this._props.visitas = params.visitas;
    this._props.membresia = params.membresia;
    this._props.descuento = params.descuento; 
  }

  /**
    * @author Sergio Castro
    * @description Determina el formato de las fechas 
    * @date 28 septiembre 2020
    * @param fechaValue fecha a transformar
    * @return fecha con nuevo formato 
   */
  formatFecha(fechaValue:string){
    fechaValue=fechaValue.split(' ')[0].replace(/-/g, '/')
    let fecha = new Date(fechaValue);
    let dia = fecha.getDate() < 10 ? '0'+fecha.getDate():fecha.getDate();
    let mes =  (fecha.getMonth()+1) < 10 ? '0'+(fecha.getMonth()+1):(fecha.getMonth()+1);
    let value =  dia +'/'+mes+'/'+ fecha.getFullYear(); 
    return value;
  }
  
  initEmpty(){
    this._props.id = null;
    this._props.costo = 0;
    this._props.costo_final = 0;
    this._props.editado = false;
    this._props.fecha_corte = null;
    this._props.fecha_inicio = null;
    this._props.visitas = 0;
    this._props.membresia = null;
    this._props.descuento = 0;
  }
}