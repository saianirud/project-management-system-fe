import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogContainerService {

  constructor(private dialog: MatDialog) { }

  openDialog(component, data?, height = "80%", width = '50%') {
    const dialogRef = this.dialog.open(component, {
      data: data,
      width: width,
      height: height
    });

    return dialogRef;
  }
}
