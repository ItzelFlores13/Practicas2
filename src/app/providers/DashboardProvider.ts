import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Lesson } from '../models/Lesson';
import { Sesion } from '../models/Sesion';
import { StatsDashboard } from '../models/StatsDashboard';

export interface DashboardParams {
  id_sucursal: number;
  fecha_inicio:any;
  fecha_fin:any;
  id_gimnasio:number,
  page:number,
  action:string,
  id_usuario:number,
  filtros:string[],
}

@Injectable({
  providedIn: 'root'
})

/**
  * Dashboard provider
  * Información realacionada con el dashboard, métricas, asistencias, usuarios vencidos, ventas, usuarios activos, egresos.
  */
export class DashboardProvider {  
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }


  /**
    * @author Sergio Castro
    * @description Obtiene la lista de métricas para el dashboard
    * @date 28 Enero 2021
    * @param params parametros de filtracion como  (id_sucursal, fecha_inicio, fecha_fin)
    * @return arreglo con las métricas
    * @exceptions lista de errores en petición de api
   */
  public async getStats(params: Partial< DashboardParams>){

    //this.spinner.show();
    let base = ROUTES.dashboard.stats(params.id_gimnasio);
    if (params.fecha_inicio) base += `?fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 
    base += '&periodo=1';
    
    let stats = await this.api.get(base);
    if(stats.data){
        stats.data = new StatsDashboard(stats.data);
    } 
    //this.spinner.hide();

    return stats;
  }
  
  /**
    * @author Sergio Castro
    * @description Obtiene la lista de usuarios vencidos
    * @date 28 Enero 2021
    * @param params parametros de filtracion como (page, id_sucursal)
    * @return lista de usuarios vencidos
    * @exceptions lista de errores en petición de api
   */
  public async getUsersExpired(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.usersExpired(params.id_gimnasio);
    if (params.page) base += `?page=${params.page}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 
    
    let users = await this.api.get(base);
    this.spinner.hide();

    return users;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene las ventas por mes
    * @date 3 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de ventas de articulos
    * @exceptions lista de errores en petición de api
   */
  public async getSalesByMonth(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.salesMonth(params.id_gimnasio);
   
 
    
    if (params.fecha_fin) base += `?fecha_fin=${params.fecha_fin}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    
    let sales = await this.api.get(base);
    this.spinner.hide();

    return sales;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene las ventas de membresías por mes
    * @date 3 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de ventas de membresías
    * @exceptions lista de errores en petición de api
   */
  public async getMembershipsByMonth(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.membershipsByMonth(params.id_gimnasio);
   
    if (params.fecha_inicio) base += `?fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 

    
    let memberships = await this.api.get(base);
    this.spinner.hide();

    return memberships;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene los productos mas vendidos
    * @date 3 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de productos mas vendidos
    * @exceptions lista de errores en petición de api
   */
  public async getProductsTop(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.productosTop(params.id_gimnasio);
   
   
    if (params.fecha_inicio) base += `?fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 
    
    let products = await this.api.get(base);
    this.spinner.hide();

    return products;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene las membresias mas vendidas
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de membresias mas vendidas
    * @exceptions lista de errores en petición de api
   */
  public async getMembershipsTop(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.membershipsTop(params.id_gimnasio);
   
    if (params.fecha_inicio) base += `?fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 

    
    let memberships = await this.api.get(base);
    this.spinner.hide();

    return memberships;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de usuarios que cumplen años
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio)
    * @return lista de cumpleañeros
    * @exceptions lista de errores en petición de api
   */
  public async getUsrsBirthday(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.usersBirthday;
   
    if (params.id_gimnasio) base += `?id_gimnasio=${params.id_gimnasio}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 


    
    let users = await this.api.get(base);
    if(users.data){
      let data = [];
      users.data.forEach(element => {
        data.push(new User(element));
      });
      users.data = data;
    }
    this.spinner.hide();

    return users;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene el reporte diario de egresos
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de egresos del dia actual
    * @exceptions lista de errores en petición de api
   */
  public async getDailyEgressReport(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.dailyEgressReport(params.id_gimnasio);
   
    if (params.id_sucursal && params.id_sucursal!=-1) base += `?id_sucursal=${params.id_sucursal}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    base+=`&conceptos=[%22egresos%22]&estatus=Activa`;
    
    let report = await this.api.get(base);
  
    this.spinner.hide();

    return report;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene el reporte diario del balance
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin, page)
    * @return lista de ingresos y egresos
    * @exceptions lista de errores en petición de api
   */
  public async getDailyBalanceReport(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.dailyEgressReport(params.id_gimnasio);
   
    if (params.id_sucursal && params.id_sucursal!=-1) base += `?id_sucursal=${params.id_sucursal}`; 
    if(params.page) base += `&page=${params.page}`
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    base+=`&conceptos=[%22ventas%22,%20%22membresias%22,%20%22egresos%22]&estatus=Activa`;

    let report = await this.api.get(base);
  
    this.spinner.hide();

    return report;
  }

  /**
    * @author Sergio Castro
    * @description OBtiene el reporte diario de ventas por articulos
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin,page)
    * @return lista de articuls vendidos del dia actual
    * @exceptions lista de errores en petición de api
   */
  public async getDailySalesReport(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.dailyEgressReport(params.id_gimnasio);
   
    if (params.id_sucursal && params.id_sucursal!=-1) base += `?id_sucursal=${params.id_sucursal}`; 
    if(params.page) base += `&page=${params.page}`
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}%2023:33:00`; 
    base+=`&conceptos=[%22ventas%22]&estatus=Activa`;
    let report = await this.api.get(base);
  
    this.spinner.hide();

    return report;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene el reporte diario de las membresias
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin, page)
    * @return lista de membresias del dia actual
    * @exceptions lista de errores en petición de api
   */
  public async getDailyMembershipsReport(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.dailyMembershipsReport(params.id_gimnasio);
   
    if (params.page) base += `?page=${params.page}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    //let concepto = JSON.stringify(['membresias']);
    //base+=`&conceptos=${concepto}`;
    base+= `&conceptos=[%22membresias%22]&estatus=Activa`;
    
    let report = await this.api.get(base);
  
    this.spinner.hide();

    return report;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene el reporte diario de membresias mas vendidas 
    * @date 27 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de membresias más vendidas del dia actual
    * @exceptions lista de errores en petición de api
   */
  public async getDailyReports(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.reports.dailyReports(params.id_gimnasio);
   
    if (params.fecha_inicio) base += `?fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    if (params.id_sucursal && params.id_sucursal!=-1) base += `&id_sucursal=${params.id_sucursal}`; 
    
    let data = {filtros: JSON.stringify(params.filtros)}
    
    let report = await this.api.post(base,data);
  
    this.spinner.hide();

    return report;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene las asistencias por coach
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de asistencias por coach
    * @exceptions lista de errores en petición de api
   */
  public async getAttendanceClassCoaches(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.attendanceClassCoach(params.id_gimnasio);
   
    if (params.id_sucursal) base += `?id_sucursal=${params.id_sucursal}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    
    let attendances = await this.api.get(base);
  
    this.spinner.hide();

    return attendances;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene las asistencias por clase
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de asistencias por clase 
    * @exceptions lista de errores en petición de api
   */
  public async getAttendanceClass(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.attendanceClass(params.id_gimnasio);
   
    if (params.id_sucursal ) base += `?id_sucursal=${params.id_sucursal}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    
    let attendances = await this.api.get(base);
  
    this.spinner.hide();

    return attendances;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de asistencias por hora
    * @date 9 Febrero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, fecha_inicio, fecha_fin)
    * @return lista de asistencias por hora
    * @exceptions lista de errores en petición de api
   */
  public async getAttendanceHours(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.attendanceHours(params.id_gimnasio);
   
    if (params.id_sucursal) base += `?id_sucursal=${params.id_sucursal}`; 
    if (params.fecha_inicio) base += `&fecha_inicio=${params.fecha_inicio}`; 
    if (params.fecha_fin) base += `&fecha_fin=${params.fecha_fin}`; 
    
    let attendances = await this.api.get(base);
  
    this.spinner.hide();

    return attendances;
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de usuarios vencidos en un rango +- 7 dias
    * @date 28 Enero 2021
    * @param params parametros de filtracion como  (id_sucursal, id_gimnasio, action = add || substract)
    * @return lista de usuarios vencidos
    * @exceptions lista de errores en petición de api
   */
  public async getUsersExpiredRange(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.usersExpiredRange;

    if (params.action) base += `?action=${params.action}`; 
    if (params.id_gimnasio) base += `&id_gimnasio=${params.id_gimnasio}`; 
    if (params.id_sucursal ) base += `&id_sucursal=${params.id_sucursal}`; 
    
    let users = await this.api.get(base);
    this.spinner.hide();

    return users;
  }

  /**
    * @author Sergio Castro
    * @description Envia correo al usuario para renovar su membresía
    * @date 28 Enero 2021
    * @param params (id_gimnasio, id_usuario)
    * @return Correo enviado
    * @exceptions lista de errores en petición de api
   */
  public async sendReminder(params: Partial< DashboardParams>){

    this.spinner.show();
    let base = ROUTES.dashboard.recordatorio(params.id_gimnasio,params.id_usuario);
    
    let users = await this.api.get(base);
    this.spinner.hide();

    return users;
  }

  /**
    * @author Sergio Castro
    * @description Envia notificación al dispositivo del usuario
    * @date 28 Enero 2021
    * @param id_usuario
    * @return notificación enviada
    * @exceptions lista de errores en petición de api
   */
  public async sendReminderNotification(id_usuario){

    this.spinner.show();
    let base = ROUTES.dashboard.recordatorioNotificacion(id_usuario);
    
    let users = await this.api.get(base);
    this.spinner.hide();

    return users;
  }


}