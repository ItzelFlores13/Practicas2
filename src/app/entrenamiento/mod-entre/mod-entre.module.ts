import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModEntrePageRoutingModule } from './mod-entre-routing.module';

import { ModEntrePage } from './mod-entre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModEntrePageRoutingModule
  ],
  declarations: [ModEntrePage]
})
export class ModEntrePageModule {}
