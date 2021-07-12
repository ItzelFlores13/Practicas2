import { Modify } from '../utilities/InterfaceUtilities';
import { User } from './User';

export interface EmailGroupParams {
  id:number;
  nombre:string;
  id_sucursal:number;
  id_gimnasio:number;
  atletas:User[];
  total_atletas:number;
  fecha_creacion:string;
}
export interface EmailGroupProps extends Modify<EmailGroupParams, {
}> {}

export class EmailGroup {
  private _props: Partial<EmailGroupProps> = {}; 
  constructor(params?: EmailGroupParams) {
    if (params){
      this.initWithParams(params);
      if(params.atletas.length > 0){
        let data = []
        params.atletas.forEach(element => {
          data.push(new User(element))
        });
        this._props.atletas = data;
      }
    } 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: EmailGroupParams) {
    Object.assign(this._props, params); 
    if(params.atletas.length > 0){
      let data = []
      params.atletas.forEach(element => {
        data.push(new User(element))
      });
      this._props.atletas = data;
    }
  }

  get id() { return this._props.id }
  get nombre() { return this._props.nombre }
  get atletas() { return this._props.atletas }
  get id_gimnasio() { return this._props.id_gimnasio }
  get id_sucursal() { return this._props.id_sucursal }
  get total_atletas() { return this._props.total_atletas }
  get fecha_creacion() { return this._props.fecha_creacion }


  set id(value) {this._props.id = value}
  set nombre(value) {this._props.nombre = value}
  set atletas(value) {this._props.atletas = value}
  set id_gimnasio(value) {this._props.id_gimnasio = value}
  set id_sucursal(value) {this._props.id_sucursal = value}
  set total_atletas(value) {this._props.total_atletas = value}
  set fecha_creacion(value) {this._props.fecha_creacion = value}



  initEmpty() {
    this._props.id = null;
    this._props.nombre = '';
    this._props.atletas = [];
    this._props.id_gimnasio = null;
    this._props.id_sucursal = null;
    this._props.total_atletas = 0;
  }
}