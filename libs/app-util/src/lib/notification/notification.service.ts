import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from './notification-type';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  }


  passDataToSnackComponent(message: string, snackType?: NotificationType) {
    const _snackType = snackType !== undefined ? snackType : NotificationType.SUCCESS;
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { message: message, snackType: _snackType },
      panelClass: _snackType, // snackType,
    });
  }
}
