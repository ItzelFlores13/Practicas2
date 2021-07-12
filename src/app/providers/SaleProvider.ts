import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Article } from '../models/Article';
import { ToastController } from '@ionic/angular';
import { UserToShop } from '../models/UserToShop';

export interface SaleParams {
  query: string; 
  id_sucursal: number;
}
export interface SaleFilter {
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
export class SaleProvider {  
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
  public async createSale(sale: UserToShop[]) {
    
    this.spinner.show();
    let base = ROUTES.shop.create;
    let data = [];
    sale.forEach(element => {
      let info = { membresias: element.membresias, articulos: element.articulos, usuario: element.id, puntos: element.puntos };
      console.log('info',info)
      data.push( JSON.stringify(info));
    });
    let saleResult = (await this.api.post(base,{usersSale:data,fechaClient: this.formatFecha()}));
    this.spinner.hide();
    if(saleResult.data){
      return saleResult.data;
    }
    else{
      const toast = await this.toast.create({
        message: saleResult.errors,
        duration: 4000
      });
      toast.present();
    }
    return saleResult;
    
  }

  /**
    * @author Sergio Castro
    * @description Construye un formato de fecha actual
    * @date 7 Diciembre 2020
    * @param 
    * @return fecha
    * @exceptions 
  */
  formatFecha(){
    var fecha = new Date();
    return fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
  }
    
  
     
}