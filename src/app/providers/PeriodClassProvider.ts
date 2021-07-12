import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { PeriodClass } from '../models/PeriodClass';

export interface PeriodParams {
  id_sucursal: number;
  fecha:string
}

@Injectable({
  providedIn: 'root'
})

/**
  * PeriodClass provider
  * Crud de periodo clase
  */
export class PeriodClassProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Crea un periodo clase
    * @date 28 diciembre 2020
    * @param pclass objeto periodo clase
    * @return periodo clase creada
    * @exceptions lista de errores en petición de api
   */
  public async createPeriodClass(pclass: PeriodClass){

    this.spinner.show();
    let base = ROUTES.periodoClase.create;

    let data = {id_profesor: pclass.id_profesor, id_clase: pclass.id_clase, hora_inicio: pclass.hora_inicio,hora_fin: pclass.hora_fin, id_dia: pclass.id_dia}
    
    let periodclass = (await this.api.post(base,data));

    this.spinner.hide();

    return periodclass;
  }

  /**
    * @author Sergio Castro
    * @description Actualiza un periodo clase
    * @date 28 diciembre 2020
    * @param pclass objeto periodo clase
    * @return periodo clase actualizada
    * @exceptions lista de errores en petición de api
   */
  public async updatePeriodClass(pclass: PeriodClass){

    this.spinner.show();
    let base = ROUTES.periodoClase.update;

    let data = {id: pclass.id,id_profesor: pclass.id_profesor, id_clase: pclass.id_clase, hora_inicio: pclass.hora_inicio,hora_fin: pclass.hora_fin, id_dia: pclass.id_dia, periodo:pclass.periodo}
    
    let periodclass = (await this.api.post(base,data));

    this.spinner.hide();

    return periodclass;
  }

  /**
    * @author Sergio Castro
    * @description Elimina un registro de periodo clase
    * @date 28 diciembre 2020
    * @param id identificador del periodo clase
    * @return periodo clase eliminado
    * @exceptions lista de errores en petición de api
   */
  public async deletePeriodClass(id: number){

    this.spinner.show();
    let base = ROUTES.periodoClase.delete(id);
    let periodclass = (await this.api.delete(base));

    this.spinner.hide();

    return periodclass;
  }
  public async deleteMass(periods){

    this.spinner.show();
    let periodclass;
    periods.forEach(async p => {
      let base = ROUTES.periodoClase.delete(p.id);
       periodclass = (await this.api.delete(base));    
    });

    this.spinner.hide();

    return periodclass;
  }
}