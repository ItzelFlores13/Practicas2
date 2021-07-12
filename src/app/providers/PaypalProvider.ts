import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaypalProvider {
  constructor(
    private api: ApiService,
    private storage: Storage
  ) {}

  public async setSubscription(data): Promise<any> {
    const base = ROUTES.paypal.setSubscription;
    const result = (await this.api.post(base, data));
    return [
      result
    ];
  }

  public async getSubscription(subscriptionId): Promise<any> {
    let base = ROUTES.paypal.getSubscription;
    base += `/${subscriptionId}`;
    const result = (await this.api.get(base));
    return [
      result
    ];
  }

  public async deleteSubscription(subscriptionId): Promise<any> {
    const base = ROUTES.paypal.cancelSubscription;
    const result = (await this.api.post(base, {subscriptionId}));
    return [
      result
    ];
  }

  public async getSubscriptionTransactions(subscriptionId): Promise<any> {
    const base = ROUTES.paypal.getSubscriptionTransaction;
    const result = (await this.api.post(base, {subscriptionId}));
    return result;
  }
}
