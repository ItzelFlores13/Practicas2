import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DivisasProvider {
  constructor(
    private api: ApiService,
  ) { }

  async index(params): Promise<any> {
    let base = ROUTES.divisas.index;
    base += `?page=${params.page}`;
    if (params.search) {
      base += `&q=${params.search}`;
    }
    const result = (await this.api.get(base));
    return result;
  }

  async update(params): Promise<any> {
    let base = ROUTES.divisas.update(params.id);
    const result = await this.api.post(base, params);
    return result;
  }

  async save(params): Promise<any> {
    let base = ROUTES.divisas.save;
    const result = await this.api.post(base, params);
    return result;
  }
}