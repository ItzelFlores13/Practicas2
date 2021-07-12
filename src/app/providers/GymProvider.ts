import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams } from '../models/User';
import { Gym } from '../models/Gym';
import { NavParams } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';

export interface GymParams {
  page: number;
  query: string;
}

@Injectable({
  providedIn: 'root'
})

export class GymProvider {
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService
  ) {
  }

  public async index(): Promise<Gym> {
    return await this.storage.get('user').then((user: UserParams) => {
      return this.api.get(ROUTES.gym.index(user.id_sucursal));
    }).then((resp) => {
      return resp;
    });
  }

  public async searchGym(params: Partial<GymParams>){
    let base = ROUTES.gimnasio.search;
    base += `?page=${params.page}`;
    base += `&q=${params.query}`
    let gimnasios = (await this.api.get(base));
    if(gimnasios.data)
        return gimnasios.data;
    else
        return gimnasios;
  }

  public async list(page): Promise<any> {
    const base = ROUTES.gym.list(page);
    const result = (await this.api.get(base));
    const gyms = result.data.map( gym => {
      return gym;
    });
    const meta = result.meta;
    const links = result.links;
    return {
      meta,
      links,
      gyms
    };
  }

  public async getGyms(params: GymParams){
    let base = ROUTES.gimnasio.index;
    if (params) { base += `?page=${params.page}`; }
    if (params.query && params.query.length > 0) { base += `&q=${params.query}`; }
    const response = ( await this.api.get(base));
    let gyms;
    if (response.data) {
      gyms = response.data.map( gym => {
        return new Gym(gym);
      });
      const meta = response.meta;
      const links = response.links;
      return {
        meta,
        links,
        gyms
      };
    } else {
      return response;
    }
  }

  public async getGym(id:number) {
    let base = ROUTES.gimnasio.show(id);
    let gym = ( await this.api.get(base) );
    if(gym.data){
        return new Gym(gym.data);
    } else {
      return gym;
    }
  }

  public async getAdmins(gymId: number) {
    const base = ROUTES.gimnasio.getAdmins(gymId);
    const admins = ( await this.api.get(base) );
    return admins;
  }

  public async updateStatus(params) {
    const base = ROUTES.gimnasio.updateStatus;
    const response = await this.api.post(base, params);
  }

  public async getGymPayments(id: number) {
    const base = ROUTES.gimnasio.payments(id);
    const payments = await this.api.get(base);
    return payments;
  }

  async setFreeSubscription(params) {
    const base = ROUTES.gym.setFreeSubscription;
    const subscription = await this.api.post(base, {gymId: params.gymId});
    return subscription;
  }

  async getGymSubscription(gymId) {
    const base = ROUTES.gym.getFreeSubscription(gymId);
    const subscription = await this.api.get(base);
    return subscription;
  }

  async deleteFreeSubscription(params) {
    const base = ROUTES.gym.deleteFreeSubscription;
    const result = this.api.post(base, params);
    return result;
  }
  /**
    * @author Sergio Castro
    * @description Actualiza los ajustes de visibilidad en la app del gimnasio 
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @param settings tipo de ajuste
    * @return registro de ajuste de gimnasio actualizado
    * @exceptions lista de errores en petición de api
   */
  public async updateSettingsGym(id:number, settings:any) {

    this.spinner.show();
    const base = ROUTES.gimnasio.settingsUpdate(id);
    let data = {value: settings.value,name:settings.name}
    let result = await this.api.post(base,data);
    this.spinner.hide();
    return result;
  }

  /**
    * @author Sergio Castro
    * @description  Crea el ajuste para la página web del gimnasio 
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @param setting información de la página
    * @return página del gimnasio creada
    * @exceptions lista de errores en petición de api
   */
  public async createSettingGym(id:number,setting){

    this.spinner.show();
    const base = ROUTES.gimnasio.settingsPageWebCreate(id);
    let formData = new FormData();
    formData.append('photo', setting.photo);
    let membresias = [];
    setting.membresias.forEach(element => {
      let membGym ={ id_membresia:element.id,description:element.description};
      membresias.push(membGym);
    });
    formData.append('membresias',JSON.stringify(membresias));

    return await this.api.postFile(base, formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
  /**
    * @author Sergio Castro
    * @description  Actualiza el ajuste para la página web del gimnasio 
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @param setting información de la página
    * @return página del gimnasio actualizada
    * @exceptions lista de errores en petición de api
   */
  public async updateSettingGym(id:number,setting){

    this.spinner.show();
    const base = ROUTES.gimnasio.settingsPageWebUpdate(id);
    let formData = new FormData();
    formData.append('photo', setting.photo);
    let membresias = [];
    setting.membresias.forEach(element => {
      let membGym ={ id_membresia:element.id,description:element.description};
      membresias.push(membGym);
    });
    formData.append('membresias',JSON.stringify(membresias));

    return await this.api.postFile(base, formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
  /**
    * @author Sergio Castro
    * @description  Actualiza el encabezado 1 de la página del gimnasio
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @param setting información de la página encabezado 1
    * @return página del gimnasio actualizada
    * @exceptions lista de errores en petición de api
   */
  public async saveHeaderF(id:number,setting:any) {
    
    this.spinner.show();
    let formData = new FormData();
    const base = ROUTES.gimnasio.settingsPageWebUpdateHearderF(id);

    formData.append('image_header_f', setting.image_header_f);
    formData.append('text_header_f', setting.text_header_f);
    formData.append('description_header_f', setting.description_header_f);

    return await this.api.postFile(base, formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
  /**
    * @author Sergio Castro
    * @description  Actualiza el encabezado 2 de la página del gimnasio
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @param setting información de la página encabezado 2
    * @return página del gimnasio actualizada
    * @exceptions lista de errores en petición de api
   */
  public async saveHeaderS(id:number,setting:any) {
    
    this.spinner.show();
    let formData = new FormData();
    const base = ROUTES.gimnasio.settingsPageWebUpdateHearderS(id);

    formData.append('image_header_s', setting.image_header_s);
    formData.append('text_header_s', setting.text_header_s);
    formData.append('description_header_s', setting.description_header_s);

    return await this.api.postFile(base, formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }

  /**
    * @author Sergio Castro
    * @description  Actualiza el logo del gimnasio
    * @date 3 Marzo 2021
    * @param id identificador del gimnasio
    * @param archivo imagen 
    * @return logo del gimnasio actualizada
    * @exceptions lista de errores en petición de api
   */
  async updatePhotoGym(archivo: any, id: number) {
    this.spinner.show();
    let base = ROUTES.gimnasio.updatePhoto;
    var data = new FormData();  
    data.append("id", id.toString());
    data.append("logo", archivo);

    return await this.api.postFile(base, data).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });

  }

  async getPaises(){
    this.spinner.show();
    let base = ROUTES.gimnasio.paises;
    return await this.api.get(base).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
  async storeGym(data){
    this.spinner.show();
    let base = ROUTES.gimnasio.gymStore;
    let formData = new FormData();
      formData.append('nombre', data.name);
      formData.append('logo', data.logo);
      formData.append('pagina', data.url);
      formData.append('descripcion', data.desc);
      formData.append('puntos_por_asistencia', data.pts.toString());
      formData.append('id_tema', `${data.theme}`);
      formData.append('allowed_athletes_num', data.atletas.toString());
      formData.append('allowed_branches_num', data.sucursales.toString());
      formData.append('paquete', data.package.toString());
      formData.append('id_pais', data.pais.toString());
      formData.append(
        'cargo_automatico',
        data.cargoAutomatico ? '1' : '0'
      );
      formData.append('plan', data.plan.toString());

    return await this.api.postFile(base,formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
  async updateGym(data){
    this.spinner.show();
    let base = ROUTES.gimnasio.gymUpdate;
    let formData = new FormData();
      formData.append('id', data.id.toString());
      formData.append('nombre', data.name);
      formData.append('logo', data.logo);
      formData.append('pagina', data.url);
      formData.append('descripcion', data.desc);
      formData.append('puntos_por_asistencia', data.pts.toString());
      formData.append('id_tema', `${data.theme}`);
      formData.append('allowed_athletes_num', data.atletas.toString());
      formData.append('allowed_branches_num', data.sucursales.toString());
      formData.append('paquete', data.package.toString());
      formData.append('status', data.status.toString());
      formData.append('id_pais', data.pais.toString());
      formData.append(
        'cargo_automatico',
        data.cargoAutomatico ? '1' : '0'
      );
      formData.append('plan', data.plan.toString());

    return await this.api.postFile(base,formData).then((response) => {
      this.spinner.hide();
      return response;
    }).catch(err => {
      this.spinner.hide();
      return err
    });
  }
}
