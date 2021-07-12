import { Modify } from '../utilities/InterfaceUtilities';

export interface ClaseParams {
  id: number;
  nombre: string;
  cupo: number;
  notas_especiales: string;
  profesores: any;
  periodos_clase: any;
  isCheked: boolean;
}

export interface ClaseProp extends Modify<ClaseParams, {
}> {}

export class Clase {

  private _props: Partial<ClaseProp> = {};

  constructor(params?: ClaseParams) {
      if (params) this.initWithParams(params); 
      if (!params) this.initEmpty();  
  }
  initWithParams(params: ClaseParams) {
    Object.assign(this._props, params); 
  }
  initEmpty() {
      this._props.id = 0;
      this._props.nombre = "";
      this._props.cupo = 0;
      this._props.notas_especiales = "";
      this._props.periodos_clase = null;
      this._props.profesores = [];
      this._props.isCheked = false;

  }
  get id() {return this._props.id}
  get nombre() {return this._props.nombre}
  get cupo() {return this._props.cupo}
  get notas_especiales() { return this._props.notas_especiales}
  get profesores() { return this._props.profesores}
  get periodos_clase() { return this._props.periodos_clase}
  get isCheked() { return this._props.isCheked}

  set id(id) { this._props.id=id}
  set nombre(nombre) { this._props.nombre=nombre}
  set cupo(cupo) { this._props.cupo = cupo}
  set notas_especiales(notas) {  this._props.notas_especiales = notas}
  set profesores(prof) {  this._props.profesores = prof}
  set periodos_clase(periodo) {  this._props.periodos_clase = periodo}
  set isCheked(check) {  this._props.isCheked = check}

}