import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';

export interface ScheduleParams {
  id_sucursal: number;
  fecha:string
}

@Injectable({
  providedIn: 'root'
})

/**
  * Schedule provider
  * CRUD de horarios
  * obtención de horarios con diversos parametros
  */
export class ScheduleProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de horarios
    * @date 28 diciembre 2020
    * @param params filtros para obtener horarios como (id_sucursal, fecha)
    * @return arreglo con lista de horarios
    * @exceptions lista de errores en petición de api
   */
  public async getSchedules(params: Partial<ScheduleParams>) {
    
    this.spinner.show();
    let base = ROUTES.horario.index; 


    if (params.id_sucursal) base += `?id_sucursal=${params.id_sucursal}`; 
    if (params.fecha) base += `&fecha=${params.fecha}`; 

    let sche = (await this.api.get(base));

    this.spinner.hide();

    if(sche.data){
      let data = [];
      sche.data.forEach(element => {
        data.push(new Lesson(element));
      });
      sche.data = data;
    }
    return sche;
  }
  /**
    * @author Sergio Castro
    * @description Obtiene la lista de horarios por mes
    * @date 16 diciembre 2021
    * @param params filtros para obtener horarios como (id_sucursal, fecha)
    * @return arreglo con lista de horarios
    * @exceptions lista de errores en petición de api
   */
  public async getSchedulesMonth(params: Partial<ScheduleParams>) {
    
    this.spinner.show();
    let base = ROUTES.horario.indexByMonth; 


    if (params.id_sucursal) base += `?id_sucursal=${params.id_sucursal}`; 
    if (params.fecha) base += `&fecha=${params.fecha}`; 

    let sche = (await this.api.get(base));

    this.spinner.hide();

    return sche;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene un horario
    * @date 28 diciembre 2020
    * @param id identificador del horario
    * @return horario
    * @exceptions lista de errores en petición de api
   */
  public async getSchedule(id) {
    
    this.spinner.show();
    let base = ROUTES.horario.show(id); 

    let sesionResul = (await this.api.get(base));

    this.spinner.hide();

    if(sesionResul.data){
      let data = new Sesion(sesionResul.data);
     
      sesionResul.data = data;
    }
    return sesionResul;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de dias
    * @date 28 diciembre 2020
    * @param 
    * @return arreglo con lista de dias
    * @exceptions lista de errores en petición de api
   */
  public async getDays(){
    this.spinner.show();
    let base = ROUTES.horario.dias;

    let dias = (await this.api.get(base));

    this.spinner.hide();

    return dias;
  }

  /**
    * @author Sergio Castro
    * @description Crea un registro de horario
    * @date 28 diciembre 2020
    * @param sch objeto horario o sesión
    * @return horario o sesión creada
    * @exceptions lista de errores en petición de api
   */
  public async createSchedule(sch: Sesion){
    this.spinner.show();
    let base = ROUTES.horario.create;

    let data;
    if(sch.id_rutina == null)
      data = {id_profesor:sch.id_profesor, id_clase: sch.id_clase,fecha_inicio:sch.fecha_inicio, fecha_fin: sch.fecha_fin,notas_especiales: sch.notas_especiales,cupo:sch.cupo, id_sucursal: sch.id_sucursal, zoom_link: sch.zoom_link}
    else
      data = {id_profesor:sch.id_profesor, id_clase: sch.id_clase,fecha_inicio:sch.fecha_inicio, fecha_fin: sch.fecha_fin,notas_especiales: sch.notas_especiales,cupo:sch.cupo, id_sucursal: sch.id_sucursal,id_wod:sch.id_rutina, zoom_link: sch.zoom_link}
    
    let sched = (await this.api.post(base,data));
    this.spinner.hide();
    return sched;
  }

  /**
    * @author Sergio Castro
    * @description Actualiza un registro de horario o sesión
    * @date 28 diciembre 2020
    * @param sch objeto sesión 
    * @return sesion actualizada
    * @exceptions lista de errores en petición de api
   */
  public async updateSchedule(sch: Sesion){
    this.spinner.show();
    let base = ROUTES.horario.update;
    let data;
    if(sch.id_rutina == null)
      data = {id: sch.id,id_profesor:sch.id_profesor, id_clase: sch.id_clase,fecha_inicio:sch.fecha_inicio, fecha_fin: sch.fecha_fin,notas_especiales: sch.notas_especiales,cupo:sch.cupo, id_sucursal: sch.id_sucursal, recurrente: sch.updateRepetitivo == true ? 1:0, zoom_link: sch.zoom_link}
    else
      data = {id: sch.id,id_profesor:sch.id_profesor, id_clase: sch.id_clase,fecha_inicio:sch.fecha_inicio, fecha_fin: sch.fecha_fin,notas_especiales: sch.notas_especiales,cupo:sch.cupo, id_sucursal: sch.id_sucursal, recurrente: sch.updateRepetitivo == true ? 1:0,id_wod:sch.id_rutina, zoom_link: sch.zoom_link}
    
    let sched = (await this.api.post(base,data));

    this.spinner.hide();
    return sched;
  }

  /**
    * @author Sergio Castro
    * @description Elimina una sesion
    * @date 28 diciembre 2020
    * @param id identificador de la sesión
    * @return sesión eliminada
    * @exceptions lista de errores en petición de api
   */
  public async deleteSchedule(id: number){
    this.spinner.show();
    let base = ROUTES.horario.delete(id);

    let sched = (await this.api.delete(base));
    this.spinner.hide();
    return sched;
  }

}