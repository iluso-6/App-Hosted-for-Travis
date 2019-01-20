import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CaseDetailsPage } from './case-details.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import { CaseHelper } from './case_model/CaseHelper';
import { MatButtonModule } from '@angular/material';



const routes: Routes = [
  {
    path: '',
    component: CaseDetailsPage
  }
];


@NgModule({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [CaseHelper],
  declarations: [CaseDetailsPage]
})
export class CaseDetailsPageModule {}
