import { Modify } from '../utilities/InterfaceUtilities';
import {Egress} from '../models/Egress';

export interface CategoryEgressParams {
  id:number;
  id_sucursal:number,
  sucursal:any,
  egresos:Egress[]
  id_gimnasio:number,
  nombre:string;
  sucursales:number[]
}
export interface CategoryEgressProps extends Modify<CategoryEgressParams, {
}> {}

export class CategoryEgress {
  private _props: Partial<CategoryEgressProps> = {}; 
  constructor(params?: CategoryEgressParams) {
    if (params){
        Object.assign(this._props, params); 
        if(params.egresos){
            let data = [];
            params.egresos.forEach(element => {
                data.push(new Egress(element))
            });
            this._props.egresos = data;
        }
    } 
    if (!params) this.initEmpty(); 
  }

  get id() { return this._props.id }
  get id_sucursal() { return this._props.id_sucursal }
  get sucursal() { return this._props.sucursal }
  get egresos() { return this._props.egresos }
  get id_gimnasio() { return this._props.id_gimnasio }
  get nombre() { return this._props.nombre }
  get sucursales() { return this._props.sucursales }
  

  set id(value) {this._props.id = value}
  set id_sucursal(value) {this._props.id_sucursal = value}
  set sucursal(value) {this._props.sucursal = value}
  set egresos(value) {this._props.egresos = value}
  set id_gimnasio(value) {this._props.id_gimnasio = value}
  set nombre(value) {this._props.nombre = value}
  set sucursales(value) {this._props.sucursales = value}

  initEmpty() {
    this._props.id = null;
    this._props.id_sucursal = null;
    this._props.sucursal = null;
    this._props.egresos = [];
    this._props.id_gimnasio = null;
    this._props.nombre = '';
    this._props.sucursales = [];
  }
}