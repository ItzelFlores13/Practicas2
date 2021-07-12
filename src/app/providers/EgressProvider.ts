import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { Egress } from '../models/Egress';

export interface EgressParams {
  id_sucursal: number;
  fecha: string;
  page: number;
  nombre: string;
  id_tipo_Egress: number;
  fecha_inicio: string;
  fecha_fin: string;
  id_gimnasio: number;
  id: number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * Egress provider
  * Obtiene la información de los egresos
  */
export class EgressProvider {
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de egresos
    * @date 28 diciembre 2020
    * @param params parametros de filtracion como (page, id_sucursal, nombre, fecha_inicio, fecha_fin)
    * @return arreglo con lista de egresos
    * @exceptions lista de errores en petición de api
   */
  public async getEgress(params: Partial<EgressParams>) {

    this.spinner.show();
    let base = ROUTES.egreso.index(params.id_gimnasio);
    if (params.page) base += `?page=${params.page}`;
    if (!params.page) base += `?page=${1}`;
    if (params.id_sucursal && params.id_sucursal != -1) base += `&id_sucursal=${params.id_sucursal}`;
    if (params.fecha_inicio) base += `&from_date=${params.fecha_inicio}`;
    if (params.fecha_fin) base += `&to_date=${params.fecha_fin}`;

    let egress = (await this.api.get(base));
    if (egress.data) {
      let data = [];
      egress.data.forEach(element => {
        data.push(new Egress(element));
      });
      egress.data = data;
    }

    this.spinner.hide();

    return egress;
  }

  /**
    * @author Sergio Castro
    * @description Crear registro de egreso
    * @date 2 Febrero 2021
    * @param egressData obj egreso
    * @param id_gimnasio identificador de gimnasio
    * @return egreso creado
    * @exceptions lista de errores en petición de api
   */
  public async createEgress(egressData: Egress, id_gimnasio: number) {

    this.spinner.show();
    let base = ROUTES.egreso.store(id_gimnasio);
    let data;
    if( egressData.id_categoria==-1){
       data = { id_sucursal: egressData.id_sucursal, cantidad: egressData.cantidad, descripcion: egressData.descripcion, fecha: egressData.fecha }
    }else{      
       data = { id_sucursal: egressData.id_sucursal, cantidad: egressData.cantidad, descripcion: egressData.descripcion, fecha: egressData.fecha, id_categoria: egressData.id_categoria }
    }
    let egress = (await this.api.post(base, data));

    this.spinner.hide();

    return egress;
  }

  /**
    * @author Sergio Castro
    * @description Actualiza registro de egreso
    * @date 2 Febrero 2021
    * @param egressData obj egreso
    * @param id_gimnasio identificador de gimnasio
    * @return egreso actualizado
    * @exceptions lista de errores en petición de api
   */
  public async updateEgress(egressData: Egress, id_gimnasio: number) {

    this.spinner.show();
    let base = ROUTES.egreso.update(id_gimnasio, egressData.id);

    let data = { id_sucursal: egressData.id_sucursal, cantidad: egressData.cantidad, descripcion: egressData.descripcion, fecha: egressData.fecha, id_categoria: egressData.id_categoria }
    let egress = (await this.api.post(base, data));

    this.spinner.hide();

    return egress;
  }

  /**
    * @author Sergio Castro
    * @description obtiene la información de un registro de egreso
    * @date 2 Febrero 2021
    * @param id_egress identificador de egreso
    * @param id_gimnasio identificador de gimnasio
    * @return egreso encontrado
    * @exceptions lista de errores en petición de api
   */
  public async getEgressFind(id_egress: number, id_gimnasio: number) {

    this.spinner.show();
    let base = ROUTES.egreso.show(id_gimnasio, id_egress);

    let egress = (await this.api.get(base));

    this.spinner.hide();
    if (egress) {
      egress = new Egress(egress)
    }

    return egress;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene los egresos por mes
    * @date 2 Febrero 2021
    * @param params filtros de busqueda como id_sucursal, fecha_inicio, fecha_fin
    * @return  lista de egresos
    * @exceptions lista de errores en petición de api
   */
  public async getEgressByMonth(params: Partial<EgressParams>) {

    this.spinner.show();
    let base = ROUTES.egreso.egressByMonth(params.id_gimnasio);
    if (params.id_sucursal) base += `?id_sucursal=${params.id_sucursal}`;
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`;
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`;
    base += '&periodo=1';

    let egress = (await this.api.get(base));
    if (egress.data) {
      let data = [];
      egress.data.periodoActual.forEach(element => {
        data.push(new Egress(element));
      });
      egress.data = data;
    }

    this.spinner.hide();

    return egress;
  }

  /**
    * @author Sergio Castro
    * @description Elimina un registro de egresos
    * @date 2 Febrero 2021
    * @param params id_gimnasio id = identificador del egreso
    * @return egreso eliminado
    * @exceptions lista de errores en petición de api
   */
  public async deleteEgress(params: Partial<EgressParams>) {

    this.spinner.show();
    let base = ROUTES.egreso.detele(params.id_gimnasio, params.id);

    let egress = (await this.api.delete(base));

    this.spinner.hide();

    return egress;
  }

}