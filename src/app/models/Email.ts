import { Modify } from '../utilities/InterfaceUtilities';
import { EmailGroup } from './EmailGroup';
import { User } from './User';

export interface EmailParams {
  id:number;
  fecha_creacion:number;
  titulo:any;
  contenido_quill:string;
  contenido_html:string;
  tipo_email:number;
  fecha_programada:string;
  hora_programada:string;
  id_gimnasio:number;
  atletas:User[];
  grupos:EmailGroup[];
  sucursales:any;
  dias_semana:any;
  dias_mes:any;
  recurrencia_activa:boolean;
  destinatarios:number;
  envio_sucursal:any;
}
export interface EmailProps extends Modify<EmailParams, {
}> {}

export class Email {
  private _props: Partial<EmailProps> = {}; 
  constructor(params?: EmailParams) {
    if (params){
      Object.assign(this._props, params); 
      if(params.atletas && params.atletas.length > 0){
        let data = []
        params.atletas.forEach(element => {
          data.push(new User(element))
        });
        this._props.atletas = data;
      }
    } 
    if (!params) this.initEmpty(); 
  }

  get id() { return this._props.id }
  get fecha_creacion() { return this._props.fecha_creacion }
  get titulo() { return this._props.titulo }
  get contenido_quill() { return this._props.contenido_quill }
  get contenido_html() { return this._props.contenido_html }
  get tipo_email() { return this._props.tipo_email }
  get fecha_programada() { return this._props.fecha_programada }
  get hora_programada() { return this._props.hora_programada }
  get id_gimnasio() { return this._props.id_gimnasio }
  get atletas() { return this._props.atletas }
  get grupos() { return this._props.grupos }
  get sucursales() { return this._props.sucursales }
  get dias_semana() { return this._props.dias_semana }
  get dias_mes() { return this._props.dias_mes }
  get recurrencia_activa() { return this._props.recurrencia_activa }
  get destinatarios() { return this._props.destinatarios }
  get envio_sucursal() { return this._props.envio_sucursal }


  set id(value) {this._props.id = value}
  set fecha_creacion(value) {this._props.fecha_creacion = value}
  set titulo(value) {this._props.titulo = value}
  set tipo_email(value) {this._props.tipo_email = value}
  set fecha_programada(value) {this._props.fecha_programada = value}
  set hora_programada(value) {this._props.hora_programada = value}
  set contenido_quill(value) {this._props.contenido_quill = value}
  set contenido_html(value) {this._props.contenido_html = value}
  set id_gimnasio(value) {this._props.id_gimnasio = value}
  set atletas(value) {this._props.atletas = value}
  set grupos(value) {this._props.grupos = value}
  set sucursales(value) {this._props.sucursales = value}
  set dias_semana(value) {this._props.dias_semana = value}
  set dias_mes(value) {this._props.dias_mes = value}
  set recurrencia_activa(value) {this._props.recurrencia_activa = value}
  set destinatarios(value) {this._props.destinatarios = value}
  set envio_sucursal(value) {this._props.envio_sucursal = value}



  initEmpty() {
    this._props.id = null;
    this._props.fecha_creacion = null;
    this._props.contenido_quill = '',
    this._props.contenido_html = '',
    this._props.fecha_programada = null;
    this._props.tipo_email = 0;
    this._props.titulo = '',
    this._props.id_gimnasio = null;
    this._props.hora_programada = null;
    this._props.atletas = [];
    this._props.grupos = [];
    this._props.sucursales = [];
    this._props.dias_semana = null;
    this._props.dias_mes = null;
    this._props.recurrencia_activa = null;
    this._props.destinatarios = 0;
    this._props.envio_sucursal = 0;
  }
}