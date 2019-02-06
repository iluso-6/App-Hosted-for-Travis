import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import {MatTableModule} from '@angular/material/table';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../core/material.module';

import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { ChartsComponent } from '../core/shared-modules/charts/charts.component';


@NgModule({
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    DxChartModule,
    DxSelectBoxModule,
    CustomMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPage
      }
    ])
  ],
 // providers: [ {provide: ChartsComponent, useClass: ChartsComponent}],
  declarations: [MainPage, ChartsComponent]
})
export class MainPageModule {

}
