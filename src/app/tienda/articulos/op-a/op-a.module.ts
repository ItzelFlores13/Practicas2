import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpAPageRoutingModule } from './op-a-routing.module';

import { OpAPage } from './op-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpAPageRoutingModule
  ],
  declarations: [OpAPage]
})
export class OpAPageModule {}
