import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';

export interface NotificationSearchParams {
  page: number;
  id_gimnasio: number;
}

@Injectable({
  providedIn: 'root'
})

export class NotificationProvider {
  constructor(
    private storage: Storage,
    private api: ApiService,
  ) { }

  public async index(params: Partial<NotificationSearchParams>): Promise<Notification[]> {
    let base = ROUTES.notifications.index;
    base += `?page=${params.page}`;
    if (params.id_gimnasio) {
      base += `&id_gimnasio=${params.id_gimnasio}`;
    }
    const result = (await this.api.get(base));
    const notifications = result.data.map( notification => {
      return new Notification(notification);
    });
    const meta = result.meta;
    const links = result.links;
    return [
      notifications,
      meta,
      links
    ];
  }

  public async save(params): Promise<Notification[]> {
    const base = ROUTES.notifications.save;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async update(params): Promise<Notification[]> {
    const base = ROUTES.notifications.update + '/' + params.id;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async delete(params): Promise<Notification[]> {
    const base = ROUTES.notifications.delete + '/' + params.id;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async resend(id): Promise<Notification[]> {
    let base = ROUTES.notifications.resend;
    base += `/${id}`;
    const result = (await this.api.get(base));
    return result;
  }
}
