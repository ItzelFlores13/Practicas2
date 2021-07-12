import { Modify } from '../utilities/InterfaceUtilities';
import { UserToCar } from './UserToCar';

export interface MembershipToCarParams {
  accumulates_points: 0|1; 
  cantidad_visitas: number; 
  clases: /*Clase*/[]; 
  costo: number; 
  duracion: number; 
  hide: 0|1; 
  id: number; 
  id_tipo_membresia: number; 
  limitada: 0|1; 
  nombre: string; 
  num_vigencia: 0|1; 
  points: number; 
  tipo_membresia: /*TipoMembresia*/any; 
  tipo_vigencia: string|"meses"; 
  visitas_ilimitadas: 0|1;
  userShop:UserToCar[];
  viewUsers:boolean;
  uuid:string;
  costo_final:number;
  editado:boolean;
  fechaInicio:string;
  
}

export interface MermbershipProps extends Modify<MembershipToCarParams, {
}> {}

export class MembershipToCar {

  private _props: Partial<MermbershipProps> = {}; 

  constructor(params?: MembershipToCarParams) {
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: MembershipToCarParams) {
    Object.assign(this._props, params); 
  }
  initEmpty() {
      this._props.id = 0;
      this._props.id_tipo_membresia = 0;
      this._props.accumulates_points = 0;
      this._props.clases = [];
      this._props.costo = 0;
      this._props.duracion = 0;
      this._props.hide = 0;
      this._props.limitada = 0;
      this._props.nombre = "";
      this._props.num_vigencia = 0;
      this._props.points = 0;
      this._props.tipo_vigencia = "meses";
      this._props.visitas_ilimitadas = 0;
      this._props.cantidad_visitas = 1;
      this._props.userShop = [];
      this._props.viewUsers = false;
      this._props.uuid = '';
      this._props.costo_final = 0;
      this._props.editado = false;

  }

  get id() {return this._props.id}
  get id_tipo_membresia() {return this._props.id_tipo_membresia}
  get accumulates_points() {return this._props.accumulates_points}
  get clases() {return this._props.clases}
  get costo() {return this._props.costo}
  get duracion() {return this._props.duracion}
  get hide() {return this._props.hide}
  get limitada() {return this._props.limitada}
  get nombre() {return this._props.nombre}
  get num_vigencia() {return this._props.num_vigencia}
  get points() {return this._props.points}
  get tipo_vigencia() {return this._props.tipo_vigencia}
  get visitas_ilimitadas() {return this._props.visitas_ilimitadas}
  get cantidad_visitas() { return this._props.cantidad_visitas }
  get userShop() { return this._props.userShop }
  get viewUsers() { return this._props.viewUsers }
  get uuid() { return this._props.uuid }
  get costo_final() { return this._props.costo_final }
  get editado() { return this._props.editado }

  set id(id) {this._props.id = id}
  set id_tipo_membresia(id_mem) { this._props.id_tipo_membresia = id_mem}
  set accumulates_points(ac_points) {this._props.accumulates_points = ac_points}
  set clases(clas) { this._props.clases = clas }
  set costo(cost) { this._props.costo = cost }
  set duracion(dur) { this._props.duracion = dur }
  set hide(hid) {this._props.hide = hid}
  set limitada(lim) {this._props.limitada = lim}
  set nombre(nom) { this._props.nombre = nom }
  set num_vigencia(n_vigencia) { this._props.num_vigencia = n_vigencia }
  set points(point) { this._props.points = point }
  set tipo_vigencia(t_vigencia) {this._props.tipo_vigencia = t_vigencia}
  set visitas_ilimitadas(v_ilimitadas) {this._props.visitas_ilimitadas = v_ilimitadas}
  set cantidad_visitas(cVisitas) { this._props.cantidad_visitas = cVisitas }
  set userShop(cVisitas) { this._props.userShop = cVisitas }
  set viewUsers(cVisitas) { this._props.viewUsers = cVisitas }
  set uuid(value) { this._props.uuid = value }
  set costo_final(value) { this._props.costo_final = value }
  set editado(value) { this._props.editado = value }
}