import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBiblioPageRoutingModule } from './add-biblio-routing.module';

import { AddBiblioPage } from './add-biblio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBiblioPageRoutingModule
  ],
  declarations: [AddBiblioPage]
})
export class AddBiblioPageModule {}
