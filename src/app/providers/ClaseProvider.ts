import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { Clase } from '../models/Clase';

 export interface ClaseParams {
  page: number; 
  query: string; 
  id_sucursal: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClaseProvider{  
  constructor(
    private api: ApiService,
  ) {
    
  }
  public async getClases(params: Partial<ClaseParams>){
      let base = ROUTES.clases.index_sin_paginar;
      if(params.id_sucursal) base += `?id_sucursal=${params.id_sucursal}`;
      if(params.page) base += `&page=${params.page}`;
      if(params.query && params.query.length > 0) base += `&q=${params.query}`;
      let clases = (await this.api.get(base)).data;
      return clases.map((mp) => {
        return new Clase(mp);
      });
  }
}