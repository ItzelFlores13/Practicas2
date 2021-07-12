import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModOpAPageRoutingModule } from './mod-op-a-routing.module';

import { ModOpAPage } from './mod-op-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModOpAPageRoutingModule
  ],
  declarations: [ModOpAPage]
})
export class ModOpAPageModule {}
