import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModArticuloPageRoutingModule } from './mod-articulo-routing.module';

import { ModArticuloPage } from './mod-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModArticuloPageRoutingModule
  ],
  declarations: [ModArticuloPage]
})
export class ModArticuloPageModule {}
