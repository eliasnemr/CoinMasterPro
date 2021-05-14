import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCoinsPageRoutingModule } from './view-coins-routing.module';

import { ViewCoinsPage } from './view-coins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCoinsPageRoutingModule
  ],
  declarations: [ViewCoinsPage]
})
export class ViewCoinsPageModule {}
