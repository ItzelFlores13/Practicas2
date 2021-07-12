import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

export interface IPreference {
  name: string;
  value: boolean|string|number;
  default: boolean|string|number;
}

export class Preference {
  private _props: IPreference;
  constructor(
    preference: IPreference,
    private storage: Storage
  ) {
    this._props = preference;
  }
  set value(value: string|boolean|number) {
    this._props.value = value;
    this.storage.set(this._props.name, this._props.value);
  }
  get value() {
    return this._props.value;
  }
  set name(name:string) {
    this._props.name = name;
  }
  get name() {
    return this._props.name;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PreferenceProvider {
  preferences: any = [
    new Preference({
      name: 'banner/compact-size',
      value: true,
      default: false
    }, this.storage),
    new Preference({
      name: 'banner/visible-background',
      value: true,
      default: false
    }, this.storage)
  ];
  constructor(private storage: Storage) {
    this.preferences.forEach((p)=>{
      this.storage.get(p.name).then((value)=>{
        if (value) {
          p = new Preference({
            name: p.name,
            value: value,
            default: p.default
          }, this.storage);
        }
      });
    });
  }
  get(key: string) {
    return this.preferences.find(p=>p.name == key);
  }
}
