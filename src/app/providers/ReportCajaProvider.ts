import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ReportCajaProvider {
  constructor(
    private api: ApiService,
  ) { }

  public async getReport(params: any): Promise<any> {
    let base = ROUTES.reports.caja(params.gymId);
    base += `?page=${params.page}`;
    if (params.branch !== 0 && params.branch !== 9999) {
      base += `&id_sucursal=${params.branch}`;
    }
    if (params.method !== 0 && params.method !== 9999) {
      base += `&id_metodo_pago=${params.method}`;
    }
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    base += `&conceptos=${params.concepts}`;
    if (params.status !== '') {
      base += `&estatus=${params.status}`;
    }
    const result = (await this.api.get(base));
    return result;
  }
}
