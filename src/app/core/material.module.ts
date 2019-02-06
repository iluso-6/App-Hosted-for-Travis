import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatNativeDateModule, MatDatepickerModule,
     MatSelectModule, MatExpansionModule, MatCardModule, MatButtonModule,
     MatProgressSpinnerModule, MatGridListModule, MatProgressBarModule,
     MatSnackBarModule, MatDialogModule, MatIcon, MatIconBase, MatIconModule, MatTabsModule
} from '@angular/material';
import { MdcListModule, MdcIconModule, MdcCheckboxModule, MdcTextFieldModule, MdcChipsModule, MdcElevationModule } from '@angular-mdc/web';

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
  MatIconModule,
  MatExpansionModule,
  MdcListModule,
  MdcIconModule,
  MdcCheckboxModule,
  MdcTextFieldModule,
  MdcChipsModule,
  MdcElevationModule,
  MatTabsModule,
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
  MatIconModule,
  MatExpansionModule,
  MdcListModule,
  MdcIconModule,
  MdcCheckboxModule,
  MdcTextFieldModule,
  MdcChipsModule,
  MdcElevationModule,
  MatTabsModule,
   ],

})
export class CustomMaterialModule { }
