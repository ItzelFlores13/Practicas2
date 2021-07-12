import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from '../models/Article';
import { ToastController } from '@ionic/angular';
import { CategoryArticle } from '../models/CategoryArticle';

export interface CategoryArticleParams {
  query: string; 
  id_sucursal: number;
}
export interface CategoryArticleFilter {
  campo: string|'nombre'|'apellido_paterno'|'email'; 
  orden: ''|'asc'|'desc'; 
}
@Injectable({
  providedIn: 'root'
})

/**
  * CategoriaArticleProvider proveedor de servicios para las categorias del articulo
  * Muestra información de facturación , permite edición de métodos de pago
  * y procesa el cobro.
  */
export class CategoryArticleProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
    private toast:ToastController,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene las categorias de una sucursal
    * @date 5 noviembre 2020
    * @param params [ id_sucursal, query (opcional)]
    * @return lista de categorias
    * @exceptions lista de errores en petición de api
  */
  public async getCategories(params: Partial<CategoryArticleParams>) {
    
    this.spinner.show();
    let base = ROUTES.categorias.index; 

    base += `?q=${params.query}`
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    
    let categories = (await this.api.get(base)); 
    if(categories.data){
      this.spinner.hide();
      let categoriesList = [];
      categories.data.forEach(element => {
          categoriesList.push(new CategoryArticle(element));
      });
      categories.data = categoriesList;
      this.spinner.hide();
      
    } 
    else{
      this.spinner.hide();
      const toast = await this.toast.create({
        message: categories.errors,
        duration: 3000
      });
      toast.present();
    }
    return categories;  
  }
    
  /**
    * @author Sergio Castro
    * @description Crea una categoria de articulos
    * @date 5 noviembre 2020
    * @param categoryNew [id_sucursal, nombre]
    * @return categoria creada
    * @exceptions lista de errores en petición de api
   */
  public async createCategory(categoryNew: CategoryArticle){

    this.spinner.show();

    let base = ROUTES.categorias.store; 

    let data = {id_sucursal:categoryNew.id_sucursal, nombre:categoryNew.nombre};
    let category = (await this.api.post(base,data)); 
    if(category.data){
      this.spinner.hide();   
      return category;  
    } 
    else{
      this.spinner.hide();
      const toast = await this.toast.create({
        message: category.errors,

        duration: 3000
      });
      toast.present();
      return null;
    }
  }

  /**
    * @author Sergio Castro
    * @description Actualiza un registro de categoría
    * @date 6 noviembre 2020
    * @param categoryUp [id_sucursal, nombre, id]
    * @return categoria actualizada
    * @exceptions lista de errores en petición de api
   */
  public async updateCategory(categoryUp: CategoryArticle){
    this.spinner.show(); 
    let base = ROUTES.categorias.update; 
    let data = {id: categoryUp.id,nombre:categoryUp.nombre,id_sucursal:categoryUp.id_sucursal};

    let category = (await this.api.post(base,data));
    this.spinner.hide();
    if(category.data){
      return category.data;
    }
    else{
      return category;
    }
  }

  /**
    * @author Sergio Castro
    * @description elimina un registro de categoría
    * @date 6 noviembre 2020
    * @param categoryDe [id]
    * @return categoria eliminada
    * @exceptions lista de errores en petición de api
   */
  public async deleteCategory(categoryDe: CategoryArticle){
    this.spinner.show(); 
    let base = ROUTES.categorias.destroy(categoryDe.id);
    let category = (await this.api.delete(base));
    this.spinner.hide();
    if(category.data){
      return category.data;
    }
    else{
      return category;
    }
  }
     
}