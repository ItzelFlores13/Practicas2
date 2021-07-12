import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { Routine } from '../models/Routine';
import { Round } from '../models/Round';

export interface WodParams {
  id_sucursal: number;
  fecha:string;
  page:number;
  nombre:string;
  id_tipo_wod:number;
  fecha_inicio:string;
  fecha_fin:string;
  id_gimnasio:number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * Wod provider
  * Obtiene los entrenamientos
  */
export class WodProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de entrenamientos
    * @date 28 diciembre 2020
    * @param params parametros de filtracion como (page, id_sucursal, id_tipo_wod, nombre, fecha_inicio, fecha_fin)
    * @return arreglo con lista de entrenamientos
    * @exceptions lista de errores en petición de api
   */
  public async getWods(params: Partial< WodParams>){

    this.spinner.show();
    let base = ROUTES.entrenamientos.index(params.id_gimnasio);
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.id_tipo_wod) base += `&id_tipo_wod=${params.id_tipo_wod}`; 
    if (params.nombre) base += `&nombre=${params.nombre}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 

    
    let Wod = (await this.api.get(base));


    if(Wod.data){
      let data = [];
      Wod.data.forEach(element => {
        
        data.push(new Routine(element));
      });
      Wod.data = data;
    }

    this.spinner.hide();

    return Wod;
  }
  public async getWod(id:number,id_gimnasio:number){

    this.spinner.show();
    let base = ROUTES.entrenamientos.show(id_gimnasio,id);
  

    
    let Wod = (await this.api.get(base));


    if(Wod.data){
      Wod.data = new Routine(Wod.data);
    }

    this.spinner.hide();

    return Wod;
  }
  public async getUsersWod(id:number,id_gimnasio:number){

    this.spinner.show();
    let base = ROUTES.entrenamientos.usersWods(id_gimnasio,id);
  
    let users = (await this.api.get(base));


    if(users.data){
      let us = [];
      users.data.forEach(element => {
        us.push(new User(element))
      });
      users.data = us;
    }

    this.spinner.hide();

    return users;
  }
  public async getWodsRondas(params: Partial< WodParams>){

    this.spinner.show();
    let base = ROUTES.entrenamientos.selectWodRondas(params.id_gimnasio);
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.id_tipo_wod) base += `&id_tipo_wod=${params.id_tipo_wod}`; 
    if (params.nombre) base += `&nombre=${params.nombre}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 

    
    let Wod = (await this.api.get(base));

    if(Wod.data){
      let data = [];
      Wod.data.forEach(element => {
        
        data.push(new Routine(element));
      });
      Wod.data = data;
    }

    this.spinner.hide();

