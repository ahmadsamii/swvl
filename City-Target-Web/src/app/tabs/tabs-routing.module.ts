import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cities',
        children: [
          {
            path: '',
            loadChildren: () => import('../cities/cities.module').then(m => m.CitiesPageModule)
          },
          {
            path: 'add',
            loadChildren: () => import('../add-target/add-target.module').then(m => m.AddTargetPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/cities',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/cities',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
