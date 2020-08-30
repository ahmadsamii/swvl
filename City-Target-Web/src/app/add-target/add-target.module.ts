import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTargetPageRoutingModule } from './add-target-routing.module';

import { AddTargetPage } from './add-target.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTargetPageRoutingModule
  ],
  declarations: [AddTargetPage]
})
export class AddTargetPageModule {}
