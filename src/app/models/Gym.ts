import { Modify } from '../utilities/InterfaceUtilities';
import { Pais } from '../models/Pais';
import { GymBranch } from './GymBranch';

export interface GymParams {
  id: number;
  nombre: string;
  logo: string;
  pagina: string;
  descripcion: string;
  status: number;
  allowed_athletes_num: number;
  allowed_branches_num: number;
  current_branches_num: number;
  current_athletes_num: number;
  pais: Pais;
  paquete: string;
  subscription_openpay: string;
  subscription_paypal: string;
  sucursales: GymBranch[];
  settings_gimnasio:any[];
  settings_pagina_gimnasio:any;
  cargo_automatico:boolean;
}
export interface GymProps extends Modify<GymParams, {
}> {}

export class Gym {
  private _props: Partial<GymProps> = {};
  constructor(params?: GymParams) {
    if (params) { Object.assign(this._props, params); }
    if (!params) { this.initEmpty(); }
  }

  get id() { return this._props.id; }
  get nombre() { return this._props.nombre; }
  get logo() { return this._props.logo; }
  get pagina() { return this._props.pagina; }
  get descripcion() { return this._props.descripcion; }
  get status() { return this._props.status; }
  get allowed_athletes_num() { return this._props.allowed_athletes_num; }
  get allowed_branches_num() { return this._props.allowed_branches_num; }
  get current_branches_num() { return this._props.current_branches_num; }
  get current_athletes_num() { return this._props.current_athletes_num; }
  get paquete() { return this._props.paquete; }
  get sucursales() {return this._props.sucursales; }
  get subscription_openpay() { return this._props.subscription_openpay; }
  get subscription_paypal() { return this._props.subscription_paypal; }
  get pais() { return this._props.pais; }
  get settings_gimnasio() { return this._props.settings_gimnasio; }
  get settings_pagina_gimnasio() { return this._props.settings_pagina_gimnasio; }
  get cargo_automatico() { return this._props.cargo_automatico; }

  initEmpty() {
    this._props.id = null;
    this._props.nombre = '';
    this._props.logo = '';
    this._props.pagina = '';
    this._props.descripcion = '';
    this._props.status = -1;
    this._props.allowed_athletes_num = 0;
    this._props.allowed_branches_num = 0;
    this._props.current_branches_num = 0;
    this._props.current_athletes_num = 0;
    this._props.paquete = '';
    this._props.subscription_openpay = null;
    this._props.subscription_paypal = null;
    this._props.pais = null;
    this._props.sucursales = [];
    this._props.settings_gimnasio = [];
    this._props.settings_pagina_gimnasio = [];
    this._props.cargo_automatico = false;
  }
}
