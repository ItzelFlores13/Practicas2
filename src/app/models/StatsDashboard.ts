import { Modify } from "../utilities/InterfaceUtilities";

export interface StatsDashboardParams {
    activos: number,
    asistencias: any,
    egresosMes: any,
    ingresosTotales: any,
    ingresosTotalesMes: any,
    ingresosVentas: any,
    vencidos:number,
  }

  export interface StatsDashboardProps extends Modify<StatsDashboardParams, {
  }> {}
export class StatsDashboard {

  constructor(params?: StatsDashboardParams) {
    if (params) { this.initWithParams(params); }
    if (!params) { this.initEmpty(); }
  }

  get activos() { return this._props.activos; }
  get asistencias() { return this._props.asistencias; }
  get egresosMes() { return this._props.egresosMes; }
  get ingresosTotales() { return this._props.ingresosTotales; }
  get ingresosTotalesMes() { return this._props.ingresosTotalesMes; }
  get ingresosVentas() { return this._props.ingresosVentas; }
  get vencidos() { return this._props.vencidos; }

  
  set activos(value) { this._props.activos = value; }
  set asistencias(value) { this._props.asistencias = value; }
  set egresosMes(value) { this._props.egresosMes = value; }
  set ingresosTotales(value) { this._props.ingresosTotales = value; }
  set ingresosTotalesMes(value) { this._props.ingresosTotalesMes = value; }
  set ingresosVentas(value) { this._props.ingresosVentas = value; }
  set vencidos(value) { this._props.vencidos = value; }

  private _props: Partial<StatsDashboardParams> = {}; 

  initWithParams(params: StatsDashboardParams) {
    Object.assign(this._props, params); 
  }

  private initEmpty() {
    this._props.activos = 0;
    this._props.asistencias = [];
    this._props.egresosMes = [];
    this._props.ingresosTotales = [];
    this._props.ingresosTotalesMes = [];
    this._props.ingresosVentas = [];
    this._props.vencidos = 0;

  }

}
