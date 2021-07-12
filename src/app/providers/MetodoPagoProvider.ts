import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MetodoPagoProvider {
  constructor(
    private api: ApiService,
  ) {
  }

  public async index(): Promise<any> {
    const base = ROUTES.metodoPago.index;
    const result = (await this.api.get(base));
    return result;
  }
}
