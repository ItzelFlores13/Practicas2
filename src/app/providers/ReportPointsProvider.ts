import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ReportPointsProvider {
  constructor(
    private api: ApiService,
  ) { }

  public async getReportPoints(params: any): Promise<any> {
    let base = ROUTES.reports.points;
    base += `?id_sucursal=${params.branch}`;
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const result = (await this.api.get(base));
    return result;
  }

  public async getReportPurchases(params: any): Promise<any> {
    let base = ROUTES.reports.purchases;
    base += `?id_sucursal=${params.branch}`;
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const result = (await this.api.get(base));
    return result;
  }
}
