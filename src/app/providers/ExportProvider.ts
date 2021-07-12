import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ExportProvider {
  constructor(
    private api: ApiService,
  ) { }

  async getCaja(params: any): Promise<any> {
    let base = ROUTES.exports.getCaja(params.gymId);
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
    const filename = 'reporte-caja.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }

  async getMembership(params: any): Promise<any> {
    let base = ROUTES.exports.getMembership(params.gymId);
    base += `?page=${params.page}`;
    if (params.id_sucursal !== 0 && params.id_sucursal !== 9999) {
      base += `&id_sucursal=${params.branch}`;
    }
    if (params.id_membresia !== 0 && params.id_membresia !== 9999) {
      base += `&id_membresia=${params.id_membresia}`;
    }
    if (params.id_user !== 0) {
      base += `&id_user=${params.id_user}`;
    }
    base += `&fecha_inicio=${params.fecha_inicio}`;
    base += `&fecha_fin=${params.fecha_fin}`;
    const filename = 'reporte-membresias.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }

  async getAsistencia(params: any): Promise<any> {
    let base = ROUTES.exports.getAttendance(params.gymId);
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
    const filename = 'reporte-asistencias.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }

  async getAsistenciaSinMembresia(params: any): Promise<any> {
    let base = ROUTES.exports.getAttendanceNoMemberships(params.gymId);
    base += `?id_sucursal=${params.branch}`;
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const filename = 'reporte-asistencias-sin-membresias.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }

  async getEgresos(params: any): Promise<any> {
    let base = ROUTES.exports.getEgresos(params.gymId);
    base += `?page=${params.page}`;
    if (params.branch !== 0 && params.branch !== 9999) {
      base += `&id_sucursal=${params.branch}`;
    }
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const filename = 'reporte-egresos.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }

  async getPuntosObtenidos(params: any): Promise<any> {
    let base = ROUTES.exports.getPuntosObtenidos;
    base += `?id_sucursal=${params.branch}`;
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const filename = 'reporte-puntos-obtenidos.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }

  async getPuntosCompras(params: any): Promise<any> {
    let base = ROUTES.exports.getPuntosCompras;
    base += `?id_sucursal=${params.branch}`;
    base += `&fecha_inicio=${params.startDate}`;
    base += `&fecha_fin=${params.endDate}`;
    const filename = 'reporte-puntos-compras.xlsx';
    const result = (await this.api.getFile(base, filename));
    return result;
  }
}
