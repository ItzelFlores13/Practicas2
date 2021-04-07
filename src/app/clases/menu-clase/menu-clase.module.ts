import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuClasePageRoutingModule } from './menu-clase-routing.module';

import { MenuClasePage } from './menu-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuClasePageRoutingModule
  ],
  declarations: [MenuClasePage]
})
export class MenuClasePageModule {}
