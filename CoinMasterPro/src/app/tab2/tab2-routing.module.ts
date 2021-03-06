import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    pathMatch: 'full',
  },
  {
    path: 'view-coins/:tokenId',
    loadChildren: () => import('./view-coins/view-coins.module').then(m => m.ViewCoinsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
