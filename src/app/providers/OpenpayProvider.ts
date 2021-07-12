import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OpenpayProvider {
  constructor(
    private api: ApiService,
    private storage: Storage
  ) {}

  public async cards(): Promise<any> {
    const base = ROUTES.openpay.getCards;
    const result = (await this.api.get(base));
    const cards = result.data.map( card => {
      return card;
    });
    return [
      cards
    ];
  }

  public async getCardsGym(gymId): Promise<any> {
    let base = ROUTES.openpay.getCardByGym;
    base += `/${gymId}`;
    const result = (await this.api.get(base));
    return result;
  }

  public async deleteCard(cardId): Promise <any> {
    let base = ROUTES.openpay.deleteCard;
    base += `/${cardId}`;
    const result = (await this.api.delete(base));
    return result;
  }

  public async deleteCardGym(gymId): Promise <any> {
    let base = ROUTES.openpay.deleteCardGym;
    base += `/${gymId}`;
    const result = (await this.api.delete(base));
    return result;
  }

  public async plans(): Promise<any> {
    const base = ROUTES.openpay.getPlans;
    const result = (await this.api.get(base));
    const plans = result.data.map( plan => {
      return plan;
    });
    return [
      plans
    ];
  }

  public async saveCard(params): Promise<any> {
    const base = ROUTES.openpay.saveCard;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async saveCardGym(params): Promise<any> {
    const base = ROUTES.openpay.saveCardGym;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async setSubscription(params): Promise <any> {
    const base = ROUTES.openpay.setSubscription;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async getSubscription(gymId): Promise<any> {
    let base = ROUTES.openpay.getSubscription;
    base += `/${gymId}`;
    const result = (await this.api.get(base));
    return [
      result
    ];
  }

  public async setSubscriptionGym(params): Promise<any> {
    const base = ROUTES.openpay.setSubscriptionGym;
    const result = (await this.api.post(base, params));
    return result;
  }

  public async getSubscriptionInfoGym(gymId): Promise<any> {
    let base = ROUTES.openpay.getSubscriptionInfoGym;
    base += `/${gymId}`;
    const result = (await this.api.get(base));
    return [
      result
    ];
  }

  public async deleteSubscriptionGym(gymId, subscriptionId): Promise <any> {
    let base = ROUTES.openpay.deleteSubscriptionGym;
    base += `/${gymId}`;
    base += `/${subscriptionId}`;
    const result = (await this.api.delete(base));
    return result;
  }

  public async verifyPayment(): Promise<any> {
    const base = ROUTES.openpay.verifyPayment;
    const result = (await this.api.get(base));
    return result;
  }

  public async updateCardGym(params): Promise<any> {
    const base = ROUTES.openpay.updateCardGym;
    const result = (await this.api.post(base, params));
    return result;
  }
}
