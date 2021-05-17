import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AggregatePageRoutingModule } from './aggregate-routing.module';

import { AggregatePage } from './aggregate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AggregatePageRoutingModule
  ],
  declarations: [AggregatePage]
})
export class AggregatePageModule {}
