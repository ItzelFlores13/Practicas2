import { WodVideo } from './../models/WodVideo';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { CommentStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class WodVideoProvider {
  constructor(
    private storage: Storage,
    private api: ApiService,
  ) { }

  async getVideos(data): Promise<any> {
    let base = ROUTES.wodVideo.index(data.gymId);
    base += `?page=${data.page}&q=${data.filter}`;
    const result = (await this.api.get(base));
    return {
      data: result.data,
      meta: result.meta
    };
  }

  async deleteVideo(data): Promise<any> {
    const base = ROUTES.wodVideo.delete(data);
    const result = (await this.api.delete(base));
    return result;
  }

  async saveVideo(data, gymId): Promise<any> {
    const base = ROUTES.wodVideo.save(gymId);
    const result = (await this.api.post(base, data));
    return result;
  }

  async updateVideo(data, gymId): Promise<any> {
    const base = ROUTES.wodVideo.update(gymId, data.id);
    const result = (await this.api.post(base, data));
    return result;
  }

}
