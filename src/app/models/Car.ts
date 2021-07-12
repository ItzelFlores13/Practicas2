import { Modify } from '../utilities/InterfaceUtilities';
import { Membership } from './Membership';
import { MembershipToCar } from './MembershipToCar';

export interface CarParams {
    branch:any;
    membresias:MembershipToCar[];
    articulos:any[];
    puntos:any[];
}
export interface CarProps extends Modify<CarParams, {
}> {}

export class Car {

  private _props: Partial<CarProps> = {}; 
    
  constructor(params?: CarParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }

  set membresias(value) { this._props.membresias = value }
  set branch(value) { this._props.branch = value }
  set articulos(value) { this._props.articulos = value }
  set puntos(value) { this._props.puntos = value }
  get membresias() { return this._props.membresias   }
  get articulos() { return this._props.articulos   }
  get puntos() { return this._props.puntos   }
  get branch() { return this._props.branch   }

 

  initWithParams(params: CarParams) {
    Object.assign(this._props, params); 
  }
  
  initEmpty() {
    this._props.membresias = [];
    this._props.articulos = [];
    this._props.puntos = [];
    this._props.branch = null;
  }
  



}