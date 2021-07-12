import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ReportAsistenciaProvider {
  constructor(
    private api: ApiService,
  ) { }

  async getReport(params: any): Promise<any> {
    let base = ROUTES.reports.asistenciaMembresia(params.gymId);
    base += `?page=${params.page}`;
    if (parseInt(params.branch) !== 0 && parseInt(params.branch) !== 9999) {
      base += `&id_sucursal=${params.branch}`;
    }
    if (params.id_user !== 0) {
      base += `&id=${params.id_user}`;
    }
    base += `&fecha_desde=${params.startDate}`;
    base += `&fecha_hasta=${params.endDate}`;
    base += `&hora_desde=${params.startHour}`;
    base += `&hora_hasta=${params.endHour}`;
    const result = (await this.api.get(base));
    return result;
  }

  async getReportNoMemberships(params: any): Promise<any> {
    let base = ROUTES.reports.asistenciaSinMembresia(params.gymId);
    base += `?id_sucursal=${params.branch}`;
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const result = await this.api.get(base);
    return result;
  }
}
