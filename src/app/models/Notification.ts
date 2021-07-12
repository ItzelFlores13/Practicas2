import {Gym, GymParams} from '../models/Gym';
import {GymBranch, GymBranchParams} from '../models/GymBranch';

export interface NotificationParams {
  id: number;
  notification: string;
  gimnasio?: GymParams;
  sucursal?: GymBranchParams;
  programada_para: any;
  seccion: string;
  recurrente: number;
  dias_semana: object;
  dias_mes: object;
  recurrencia_activa: number;
  tipo_recurrencia?: any;
  created_at: Date;
}

export class Notification {

  private props: NotificationParams;

  constructor(params?: NotificationParams) {
    if (params) {
      this.initParams(params);
    }
    if (!params) {
      this.initEmpty();
    }
  }

  get id() { return this.props.id; }
  set id(value) { this.props.id = value; }

  get notification() { return this.props.notification; }
  set notification(value) { this.props.notification = value; }

  get gimnasio() { return this.props.gimnasio; }
  set gimnasio(value) { this.props.gimnasio = value; }

  get sucursal() { return this.props.sucursal; }
  set sucursal(value) { this.props.sucursal = value; }

  get programada_para() { return this.props.programada_para; }
  set programada_para(value) { this.props.programada_para = value; }

  get seccion() { return this.props.seccion; }
  set seccion(value) { this.props.seccion = value; }

  get recurrente() { return this.props.recurrente; }
  set recurrente(value) { this.props.recurrente = value; }

  get dias_semana() { return this.props.dias_semana; }
  set dias_semana(value) { this.props.dias_semana = value; }

  get dias_mes() { return this.props.dias_mes; }
  set dias_mes(value) { this.props.dias_mes = value; }

  get recurrencia_activa() { return this.props.recurrencia_activa; }
  set recurrencia_activa(value) { this.props.recurrencia_activa = value; }

  get tipo_recurrencia() { return this.props.tipo_recurrencia; }
  set tipo_recurrencia(value) { this.props.tipo_recurrencia = value; }

  get created_at() { return this.props.created_at; }
  set created_at(value) { this.props.created_at = value; }

  private initParams(params: NotificationParams) {
    this.props = {
      ...params
    };
  }

  private initEmpty() {
    this.props = {
      id : null,
      notification : '',
      gimnasio: new Gym(),
      sucursal: new GymBranch(null),
      programada_para : '',
      seccion : '',
      recurrente : null,
      dias_semana : {},
      dias_mes : {},
      recurrencia_activa : null,
      tipo_recurrencia : null,
      created_at: null,
    };
  }

}
