import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Attendance } from '../models/Attendance';
import { da } from 'date-fns/locale';

export interface AttendanceParams {
  page: number; 
  id_sesion: number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * Attendance provider
  * Realiza los Crud de asistencias y obtencióne de las mismas con distintos parametros
  *
  */
export class AttendanceProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description OBtiene la asistencias
    * @date 28 diciembre 2020
    * @param params parametros de filtración para obtener las asistencias (page, id_sucursal)
    * @return arreglo de lista de asistencia
    * @exceptions lista de errores en petición de api
   */
  public async getAttendance(params: Partial<AttendanceParams>) {
    
    this.spinner.show();
    let base = ROUTES.asistencias.show; 

    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sesion) base += `&id_sesion=${params.id_sesion}`; 

    let attendances = (await this.api.get(base)); 
    if(attendances.data){
      this.spinner.hide();
      let users = []; 
       attendances.data.forEach(element => {
           users.push(new Attendance(element));
       });
       attendances.data = users;
       return attendances;
    } 
    else
      this.spinner.hide();
  }

  /**
    * @author Sergio Castro
    * @description Actualiza un registro de asistencia
    * @date 28 diciembre 2020
    * @param att modelo attendance o asistencia
    * @return asistencia actualizada
    * @exceptions lista de errores en petición de api
   */
  public async updateAttendance(att: Attendance) {
    
    this.spinner.show();
    let base = ROUTES.asistencias.update; 


    let data = {asistio:att.asistio == true ? 1:0,notas:'',id:att.id}
    let attendances = (await this.api.post(base,data)); 
    if(attendances.data){
      this.spinner.hide();
       attendances.data = new Attendance(attendances.data );
       return attendances;
    } 
    else
      this.spinner.hide();
  }

  /**
    * @author Sergio Castro
    * @description Crea un registro de asistencia
    * @date 28 diciembre 2020
    * @param att modelo attendance o asistencia
    * @return asistencia creada
    * @exceptions lista de errores en petición de api
   */
  public async createAttendance(att: Attendance) {
    
    this.spinner.show();
    let base = ROUTES.asistencias.store; 


    let data = {asistio:att.asistio == true ? 1:0,notas:'',id_usuario:att.id_usuario, id_sesion: att.id_sesion}
    let attendances = (await this.api.post(base,data)); 
    this.spinner.hide();
    if(attendances.data){
     
       attendances.data = new Attendance(attendances.data );
       
    } 
    return attendances;

  }

  /**
    * @author Sergio Castro
    * @description Elimina un registro de asistencia
    * @date 28 diciembre 2020
    * @param att modelo attendance o asistencia
    * @return asistencia eliminada
    * @exceptions lista de errores en petición de api
   */
  public async deleteAttendance(att: Attendance) {
    
    this.spinner.show();
    let base = ROUTES.asistencias.delete(att.id); 


    let attendances = (await this.api.delete(base)); 
    if(attendances.data){
      this.spinner.hide();
       attendances.data = new Attendance(attendances.data );
       return attendances;
    } 
    else
      this.spinner.hide();
  }
  

}