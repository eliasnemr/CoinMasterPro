import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCoinsPage } from './view-coins.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCoinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCoinsPageRoutingModule {}
