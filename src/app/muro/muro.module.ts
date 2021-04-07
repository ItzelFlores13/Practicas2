import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuroPageRoutingModule } from './muro-routing.module';

import { MuroPage } from './muro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuroPageRoutingModule
  ],
  declarations: [MuroPage]
})
export class MuroPageModule {}
