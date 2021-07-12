import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ReportEgresosProvider {
  constructor(
    private api: ApiService,
  ) { }

  public async getReport(params: any): Promise<any> {
    let base = ROUTES.reports.egresos(params.gymId);
    base += `?page=${params.page}`;
    if (params.branch !== 0 && params.branch !== 9999) {
      base += `&id_sucursal=${params.branch}`;
    }
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const result = (await this.api.get(base));
    return result;
  }
}
