import { Injectable, Type, Component } from '@angular/core';
import { CajaComponent } from '../components/reports/caja/caja.component';
import { MembresiasComponent } from '../components/reports/membresias/membresias.component';
import { AsistenciaComponent } from '../components/reports/asistencia/asistencia.component';
import { EgresosComponent } from '../components/reports/egresos/egresos.component';
import { PuntosComponent } from '../components/reports/puntos/puntos.component';

export interface ReportComponent {
  data: any;
}

@Injectable({
  providedIn: 'root'
})

export class ReportsProvider {

  reportComponents = [
    {
      name: 'caja',
      component: CajaComponent
    },
    {
      name: 'membresias',
      component: MembresiasComponent
    },
    {
      name: 'asistencia',
      component: AsistenciaComponent
    },
    {
      name: 'egresos',
      component: EgresosComponent
    },
    {
      name: 'puntos',
      component: PuntosComponent
    }
  ];
  constructor(
  ) {}

  resolveComponent(reportName): Type<any> {
    let component = null;
    this.reportComponents.forEach(item => {
      if (item.name === reportName) {
        component = item.component;
      }
    });
    return component;
  }
}
