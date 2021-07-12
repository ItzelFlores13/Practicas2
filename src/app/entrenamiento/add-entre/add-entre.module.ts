import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEntrePageRoutingModule } from './add-entre-routing.module';

import { AddEntrePage } from './add-entre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEntrePageRoutingModule
  ],
  declarations: [AddEntrePage]
})
export class AddEntrePageModule {}
