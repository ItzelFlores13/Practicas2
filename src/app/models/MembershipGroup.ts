import { Modify } from '../utilities/InterfaceUtilities';
import { Membership } from './Membership';

export interface MembershipGroupParams {
    id: number;
    nombre: string;
    id_sucursal: number;
    memberships: any;

}
export interface MermbershipGroupProps extends Modify<MembershipGroupParams, {
}> {}

export class MembershipGroup {

  private _props: Partial<MermbershipGroupProps> = {}; 
    
  constructor(params?: MembershipGroupParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }

  get id() { return this._props.id}
  get id_sucursal() { return this._props.id_sucursal}
  get nombre() { return this._props.nombre}
  get memberships() { return this._props.memberships}
  

  set id(value) {  this._props.id = value}
  set id_sucursal(value) {  this._props.id_sucursal = value}
  set nombre(value) {  this._props.nombre = value}
  set memberships(value) {  this._props.memberships = value}
  
  initWithParams(params: MembershipGroupParams) {
    Object.assign(this._props, params); 
  }
  
  initEmpty() {
    this._props.id = 0;
    this._props.id_sucursal = 0;
    this._props.nombre = "";
    this._props.memberships = [];
  }

}
