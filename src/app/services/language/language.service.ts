import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { SelectOption } from 'src/app/components/forms/select/select.component';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
public languaje='es';
langUpdated = new EventEmitter();
public languageList: SelectOption[] = [
  {
    value: 'es',
    label: 'es',
    image: 'assets/images/traductor/es.jpg'
  },
  {
    value: 'en',
    label: 'en',
    image: 'assets/images/traductor/en.jpg'
  },
];
  constructor(
    private translate:TranslateService,
    private storage:Storage
    ) { }

  async change(lan){
    this.translate.use(lan);
    await this.storage.set('language',lan);
    this.langUpdated.emit(lan);

  }

}