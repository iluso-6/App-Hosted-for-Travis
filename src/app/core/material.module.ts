import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatNativeDateModule, MatDatepickerModule,
     MatSelectModule, MatExpansionModule, MatCardModule, MatButtonModule,
     MatProgressSpinnerModule, MatGridListModule, MatProgressBarModule,
     MatSnackBarModule, MatDialogModule, MatIcon, MatIconBase, MatIconModule
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
  MatGridListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatIconModule
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
  MatGridListModule,
  MatSnackBarModule,
  MatDialogModule,
  MatIconModule
   ],
})
export class CustomMaterialModule { }
