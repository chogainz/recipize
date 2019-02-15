import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  private _dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this._dialogRef = dialogRef;
  }

  ngOnInit() {
  }


  closeDialog(saveLocation?: string): void {
    this._dialogRef.close({
      saveLocation: saveLocation
    });
  }

}
