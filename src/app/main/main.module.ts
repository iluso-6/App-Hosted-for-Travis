import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import {MatTableModule} from '@angular/material/table';
import {MdcElevationModule, MdcListModule, MdcIconModule, MdcCheckboxModule, MdcTextFieldModule, MdcChipsModule } from '@angular-mdc/web';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../core/material.module';
import { ChartsComponent } from '../case-details/charts/charts.component';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MdcListModule,
    MdcIconModule,
    MdcCheckboxModule,
    MdcTextFieldModule,
    MdcChipsModule,
    MdcElevationModule,
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
  providers: [ {provide: ChartsComponent, useClass: ChartsComponent}],
  declarations: [MainPage, ChartsComponent]
})
export class MainPageModule {

}
