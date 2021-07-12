import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 

export interface UserToCarParams {
  id: number;
  id_usuario:number;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  costumer_token: string;
  email: string;
  fecha_nacimiento: string;
  id_rol: number;
  sexo: string;
  telefono: string;
  tipo_sangre: string;
  foto: any;
  id_gimnasio: number;
  gimnasio: GymParams;
  nombre_gimnasio: string;
  id_sucursal: number;
  direccion:  any; // Direccion;
  contacto_emergencia: any; // ContactoEmergenciaUsuario;
  visitas: number;
  points: number;
  oden_points: number;
  active: number;
  membresias_activas: number;
  usuario_membresia: [];
  uuid:string;
  fechaInicio:string;
  editedFechaInicio: boolean;
  metodoPago: any;
}
export interface UserToCarProps extends Modify<UserToCarParams, {
  direccion: any; 
  contacto_emergencia: any; 
  gimnasio: Gym; 
}> {}

export class UserToCar {

  private _props: Partial<UserToCarProps> = {}; 
    
  constructor(params?: UserToCarParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: UserToCarParams) {
    Object.assign(this._props, params); 
    if (params.gimnasio) this._props.gimnasio = new Gym(params.gimnasio); 
    if (!params.gimnasio) this._props.gimnasio = new Gym(); 
  }

  get gimnasio() { 
    return this._props.gimnasio;  
  }

  get id() { return this._props.id }
  get id_usuario() { return this._props.id_usuario }
  set id(value) { this._props.id = value }
  set id_usuario(value) { this._props.id_usuario = value }
  get nombre() { return this._props.nombre }
  set nombre(value) { this._props.nombre = value }
  get apellido_materno() { return this._props.apellido_materno }
  set apellido_materno(value) { this._props.apellido_materno = value }
  get apellido_paterno() { return this._props.apellido_paterno }
  set apellido_paterno(value) { this._props.apellido_paterno = value }
  set uuid(value) { this._props.uuid = value }
  set fechaInicio(value) { this._props.fechaInicio = value }
  set editedFechaInicio(value) { this._props.editedFechaInicio = value }
  set metodoPago(value) { this._props.metodoPago = value }

  get full_name() {
    return `${this.nombre} ${this.apellido_materno} ${this.apellido_paterno}`; 
  }
  get nombre_completo() { return this.full_name }  



  get metodoPago() { return this._props.metodoPago }
  get editedFechaInicio() { return this._props.editedFechaInicio }
  get fechaInicio() { return this._props.fechaInicio }
  get uuid() { return this._props.uuid }
  get costumer_token() { return this._props.costumer_token }
  set costumer_token(value) { this._props.costumer_token = value }
  get email() { return this._props.email }
  set email(value) { this._props.email = value }
  get fecha_nacimiento() { return this._props.fecha_nacimiento }
  set fecha_nacimiento(value) { this._props.fecha_nacimiento = value }

  get daysUntilBirthday() {
    let fecha_nacimiento = new Date(); 
    let components = this.fecha_nacimiento.split('-').map((s)=>{return Number(s)}); 
    fecha_nacimiento.setMonth(components[1] - 1); 
    fecha_nacimiento.setDate(components[2]); 
    let today = new Date(); 
    return differenceInCalendarDays(fecha_nacimiento, today);
  }

  get formatDaysUntilBirthday() {
    let distance = this.daysUntilBirthday; 
    if (distance == 1) return `EN ${distance} DÍA`; 
    if (distance > 1 && distance < 30) return `EN ${distance} DÍAS`; 
    if (distance == 0) return `HOY`; 
    if (distance == -1) return `HACE ${Math.abs(distance)} DÍA`; 
    if (distance < -1 && distance > -30) return `HACE ${Math.abs(distance)} DÍAS`; 
    return this.fecha_nacimiento; 
  }

  get CUMPLEANOS_PROXIMO() {
    return this.daysUntilBirthday < 30 && this.daysUntilBirthday > -30; 
  }

  get MASTER(): boolean { return this.id_rol == USERS.MASTER.ID_ROL; }
  get SUPERADMIN(): boolean { return this.id_rol == USERS.SUPERADMIN.ID_ROL; }
  get ADMIN_CLIENTE(): boolean { return this.id_rol == USERS.ADMIN_CLIENTE.ID_ROL; }
  get ADMIN_SUCURSAL(): boolean { return this.id_rol == USERS.ADMIN_SUCURSAL.ID_ROL; }
  get ENTRENADOR(): boolean { return this.id_rol == USERS.ENTRENADOR.ID_ROL; }
  get ATLETA(): boolean { return this.id_rol == USERS.ATLETA.ID_ROL; }
  get CAJA(): boolean { return this.id_rol == USERS.CAJA.ID_ROL; }

