import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatNativeDateModule, MatDatepickerModule,
     MatSelectModule, MatExpansionModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatGridListModule, MatProgressBarModule
} from '@angular/material';
@NgModule({
  imports: [
     MatProgressBarModule,
  CommonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatGridListModule
  ],
  exports: [
     MatProgressBarModule,
  CommonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatGridListModule
   ],
})
export class CustomMaterialModule { }
