export interface DispersionContactParams {
  id: number; 
  numero_cuenta: number; 
  numero_banco: string; 
  banco: string; 
  titular_cuenta: string; 
  clabe: string; 
}


export class DispersionContact {
  _props: DispersionContactParams; 
  constructor(params: DispersionContact = undefined) {
    if (params) {
      Object.assign(this._props, params); 
    } else {
      this.initEmpty(); 
    }
  }
  initEmpty() {
    this._props = {
      id: null,
      numero_cuenta: null,
      banco: "",
      numero_banco: "",
      titular_cuenta: "",
      clabe: ""
    };
  }
  // Generic setters and getters. Allows for more extensibility.
  get id() { return this._props.id }; 
  set id(value) { this._props.id = value }; 
  get numero_cuenta() { return this._props.numero_cuenta }; 
  set numero_cuenta(value) { this._props.numero_cuenta = value }; 
  get numero_banco() { return this._props.numero_banco }; 
  set numero_banco(value) { this._props.numero_banco = value }; 
  get banco() { return this._props.banco }; 
  set banco(value) { this._props.banco = value }; 
  get titular_cuenta() { return this._props.titular_cuenta }; 
  set titular_cuenta(value) { this._props.titular_cuenta = value }; 
  get clabe() { return this._props.clabe }; 
  set clabe(value) { this._props.clabe = value }; 
}