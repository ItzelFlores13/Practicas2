import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

export interface UserSearchParams {
  page: number;
  query: string;
  items: number;
  id_rol: number;
  id_sucursal: number;
  filters: UserSearchFilter[];
  id_gimnasio:number;
  tipo_filtro:number;
}
export interface UserSearchFilter {
  campo: string | 'nombre' | 'apellido_paterno' | 'email';
  orden: '' | 'asc' | 'desc';
}
@Injectable({
  providedIn: 'root'
})

/**
  * User provider
  * Muestra información de facturación , permite edición de métodos de pago
  * y procesa el cobro.
  */
export class UserProvider {
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
  ) {
  }

  public async local() {
    let user = await this.storage.get('user');
    if (user) return new User(user);
  }

  public async search(params: Partial<UserSearchParams>) {

    this.spinner.show();
    let base = ROUTES.usuarios.search;

    if (params.page) base += `?page=${params.page}`;
    if (!params.page) base += `?page=${1}`;
    if (params.id_rol) base += `&id_rol=${params.id_rol}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;
    if (params.items) base += `&nAtletas=${params.items}`;
    if (params.query && params.query.length > 0) base += `&q=${params.query}`;
    if (!params.filters) base += '&filtros=[]';
    let users = (await this.api.get(base));
    if (users.data) {
      this.spinner.hide();
      let userList = [];
      users.data.forEach(element => {
        element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno
        userList.push(new User(element))
      });
      users.data = userList;
      return users;
    }
    else
      this.spinner.hide();


  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de usuarios para la seccion de correos personalizados
    * @date 12 Abril 2021
    * @param params filtros como [page, id_sucursal, id_gimnasio, id_rol, query, tipo_filtro]
    * @return lista de usuarios
    * @exceptions lista de errores en petición de api
   */
  public async byMessage(params: Partial<UserSearchParams>) {

    this.spinner.show();
    let base = ROUTES.usuarios.byMessages;

    if (params.page) base += `?page=${params.page}`;
    if (!params.page) base += `?page=${1}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;
    if (params.id_gimnasio) base += `&id_gimnasio=${params.id_gimnasio}`;
    if (params.id_rol) base += `&id_rol=${params.id_rol}`;
    if (params.query && params.query.length > 0) base += `&q=${params.query}`;
    if (params.tipo_filtro) base += `&tipo_filtro=${params.tipo_filtro}`;
    let users = (await this.api.get(base));
    if (users.data) {
      this.spinner.hide();
      let userList = [];
      users.data.forEach(element => {
        element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno
        userList.push(new User(element))
      });
      users.data = userList;
      return users;
    }
    else
      this.spinner.hide();
  }
  /**
    * @author Sergio Castro
    * @description Obtiene El total de usuarios el la bd 
    * @date 28 septiembre 2020
    * @param params parametros de filtración para obtener los usuarios ( id_gimnasio, id_sucursal, nAtletas)
    * @return total de usuarios
    * @exceptions lista de errores en petición de api
   */
  public async searchCount(params: Partial<UserSearchParams>) {

    this.spinner.show();

    let base = ROUTES.usuarios.searchCount;


    if (params.id_rol) base += `?id_rol=${params.id_rol}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;
    if (params.items) base += `&nAtletas=${params.items}`;
    if (params.query && params.query.length > 0) base += `&q=${params.query}`;
    if (!params.filters) base += '&filtros=[]';
    let users = (await this.api.get(base));
    
    if (users.data) {
      // users.data.forEach(element => {
      //   element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno
      // });
      this.spinner.hide();
      return users.data;
    }
    else {
      this.spinner.hide();
      return users;
    }


  }

  /**
   * @author Sergio Castro
   * @description Obtiene la lista de usuarios por gimnasio 
   * @date 23 septiembre 2020
   * @param params parametros de filtración para obtener los usuarios (page, id_gimnasio, id_sucursal, nAtletas, query)
   * @return arreglo de usuarios
   * @exceptions lista de errores en petición de api
  */
  public async getUsersByGym(params: any) {

    this.spinner.show();

    let base = ROUTES.usuarios.byGym;

    if (params.page) base += `?page=${params.page}`;
    if (!params.page) base += `?page=${1}`;
    if (params.id_gimnasio) base += `&id_gimnasio=${params.id_gimnasio}`;
    if (params.id_rol) base += `&id_rol=${params.id_rol}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;
    if (params.items) base += `&nAtletas=${params.items}`;
    if (params.query && params.query.length > 0) base += `&q=${params.query}`;
    if (!params.filters) base += '&filtros=[]';
    let users = (await this.api.get(base));
    if (users.data) {
      this.spinner.hide();
      let userList = [];
      users.data.forEach(element => {
        element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno
        userList.push(new User(element))
      });
      users.data = userList;
      return users;
    }
    else
      this.spinner.hide();


  }

  /**
    * @author Sergio Castro
    * @description Obtiene El total de usuarios el la bd 
    * @date 28 septiembre 2020
    * @param params parametros de filtración para obtener los usuarios ( id_gimnasio, id_sucursal, nAtletas)
    * @return total de usuarios
    * @exceptions lista de errores en petición de api
   */
  public async getUsersByGymCount(params: any) {


    this.spinner.show();
    let base = ROUTES.usuarios.byGymCount;

    if (params.id_gimnasio) base += `?id_gimnasio=${params.id_gimnasio}`;
    if (params.id_rol) base += `&id_rol=${params.id_rol}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;
    if (params.items) base += `&nAtletas=${params.items}`;
    if (params.query && params.query.length > 0) base += `&q=${params.query}`;
    if (!params.filters) base += '&filtros=[]';
    let users = (await this.api.get(base));
    if (users.data) {
      this.spinner.hide();
      return users;
    }
    else {
      this.spinner.hide();
      return users;
    }
  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de usuarios expirados  
    * @date 23 septiembre 2020
    * @param params parametros de filtración para obtener los usuarios (page, id_gimnasio, id_sucursal, nAtletas)
    * @return arreglo de usuarios
    * @exceptions lista de errores en petición de api
   */
  public async expired(params: any) {


    this.spinner.show();
    let user: UserParams = await this.storage.get('user');
    let base = ROUTES.usuarios.expirados(user.id_gimnasio);

    if (params.page) base += `?page=${params.page}`;
    if (!params.page) base += `?page=${1}`;
    if (params.items) base += `&nAtletas=${params.items}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;

    let users = (await this.api.post(base, null));
    if (users.data) {
      this.spinner.hide();
      let userList = [];
      users.data.forEach(element => {
        element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno
        userList.push(new User(element))
      });
      users.data = userList;
      return users;
    }
    else
      this.spinner.hide();

  }

  /**
    * @author Sergio Castro
    * @description Obtiene la lista de usuarios activos 
    * @date 23 septiembre 2020
    * @param params parametros de filtración para obtener los usuarios (page, id_gimnasio, id_sucursal, nAtletas, query)
    * @return arreglo de usuarios
    * @exceptions lista de errores en petición de api
   */
  public async actived(params: any) {

    this.spinner.show();
    let user: UserParams = await this.storage.get('user');
    let base = ROUTES.usuarios.activos(user.id_gimnasio);

    if (params.page) base += `?page=${params.page}`;
    if (!params.page) base += `?page=${1}`;
    if (params.items) base += `&nAtletas=${params.items}`;
    if (params.id_sucursal) base += `&id_sucursal=${params.id_sucursal}`;

    let users = (await this.api.post(base, null));
    if (users.data) {
      this.spinner.hide();
      let userList = [];
      users.data.forEach(element => {
        element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno
        userList.push(new User(element))
      });
      users.data = userList;
      return users;
    }
    else
      this.spinner.hide();
  }
  /**
    * @author Sergio Castro
    * @description Obtiene la información de un usuario
    * @date 23 septiembre 2020
    * @param id identificador del usuario
    * @return objeto usuario
    * @exceptions lista de errores en petición de api
   */
  public async getUser(id: number) {

    this.spinner.show();
    let base = ROUTES.usuarios.show(id);
    let user = (await this.api.get(base));

    if (user.data) {
      this.spinner.hide();
      return new User(user.data);
    }
    else {
      this.spinner.hide();
      user.apellido_materno=user.apellido_materno === null ? " " : user.apellido_materno
      return user;
    }


  }
  /**
    * @author Sergio Castro
    * @description Obtiene la información de un usuario
    * @date 23 septiembre 2020
    * @param id identificador del usuario
    * @return objeto usuario
    * @exceptions lista de errores en petición de api
   */
  public async getUserEdit(id: number) {

    this.spinner.show();
    let base = ROUTES.usuarios.showEdit(id);
    let user = (await this.api.get(base));

    if (user.data) {
      this.spinner.hide();
      return new User(user.data);
    }
    else {
      this.spinner.hide();
      user.apellido_materno=user.apellido_materno === null ? " " : user.apellido_materno
      return user;
    }


  }

  /**
    * @author Sergio Castro
    * @description Inserta un usuario nuevo en la db
    * @date 23 septiembre 2020
    * @param user Objeto usuario con la información perteneciente al mismo
    * @return objeto usuario que se creo
    * @exceptions lista de errores en petición de api
   */
  public async createUser(user: User) {
    user.apellido_materno=user.apellido_materno === null ? " " : user.apellido_materno
    this.spinner.show();
    let base = ROUTES.usuarios.create;

    let data = new FormData();
    data.append('nombre', user.nombre);
    data.append('apellido_materno', user.apellido_materno);
    data.append('apellido_paterno', user.apellido_paterno);
    data.append('telefono', user.telefono);
    data.append('email', user.email);
    data.append('password', 'ChangePassword#');
    data.append('fecha_nacimiento', user.fecha_nacimiento);
    data.append('sexo', user.sexo);
    data.append('tipo_sangre', user.tipo_sangre);
    data.append('consumer_token', "alv213421251");
    data.append('id_rol', user.id_rol.toString());
    data.append('foto', user.foto);
    data.append('id_gimnasio', user.id_gimnasio.toString());
    data.append('id_sucursal', user.id_sucursal.toString());
    data.append('direccion', JSON.stringify(user.direccion));
    data.append('datos_contacto', JSON.stringify(user.contacto_emergencia));

    return await this.api.postFile(base, data).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });

  }

  /**
    * @author Sergio Castro
    * @description Actualiza la información de un usuario registrado  
    * @date 23 septiembre 2020
    * @param user objeto usuario  con la información  perteneciente al mismo
    * @return objeto usuario actualizado
    * @exceptions lista de errores en petición de api
   */
  public async updateUser(user: User) {
    user.apellido_materno=user.apellido_materno === null ? " " : user.apellido_materno


    this.spinner.show();
    let base = ROUTES.usuarios.update;

    let data = new FormData();
    data.append('id', user.id.toString());
    data.append('nombre', user.nombre);
    data.append('apellido_materno', user.apellido_materno);
    data.append('apellido_paterno', user.apellido_paterno);
    data.append('telefono', user.telefono);
    data.append('email', user.email);
    data.append('fecha_nacimiento', user.fecha_nacimiento);
    data.append('sexo', user.sexo);
    data.append('tipo_sangre', user.tipo_sangre);
    data.append('consumer_token', "alv213421251");
    data.append('id_rol', user.id_rol.toString());
    data.append('foto', user.foto);
    data.append('id_gimnasio', user.id_gimnasio.toString());
    data.append('id_sucursal', user.id_sucursal.toString());
    data.append('direccion', JSON.stringify(user.direccion));
    data.append('datos_contacto', JSON.stringify(user.contacto_emergencia));

    return await this.api.postFile(base, data).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });

  }

  /**
    * @author Sergio Castro
    * @description Elimina un usuario
    * @date 23 septiembre 2020
    * @param id identificador del usuario
    * @return confirmación de eliminasion de usuario
    * @exceptions lista de errores en petición de api
   */
  async deleteUser(id: number) {

    this.spinner.show();
    let base = ROUTES.usuarios.destroy(id);
    let user = (await this.api.delete(base));
    if (user.data) {
      this.spinner.hide();
      return new User(user.data);
    }
    else {
      this.spinner.hide();
      return user;
    }


  }
  async deleteUsers(users) {
    this.spinner.show();
    let res;
    users.forEach(async u => {
      let base = ROUTES.usuarios.destroy(u.id);
      res = (await this.api.delete(base));
    });

    this.spinner.hide();

    return res;
  }
  async deleteMass(users) {
    this.spinner.show();
    let base = ROUTES.usuarios.destroyMass;
    let data = { usuarios: users }

    let usersDeleted = (await this.api.post(base, data));
    if (usersDeleted.data) {
      this.spinner.hide();
      return usersDeleted.data;
    }
    else
      this.spinner.hide();
    return usersDeleted;
  }
  /**
    * @author Sergio Castro
    * @description Activa los usuarios
    * @date 23 septiembre 2020
    * @param usuarios arreglo de usuarios a activar
    * @return arreglo de usuarios activados
    * @exceptions lista de errores en petición de api
   */
  async activatedUsers(usuarios: any) {

    this.spinner.show();

    let base = ROUTES.usuarios.activarUsuario;
    let data = { ids: usuarios }
    let activate = (await this.api.post(base, data));
    if (activate.data) {
      this.spinner.hide();
      return activate.data;
    }
    else
      this.spinner.hide();
    return activate;

  }

  /**
    * @author Sergio Castro
    * @description Desactiva usuarios
    * @date 23 septiembre 2020
    * @param usuarios arreglo de usuarios a desactivar
    * @return  usuarios desactivados
    * @exceptions lista de errores en petición de api
   */
  async deactivateUsers(usuarios: any) {

    this.spinner.show();
    let base = ROUTES.usuarios.desactivarUsuario;
    let data = { ids: usuarios }
    let activate = (await this.api.post(base, data));
    if (activate.data) {
      this.spinner.hide();
      return activate.data;
    }
    else
      this.spinner.hide();
    return activate;

  }

  /**
    * @author Sergio Castro
    * @description Obtiene el historial del usuario   
    * @date 23 septiembre 2020
    * @param params parametros de filtración para obtener los usuarios (id_usuario, page, order, fecha_inicio, fecha_fin)
    * @return arreglo de compras y membresias obtenidas por el usuario
    * @exceptions lista de errores en petición de api
   */
  async getHistorialCompras(params: any) {

    this.spinner.show();

    let base = ROUTES.usuarios.historialCompras;
    base += `?id_usuario=${params.id_usuario}`;
    if (params.page) base += `&page=${params.page}`;
    base += `&oder=desc`;
    base += `&fecha_inicio=${params.fecha_inicio}`;
    base += `&fecha_fin=${params.fecha_fin}`;

    let history = (await this.api.get(base));

    if (history) {
      this.spinner.hide();
      return history;
    }
    else {
      this.spinner.hide();
      return history;
    }


  }

  /**
    * @author Sergio Castro
    * @description Envia recordatorio al usuario   
    * @date 23 septiembre 2020
    * @param id_gimnasio identificador de gimnasio
    * @param id_usuario identificador de usuario
    * @return confirmacion de envio de recordatorio
    * @exceptions lista de errores en petición de api
   */
  async sendRecordatorio(id_gimnasio: number, id_usuario: number) {

    this.spinner.show();
    let base = ROUTES.gimnasio.enviarRecordatorio(id_gimnasio, id_usuario);
    let recordatorio = (await this.api.get(base))

    if (recordatorio.data) {
      this.spinner.hide();
      return recordatorio.data;
    }

    else {
      this.spinner.hide();
      return recordatorio;
    }


  }

  /**
    * @author Sergio Castro
    * @description Descarga el reporte de usuarios  
    * @date 23 septiembre 2020
    * @param id identificador de la sucursal
    * @return reporte de usuarios descargable
    * @exceptions lista de errores en petición de api
   */
  async downloadReporte(id: number) {

    let base = ROUTES.reportes.atletas(id);
    const filename = 'reporte-atleta.xlsx';
    let reporte = (await this.api.getFile(base, filename));
    return reporte;

  }

  /**
    * @author Sergio Castro
    * @description Importar usuarios desde archivo csv  
    * @date 23 septiembre 2020
    * @param archivo archivo csv
    * @param id_sucursal identificador de sucursal
    * @return lista de usuarios insertados y no insertados
    * @exceptions lista de errores en petición de api
   */
  async importarCSV(archivo: File, id_sucursal: number) {


    this.spinner.show();
    let base = ROUTES.usuarios.importarCSV;
    var data = new FormData();
    data.append('import', archivo);
    data.append('id_sucursal', id_sucursal.toString());

    return await this.api.postFile(base, data).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });

  }
  /**
    * @author Sergio Castro
    * @description Actualiza la foto del usuario 
    * @date 3 Marzo 2021
    * @param id identificador del usuario
    * @param archivo imagen
    * @return registro de usuario actualizado
    * @exceptions lista de errores en petición de api
   */
  async updatePhotoUser(archivo: File, id: number) {
    this.spinner.show();
    let base = ROUTES.usuarios.updatePhoto;
    var data = new FormData();
    data.append("id", id.toString());
    data.append("foto", archivo);

    return await this.api.postFile(base, data).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });

  }
  async getCoaches(id_sucursal: number) {


    this.spinner.show();
    let base = ROUTES.usuarios.entrenadores(id_sucursal);
    let coaches = (await this.api.get(base));
    this.spinner.hide();
    let data = [];
    coaches.data.forEach(element => {
      element.apellido_materno=element.apellido_materno === null ? " " : element.apellido_materno;
      data.push(new User(element))
    });
    coaches.data = data;
    return coaches;
  }
  async checkEmail(email: string) {
    this.spinner.show();
    let base = ROUTES.usuarios.checkEmail(email);
    let res = (await this.api.get(base));
    this.spinner.hide();

    return res;
  }
  async getUserByEmail(email: string) {
    this.spinner.show();
    let base = ROUTES.usuarios.getUserbyEmail;
    let formData = new FormData();
    formData.append('email', email)
    return await this.api.postFile(base, formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
  async sendNotificationAthleteEmail(gymId: number, branchId: number, email: string) {
    this.spinner.show();
    const params = {
      gymId,
      branchId,
      email
    };
    let base = ROUTES.usuarios.sendNotification;
    let res = (await this.api.post(base, params))
    this.spinner.hide();

    return res;

  }
  async setPassword(email, password) {
    this.spinner.show();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    let base = ROUTES.usuarios.setPassword;
    let res = (await this.api.postFile(base, formData))
    this.spinner.hide();

    return res;

  }
  async sendRecoveryEmail(email: string) { 

      let formData = new FormData();
      formData.append("email", email);
      let base = ROUTES.usuarios.recoveryPassword;
      let res = (await this.api.postFile(base, formData))
      this.spinner.hide();
  
      return res;
  }
}