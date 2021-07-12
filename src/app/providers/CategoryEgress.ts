import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { Egress } from '../models/Egress';
import { CategoryEgress } from '../models/CategoryEgress';

export interface CategoryEgressParams {
  id_sucursal: number;
  fecha:string;
  page:number;
  nombre:string;
  id_tipo_CategoryEgress:number;
  fecha_inicio:string;
  fecha_fin:string;
  id_gimnasio:number;
  id:number;
}

@Injectable({
  providedIn: 'root'
})

/**
  * CategoryEgress provider
  * Obtiene la información de las categorías de egreso
  */
export class CategoryEgressProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de categorías 
    * @date 2 Febrero 2021
    * @param params parametros de filtración para obtener los usuarios (id_gimnasio, id_sucursal)
    * @return lista de categorías
    * @exceptions lista de errores en petición de api
   */
  public async getCategoryEgress(params: Partial< CategoryEgressParams>){

    this.spinner.show();
    let base = ROUTES.categoriaEgreso.indexSinPaginar(params.id_gimnasio,params.id_sucursal);
    
    let categories = (await this.api.get(base));
    
    this.spinner.hide();

    if(categories.data){
        let data = [];
        categories.data.forEach(element => {
            data.push(new CategoryEgress(element))
        });
    }

    return categories;
  }

  /**
    * @author Sergio Castro
    * @description Crea un registro de categoría
    * @date 2 Febrero 2021
    * @param category obj categoria de egreso
    * @return lista de categorías creadas
    * @exceptions lista de errores en petición de api
   */
  public async createCategoryEgress(category: CategoryEgress){

    this.spinner.show();
    let base = ROUTES.categoriaEgreso.store;
    let data = {nombre: category.nombre, sucursales: JSON.stringify(category.sucursales),id_gimnasio:category.id_gimnasio}
    let categories = (await this.api.post(base,data));
    
    this.spinner.hide();

    return categories;
  }


}