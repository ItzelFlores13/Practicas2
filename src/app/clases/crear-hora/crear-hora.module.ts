import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearHoraPageRoutingModule } from './crear-hora-routing.module';

import { CrearHoraPage } from './crear-hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearHoraPageRoutingModule
  ],
  declarations: [CrearHoraPage]
})
export class CrearHoraPageModule {}
