import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PedidosProvider {
  constructor(
    private api: ApiService,
  ) { }

  public async getPendings(params: any): Promise<any> {
    let base = ROUTES.pedidos.pendings;
    base += `?page=${params.page}`;
    base += `&id_sucursal=${params.branch}`;
    if (params.date !== '') {
        base += `&fecha=${params.date}`;
    }
    if (params.search) {
        base += `&q=${params.search}`;
    }
    const result = (await this.api.get(base));
    return result;
  }

  public async getHistorical(params: any): Promise<any> {
    let base = ROUTES.pedidos.historical;
    base += `?page=${params.page}`;
    base += `&id_sucursal=${params.branch}`;
    if (params.startDate !== '') {
        base += `&fecha_inicio=${params.startDate}`;
    }
    if (params.endDate !== '') {
      base += `&fecha_fin=${params.endDate}`;
    }
    if (params.search) {
        base += `&q=${params.search}`;
    }
    const result = (await this.api.get(base));
    return result;
  }

  async getDetails(id: number): Promise<any> {
    let base = ROUTES.shop.getDetail;
    base += `/${id}`;
    const result = await this.api.get(base);
    return result;
  }
}
