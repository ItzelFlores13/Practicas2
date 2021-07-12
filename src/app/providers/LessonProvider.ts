import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';

export interface LessonParams {
  page: number; 
  query: string; 
  id_sucursal: number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * Lesson provider
  * Realiza el crud de las clases
  * Obtiene clases definidas por parametros como sin paginar
  */
export class LessonProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de clases
    * @date 28 diciembre 2020
    * @param params filtros para obtener clases como (page, id_sucursal y query)
    * @return arreglo con lista de clases
    * @exceptions lista de errores en petición de api
   */
  public async getLessons(params: Partial<LessonParams>) {
    
    this.spinner.show();
    let base = ROUTES.clases.index; 

    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.query && params.query.length > 0) base += `&q=${params.query}`; 

    let clases = (await this.api.get(base)); 
    if(clases.data){
      this.spinner.hide();
      let clasList = []; 
       clases.data.forEach(element => {
         clasList.push(new Lesson(element))
       });
       clases.data = clasList;
       return clases;
    } 
    else
      this.spinner.hide();
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de clases sin paginar
    * @date 28 diciembre 2020
    * @param params filtros para obtener clases como (page, id_sucursal y query)
    * @return arreglo con lista de clases
    * @exceptions lista de errores en petición de api
   */
  public async getLessonsSinPaginar(params: Partial<LessonParams>) {
    
    this.spinner.show();
    let base = ROUTES.clases.indexSinPaginar; 

    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.query && params.query.length > 0) base += `&q=${params.query}`; 

    let clases = (await this.api.get(base)); 
    if(clases.data){
      this.spinner.hide();
      let clasList = []; 
       clases.data.forEach(element => {
         clasList.push(new Lesson(element))
       });
       clases.data = clasList;
    } 
    this.spinner.hide();
    return clases
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la información de una clase
    * @date 28 diciembre 2020
    * @param id identificador de la clase
    * @return objeto clase
    * @exceptions lista de errores en petición de api
   */
  public async getLesson(id: number) {
    
    this.spinner.show();
    let base = ROUTES.clases.show(id); 

    let clase = (await this.api.get(base)); 
    this.spinner.hide();
    if(clase.data){
      new Lesson(clase.data);
    } 
    return clase;
  }

  /**
    * @author Sergio Castro
    * @description Crea un registro de clase
    * @date 28 diciembre 2020
    * @param lesson objeto clase
    * @return clase creada
    * @exceptions lista de errores en petición de api
   */
  public async createLesson(lesson: Lesson){
    this.spinner.show();
    let base = ROUTES.clases.store;
    let prof = [];
    lesson.profesores.forEach(element => {
      prof.push(element.id);
    });
    let data = {id_sucursal: lesson.id_sucursal, nombre: lesson.nombre, notas_especiales: lesson.notas_especiales, profesores: JSON.stringify(prof), cupo: lesson.cupo}
    let clase = ( await this.api.post(base,data));

    this.spinner.hide();
    return clase;
  }

  /**
    * @author Sergio Castro
    * @description Actualiza una clase existente
    * @date 28 diciembre 2020
    * @param lesson objeto clase
    * @return clase actualizada
    * @exceptions lista de errores en petición de api
   */
  public async uppdateLesson(lesson: Lesson){
    this.spinner.show();
    let base = ROUTES.clases.update;
    let prof = [];
    lesson.profesores.forEach(element => {
      prof.push(element.id);
    });
    let data = {id: lesson.id, id_sucursal: lesson.id_sucursal, nombre: lesson.nombre, notas_especiales: lesson.notas_especiales, profesores: JSON.stringify(prof), cupo: lesson.cupo}
    let clase = ( await this.api.post(base,data));

    this.spinner.hide();
    return clase;
  }

  /**
    * @author Sergio Castro
    * @description Elimina una clase existente
    * @date 28 diciembre 2020
    * @param id identificador de la clase
    * @return clase eliminada
    * @exceptions lista de errores en petición de api
   */
  public async deleteLesson(id:number){
    this.spinner.show();
    let base = ROUTES.clases.destroy(id);
    let clase = ( await this.api.delete(base));
    this.spinner.hide();
    return clase;
  }
}