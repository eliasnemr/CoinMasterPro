import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggregatePage } from './aggregate.page';

const routes: Routes = [
  {
    path: '',
    component: AggregatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AggregatePageRoutingModule {}