    return Wod;
  }
  public async getWodsByMonth(params: Partial< WodParams>){

    this.spinner.show();
    let base = ROUTES.entrenamientos.selectWodByMonth(params.id_gimnasio);
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.id_tipo_wod) base += `&id_tipo_wod=${params.id_tipo_wod}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 

    
    let Wod = (await this.api.get(base));

    if(Wod.data){
      let data = [];
      Wod.data.forEach(element => {
        let dataOb = [];
        element.forEach(elementObject => {
          dataOb.push(new Routine(elementObject));
        });
        data.push(dataOb);
      });
      Wod.data = data;
    }
    

    this.spinner.hide();

    return Wod;
  }
  public async getTipWods(){

    this.spinner.show();
    let base = ROUTES.rondas.index;
    
    let tWod = (await this.api.get(base));

    this.spinner.hide();

    return tWod;
  }
  public async getUnidades(){

    this.spinner.show();
    let base = ROUTES.rondas.unidad;
    
    let unidades = (await this.api.get(base));

    this.spinner.hide();

    return unidades;
  }
  public async deteleWod(id_gimnasio:number,id_wod:number){

    this.spinner.show();
    let base = ROUTES.entrenamientos.destroy(id_gimnasio,id_wod);
    
    let tWod = (await this.api.delete(base));

    this.spinner.hide();

    return tWod;
  }
  public async createWod(wod: Routine,id_gimnasio: number){

    this.spinner.show();
    let base = ROUTES.entrenamientos.store(id_gimnasio);
    let usuarios = [];
    wod.atletas.forEach(element => {
      usuarios.push(element.id)
    });
    let rondas = [];
    wod.rondas.forEach(element => {
      let dataExercise = [];
      element.ejercicios.forEach(elementE => {
        let excer = {
          id: elementE.ejercicio.id,
          repeticiones: elementE.repeticiones,
          intensidad: elementE.intensidad,
          sets: elementE.sets,
          tiempo_limite: elementE.tiempo_limite,
          tiempo_trabajo: elementE.tiempo_trabajo,
          tiempo_descanso: elementE.tiempo_descanso,
          id_unidad: elementE.id_unidad
        }
        dataExercise.push(excer);
      });
       let rond = {
         descanso: element.descanso,
         ejercicios: dataExercise,
         nombre: element.nombre,
         id_tipo_ronda : element.id_tipo_ronda,
         id_tipo_wod: 3,
         sets: element.sets,
         tipo_de_resultado: element.tipo_de_resultado,
         content: element.content,
         tiempo_limite: element.tiempo_limite,
         notas: element.notas,
         id_order: element.id_order 
       }
       rondas.push(rond)
    });
    let data = {
      id_tipo_wod: wod.id_tipo_wod,
      id_usuario: wod.id_usuario,
      nombre: wod.nombre,
      descripcion: wod.descripcion,
      content:wod.content,
      fecha_de_publicacion: wod.fecha_de_publicacion,
      publicar_ahora:0,
      rondas: JSON.stringify(rondas),
      fecha_de_realizacion: wod.fecha_de_realizacion,
      wod_especificos: (wod.wod_especificos == true ? 1:0),
      atletas: JSON.stringify(usuarios),
      crear_grupo: (wod.crear_grupo == true ? 1:0 ),
      nombre_grupo:wod.nombre_grupo,
      enviar_notificacion: (wod.enviar_notificacion == true ? 1:0),
      tz: wod.tz
    }
    let wods = (await this.api.post(base,data));

    this.spinner.hide();

    return wods;
  }
  
  public async updateWod(wod: Routine,id_gimnasio: number){

    this.spinner.show();
    var myRe = new RegExp(/[A-Za-z]/)
    let base = ROUTES.entrenamientos.update(id_gimnasio);
    let usuarios = [];
    if(wod.atletas == undefined)
      wod.atletas = [];
    wod.atletas.forEach(element => {
      usuarios.push(element.id)
    });
    let rondas = [];
    wod.rondas.forEach(element => {
      let dataExercise = [];
      element.ejercicios.forEach(elementE => {
        let excer = {
          id_ejercicio: elementE.id_ejercicio,
          id: elementE.ejercicio.id,
          repeticiones: elementE.repeticiones,
          intensidad: elementE.intensidad,
          sets: elementE.sets,
          tiempo_limite: elementE.tiempo_limite,
          tiempo_trabajo: elementE.tiempo_trabajo,
          tiempo_descanso: elementE.tiempo_descanso,
          id_unidad: elementE.id_unidad
        }
        dataExercise.push(excer);
      });
      
        let rond = {
          id: ( myRe.test(element.id.toString()) == true ? 0:element.id),
          descanso: null,
          ejercicios: dataExercise,
          nombre: element.nombre,
          id_tipo_ronda : element.id_tipo_ronda,
          id_tipo_wod: 3,
          sets: element.sets,
          tipo_de_resultado: element.tipo_de_resultado,
          content: element.content,
          tiempo_limite: element.tiempo_limite,
          notas: element.notas,
          id_order: element.id_order
      }
       
       rondas.push(rond)
    });
    let data = {
      id: wod.id,
      id_tipo_wod: wod.id_tipo_wod,
      id_usuario: wod.id_usuario,
      nombre: wod.nombre,
      descripcion: wod.descripcion,
      content:wod.content,
      fecha_de_publicacion: wod.fecha_de_publicacion,
      publicar_ahora:0,
      rondas: JSON.stringify(rondas),
      fecha_de_realizacion: wod.fecha_de_realizacion,
      wod_especificos: (wod.wod_especificos == true ? 1:0),
      atletas: JSON.stringify(usuarios),
      crear_grupo: (wod.crear_grupo == true ? 1:0 ),
      nombre_grupo:wod.nombre_grupo,
      rondas_eliminar: JSON.stringify( wod.rondas_eliminar),
      enviar_notificacion: (wod.enviar_notificacion == true ? 1:0),
      tz: wod.tz
    }
    let wods = (await this.api.post(base,data));

    this.spinner.hide();

    return wods;
  }

}