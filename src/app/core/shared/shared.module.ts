import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from 'src/app/case-details/charts/charts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChartsComponent
  ],
  exports: [
    ChartsComponent
  ]
})
export class SharedModule { }
