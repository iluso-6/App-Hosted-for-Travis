import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})

export class WarningDialogComponent {
  delete_button_clicked = false;

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
   ) {}

  deleteEpisode() {
    this.delete_button_clicked = true;
    console.log('deleteEpisode');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
