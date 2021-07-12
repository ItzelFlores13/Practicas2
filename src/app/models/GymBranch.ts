import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { Address, AddressParams } from './Address';
import { Contact, ContactParams } from './Contact';

export interface GymBranchParams {
  id: number;
  id_gimnasio: number;
  id_contacto: number;
  id_direccion: number;
  nombre: string;
  spotify_link: string;
  terms_and_conditions: string;
  privacy_policy: string;
  informed_consent: string;
  paypal_client_id: string;
  gimnasio: GymParams; 
  direccion: AddressParams; 
  contacto: ContactParams; 
  porcentaje_activo: Boolean;
  porcentaje: number;
  dias_reservacion: number;
  dias_cancelacion: number;
  horas_cancelacion: number;
  
}
export interface GymBranchProps extends Modify<GymBranchParams, {
  direccion: Address; 
  gimnasio: Gym; 
  contacto: Contact;
}> {}

export class GymBranch {

  private props: GymBranchProps; 

  constructor(params?: GymBranchParams) { 
    if (params) this.initParams(params); 
    if (!params) this.initEmpty(); 
  }

  get id() { return this.props.id }
  set id(value) { this.props.id = value }

  get id_gimnasio() { return this.props.id_gimnasio }
  set id_gimnasio(value) { this.props.id_gimnasio = value }

  get id_contacto() { return this.props.id_contacto }
  set id_contacto(value) { this.props.id_contacto = value }

  get id_direccion() { return this.props.id_direccion }
  set id_direccion(value) { this.props.id_direccion = value }

  get nombre() { return this.props.nombre }
  set nombre(value) { this.props.nombre = value }

  get spotify_link() { return this.props.spotify_link }
  set spotify_link(value) { this.props.spotify_link = value }

  get terms_and_conditions() { return this.props.terms_and_conditions }
  set terms_and_conditions(value) { this.props.terms_and_conditions = value }

  get privacy_policy() { return this.props.privacy_policy }
  set privacy_policy(value) { this.props.privacy_policy = value }

  get informed_consent() { return this.props.informed_consent }
  set informed_consent(value) { this.props.informed_consent = value }

  get paypal_client_id() { return this.props.paypal_client_id }
  set paypal_client_id(value) { this.props.paypal_client_id = value }

  get gimnasio() { return this.props.gimnasio }
  set gimnasio(value) { this.props.gimnasio = value }

  get direccion() { return this.props.direccion }
  set direccion(value) { this.props.direccion = value }

  get contacto() { return this.props.contacto }
  set contacto(value) { this.props.contacto = value }

  get porcentaje_activo() { return this.props.porcentaje_activo }
  set porcentaje_activo(value) { this.props.porcentaje_activo = value }

  get porcentaje() { return this.props.porcentaje }
  set porcentaje(value) { this.props.porcentaje = value }

  get dias_reservacion() { return this.props.dias_reservacion }
  set dias_reservacion(value) { this.props.dias_reservacion = value }

  get dias_cancelacion() { return this.props.dias_cancelacion }
  set dias_cancelacion(value) { this.props.dias_cancelacion = value }

  get horas_cancelacion() { return this.props.horas_cancelacion }
  set horas_cancelacion(value) { this.props.horas_cancelacion = value }
  


  private initParams(params: GymBranchParams){
    this.props = { 
      id: params.id,
      id_gimnasio: params.id_gimnasio,
      id_contacto: params.id_contacto,
      id_direccion: params.id_direccion,
      nombre: params.nombre,
      spotify_link: params.spotify_link,
      terms_and_conditions: params.terms_and_conditions,
      privacy_policy: params.privacy_policy,
      informed_consent: params.informed_consent,
      paypal_client_id: params.paypal_client_id,
      gimnasio: params.gimnasio ? new Gym(params.gimnasio) : new Gym(),
      direccion:  params.direccion ? new Address(params.direccion) : new Address(),
      contacto:  params.contacto ? new Contact(params.contacto) : new Contact(),
      porcentaje_activo: params.porcentaje_activo,
      porcentaje: params.porcentaje,
      dias_reservacion: params.dias_reservacion,
      dias_cancelacion : params.dias_cancelacion,
      horas_cancelacion: params.horas_cancelacion
    }    
  }
  private initEmpty(){
    this.props = { 
      id: null,
      id_gimnasio: null,
      id_contacto: null,
      id_direccion: null,
      nombre: "",
      spotify_link: "",
      terms_and_conditions: "",
      privacy_policy: "",
      informed_consent: "",
      paypal_client_id: "",
      gimnasio: new Gym(),
      direccion: new Address(),
      contacto: new Contact(),
      porcentaje_activo: false,
      porcentaje: 0,
      dias_reservacion: 0,
      dias_cancelacion: 0,
      horas_cancelacion: 0,
    }
  }
}