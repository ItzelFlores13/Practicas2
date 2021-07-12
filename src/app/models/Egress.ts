import { Modify } from '../utilities/InterfaceUtilities';

export interface EgressParams {
  id:number;
  cantidad:number;
  categoria:any;
  descripcion:string;
  fecha:any;
  mes:any;
  id_categoria:number;
  id_sucursal:number;
  id_usuario:number;
}
export interface EgressProps extends Modify<EgressParams, {
}> {}

export class Egress {
  private _props: Partial<EgressProps> = {}; 
  constructor(params?: EgressParams) {
    if (params) Object.assign(this._props, params); 
    if (!params) this.initEmpty(); 
  }

  get id() { return this._props.id }
  get cantidad() { return this._props.cantidad }
  get descripcion() { return this._props.descripcion }
  get categoria() { return this._props.categoria }
  get fecha() { return this._props.fecha }
  get id_categoria() { return this._props.id_categoria }
  get id_sucursal() { return this._props.id_sucursal }
  get id_usuario() { return this._props.id_usuario }
  get mes() { return this._props.mes }

  set id(value) {this._props.id = value}
  set cantidad(value) {this._props.cantidad = value}
  set descripcion(value) {this._props.descripcion = value}
  set categoria(value) {this._props.categoria = value}
  set fecha(value) {this._props.fecha = value}
  set id_sucursal(value) {this._props.id_sucursal = value}
  set id_categoria(value) {this._props.id_categoria = value}
  set id_usuario(value) {this._props.id_usuario = value}
  set mes(value) {this._props.mes = value}


  initEmpty() {
    this._props.id = null;
    this._props.cantidad = 0;
    this._props.descripcion = '';
    this._props.categoria = null;
    this._props.fecha = '';
    this._props.id_sucursal = null;
    this._props.id_usuario = null;
    this._props.mes = null;
  }
}