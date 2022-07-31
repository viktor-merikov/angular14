import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum NOTIFICATION_TYPE {
  SUCCESS = 'success',
  FAIL = 'fail',
  WARNING = 'warning',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {
  }

  notify(type: NOTIFICATION_TYPE, message: string, buttonName: string = 'X'): void {
    this._snackBar.open(message, buttonName, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: type
    })
  }
}
