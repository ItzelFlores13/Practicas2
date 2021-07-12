import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from '../models/Article';
import { ToastController } from '@ionic/angular';

export interface ArticleParams {
  page: number; 
  query: string; 
  id_sucursal: number;
  categoria: number;
}
export interface ArticleFilter {
  campo: string|'nombre'|'apellido_paterno'|'email'; 
  orden: ''|'asc'|'desc'; 
}
@Injectable({
  providedIn: 'root'
})

/**
  * ArticleProvider proveedor de servicios para articulos
  * crea, edita, elimina, consulta información de articulos
  * 
  */
export class ArticleProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
    private toast:ToastController,
  ) {
  }

  /**
    * @author Sergio Castro
    * @description Obtiene los articulos de una sucursal
    * @date 5 noviembre 2020
    * @param params [page, categoria, id_sucursal, query (opcional)]
    * @return lista de articulos
    * @exceptions lista de errores en petición de api
   */
  public async getArticles(params: Partial<ArticleParams>) {
    
    this.spinner.show();
    let base = ROUTES.articulos.index; 
    if (params.page) base += `?page=${params.page}`; 
    if (!params.page) base += `?page=${1}`; 
    if (params.categoria) base += `&id_categoria=${params.categoria}`; 
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.query && params.query.length > 0) base += `&q=${params.query}`; 

    let articles = (await this.api.get(base)); 
    if(articles.data){
      this.spinner.hide();
      let articlesList = [];
      articles.data.forEach(element => {
          articlesList.push(new Article(element));
      });
      articles.data = articlesList;
      this.spinner.hide();
     
    } 
    else{
      this.spinner.hide();
      const toast = await this.toast.create({
        message: articles.errors,
        duration: 3000
      });
      toast.present();
    }
    return articles;  
  }  

  /**
    * @author Sergio Castro
    * @description Crear un registro de articulo
    * @date 5 noviembre 2020
    * @param article información del articulo
    * @param images lista de urls de imagenes extras del articulo
    * @return articulo creado
    * @exceptions lista de errores en petición de api
   */
  public async  createArticle(article: Article,images:any){
      
      this.spinner.show();
      let base = ROUTES.articulos.store;
      var precio: number = parseFloat((article.precio).replace(',',''));
      let data = new FormData();
      data.append('id_sucursal',article.id_sucursal.toString());
      data.append('nombre',article.nombre);
      data.append('foto',article.foto);
      data.append('cantidad',article.cantidad.toString());
      data.append('stock_minimo',article.stock_minimo);
      data.append('precio',precio.toString());
      data.append('descripcion',article.descripcion);
      if(article.id_categoria == -1)
        data.append('id_categoria','');
      else
        data.append('id_categoria',(article.id_categoria).toString());
      data.append('hide',(article.hide ? 1 : 0).toString());
      data.append('accumulates_points',(article.accumulates_points ? 1 : 0).toString());
      data.append('points',article.points.toString());
      data.append('tips',article.tips);
      data.append('store_link',article.store_link);
      data.append('tipo_variantes',JSON.stringify(article.tipo_variantes))
      data.append('variantes',JSON.stringify(article.variantes))
      data.append('urls[]',images.urls)
      data.append('id_tipo_aplicacion_descuento_producto',article.id_tipo_aplicacion_descuento_producto)
      data.append('descuento_producto',article.descuento_producto)
      data.append('descuento_mayoreo',article.descuento_mayoreo)
      data.append('id_tipo_aplicacion_descuento_mayoreo',article.id_tipo_aplicacion_descuento_mayoreo)
      data.append('cantidad_mayoreo',article.cantidad_mayoreo)
  
      return  await this.api.postFile(base,data).then( (response) => {
        this.spinner.hide();
        return response;
      }).catch(err => { 
        this.spinner.hide();
        return err 
      });
      
  }

  /**
    * @author Sergio Castro
    * @description actualiza la información de un artículo existente
    * @date 5 noviembre 2020
    * @param article información del artículo
    * @param images lista de urls de imagenes para agregar o eliminar
    * @return articulo atualizado
    * @exceptions lista de errores en petición de api
   */
  public async updateArticle(article: Article, images: any){
    this.spinner.show();
    let base = ROUTES.articulos.update;
    var precio: number = parseFloat((article.precio).replace(',',''));
    let data = new FormData();
    data.append('id',article.id.toString());
    data.append('id_sucursal',article.id_sucursal.toString());
    data.append('nombre',article.nombre);
    data.append('foto',article.foto);
    data.append('cantidad',article.cantidad.toString());
    data.append('stock_minimo',article.stock_minimo);
    data.append('precio',precio.toString());
    data.append('descripcion',article.descripcion);
    if(article.id_categoria == -1)
        data.append('id_categoria','');
      else
        data.append('id_categoria',(article.id_categoria).toString());
    data.append('hide',article.hide == true ? '1':'0');
    data.append('accumulates_points',(article.accumulates_points ? 1 : 0).toString());
    data.append('points',article.points.toString());
    data.append('tips',article.tips);
    data.append('store_link',article.store_link);
    data.append('tipo_variantes',JSON.stringify(article.tipo_variantes))
    data.append('variantes',JSON.stringify(article.variantes))
    data.append('urls[]',images.urls)
    data.append('urls_to_remove[]',images.urlRemove)
    data.append('id_tipo_aplicacion_descuento_producto',article.id_tipo_aplicacion_descuento_producto)
    data.append('descuento_producto',article.descuento_producto)
    data.append('descuento_mayoreo',article.descuento_mayoreo)
    data.append('id_tipo_aplicacion_descuento_mayoreo',article.id_tipo_aplicacion_descuento_mayoreo)
    data.append('cantidad_mayoreo',article.cantidad_mayoreo)

    return  await this.api.postFile(base,data).then( (response) => {
      this.spinner.hide();
      return response;
    }).catch(err => { 
      this.spinner.hide();
      return err 
    });
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la información de un articulo en especifico
    * @date 5 noviembre 2020
    * @param id identificador del artículo
    * @return articulo encontrado
    * @exceptions lista de errores en petición de api
   */
  public async getArticle(id: number){
    this.spinner.show();
    let base = ROUTES.articulos.show(id);
    let article = (await this.api.get(base));
    this.spinner.hide();
    if(article.data){
      return new Article(article.data);
    }
    else{
      return article;
    }
  }
  /**
    * @author Sergio Castro
    * @description Elimina un articulo existente
    * @date 5 noviembre 2020
    * @param id identificador del articulo
    * @return articulo eliminado
    * @exceptions lista de errores en petición de api
   */
  public async deleteArticle(id:number){
    this.spinner.show();
    let base = ROUTES.articulos.destroy(id);
    let articleDelete = (await this.api.delete(base));
    this.spinner.hide();
    if(articleDelete.data){
      return new Article(articleDelete.data);
    }
    else{
      return articleDelete;
    }
  }
}