  get id_rol() { return this._props.id_rol }
  set id_rol(value) { this._props.id_rol = value }

  get rol(): { NAME: string; ID_ROL: number; } {
    let ROL = undefined; 
    Object.keys(USERS).forEach((U)=>{
      if (USERS[U].ID_ROL == this.id_rol) ROL = USERS[U]; 
    }); 
    return ROL; 
  }

  get sexo() { return this._props.sexo }
  set sexo(value) { this._props.sexo = value }
  get telefono() { return this._props.telefono }
  set telefono(value) { this._props.telefono = value }
  get tipo_sangre() { return this._props.tipo_sangre }
  set tipo_sangre(value) { this._props.tipo_sangre = value }
  
  get foto() { 
    let placeholder_url = '/assets/images/profile-placeholder.png'; 
    if (this._props.foto == null || this._props.foto == undefined) return placeholder_url; 
    //if (this._props.foto.includes('assets/imgs/Global/placeholder.png')) return placeholder_url; 
    return this._props.foto; 
    //return this._props.foto;
  }
  set foto(value) { this._props.foto = value }

  get id_gimnasio() { return this._props.id_gimnasio }
  set id_gimnasio(value) { this._props.id_gimnasio = value }
  get nombre_gimnasio() { return this._props.nombre_gimnasio }
  set nombre_gimnasio(value) { this._props.nombre_gimnasio = value }
  get id_sucursal() { return this._props.id_sucursal }
  set id_sucursal(value) { this._props.id_sucursal = value }
  get direccion() { return this._props.direccion }
  set direccion(value) { this._props.direccion = value }
  get contacto_emergencia() { return this._props.contacto_emergencia }
  set contacto_emergencia(value) { this._props.contacto_emergencia = value }
  get visitas() { return this._props.visitas }
  set visitas(value) { this._props.visitas = value }
  get points() { return this._props.points }
  set points(value) { this._props.points = value }
  get oden_points() { return this._props.oden_points }
  set oden_points(value) { this._props.oden_points = value }
  get active() { return this._props.active }
  set active(value) { this._props.active = value }
  get membresias_activas() { return this._props.membresias_activas }
  set membresias_activas(value) { this._props.membresias_activas = value }

  set usuario_membresia(value) { this._props.usuario_membresia = value }
  get usuario_membresia() { return this._props.usuario_membresia; }

  get ACTIVO_EN_APP() {
    return this.active == 1; 
  }

  get status(): { 
    ACTIVO: boolean; 
    POR_EXPIRAR: boolean; 
    EXPIRADO: boolean; 
  } {
    let hoy = new Date();
    let status: 'activo'|'a-punto-de-expirar'|'expirado' = 'activo'; 
    if (this.usuario_membresia.length > 0) {
      /* MEMB SHOULD BE A MEMBERSHIP TYPE OF OBJECT, NOT ANY. FIXME LATER */
      for (var i = 0; i < this.usuario_membresia.length; i++) {
        let memb: any = this.usuario_membresia[i]; 
        let fecha_corte = new Date(memb.fecha_corte); 
        if (differenceInCalendarDays(fecha_corte, hoy) < 5) status = 'a-punto-de-expirar';
        if (differenceInCalendarDays(fecha_corte, hoy) < 0) {
          status = 'expirado'; 
          break;
        }
      }
    } 
    if (this.usuario_membresia.length == 0) status = 'expirado'; 
    return {
      ACTIVO: status == 'activo', 
      POR_EXPIRAR: status == 'a-punto-de-expirar', 
      EXPIRADO: status == 'expirado'
    }; 
  }


  initEmpty() {
    this._props.id = 0;
    this._props.nombre = "";
    this._props.apellido_materno = "";
    this._props.apellido_paterno = "";
    this._props.costumer_token = "";
    this._props.email = "";
    this._props.fecha_nacimiento = "";
    this._props.id_rol = 6;
    this._props.sexo = "";
    this._props.telefono = "";
    this._props.tipo_sangre = "";
    this._props.foto = "assets/images/profile-placeholder.png";
    this._props.id_gimnasio = 0;
    this._props.gimnasio = new Gym();
    this._props.nombre_gimnasio
    this._props.id_sucursal = 0;
    // this._props.direccion = new Direccion();
    // this._props.contacto_emergencia = new ContactoEmergenciaUsuario();
    this._props.direccion = {}; 
    this._props.contacto_emergencia = {}; 
    this._props.visitas;
    this._props.points = 0;
    this._props.oden_points = 0;
    this._props.active = 0;
    this._props.membresias_activas = 0;
    this._props.usuario_membresia = [];
    this._props.uuid = null;
    this._props.fechaInicio = "";
    this._props.editedFechaInicio = false;
    this.metodoPago = 3;
    this._props.id_usuario = null;
  }

}