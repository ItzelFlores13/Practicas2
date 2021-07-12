import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ReportMembershipProvider {
  constructor(
    private api: ApiService,
  ) { }

  public async getReport(params: any): Promise<any> {
    let base = ROUTES.reports.membership(params.gymId);
    base += `?page=${params.page}`;
    if (params.id_sucursal !== 0 && params.id_sucursal !== 9999) {
      base += `&id_sucursal=${params.id_sucursal}`;
    }
    if (params.id_membresia !== 0 && params.id_membresia !== 9999) {
      base += `&id_membresia=${params.id_membresia}`;
    }
    if (params.id_user !== 0) {
      base += `&id_user=${params.id_user}`;
    }
    base += `&fecha_inicio=${params.fecha_inicio}`;
    base += `&fecha_fin=${params.fecha_fin}`;
    const result = (await this.api.get(base));
    return result;
  }
}
