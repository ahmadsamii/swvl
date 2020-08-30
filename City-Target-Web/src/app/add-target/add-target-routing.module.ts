import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTargetPage } from './add-target.page';

const routes: Routes = [
  {
    path: '',
    component: AddTargetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTargetPageRoutingModule {}
