import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '**', 
    redirectTo: '/tabs/tab2'
  },
  {
    path: 'aggregate',
    loadChildren: () => import('./modals/aggregate/aggregate.module').then( m => m.AggregatePageModule)
  },
  {
    path: 'send',
    loadChildren: () => import('./modals/send/send.module').then( m => m.SendPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
