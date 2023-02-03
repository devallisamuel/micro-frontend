import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { NotificationType } from '../notification-type';

@Component({
  selector: 'infusync-frontend-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  icon;
  style;
  title;
  constructor(
    public snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit() {
    switch (this.data.snackType) {
      case NotificationType.SUCCESS:
        this.style = 'snackdone';
        this.icon = 'done';
        this.title = 'Done';
        return 'done';
      case NotificationType.ERROR:
        this.style = 'snackerror';
        this.icon = 'error';
        this.title = 'Error';
        return 'error';
      case NotificationType.WARNING:
        this.style = 'snackwarn';
        this.icon = 'warning';
        this.title = 'Warning';
        return 'warning';
      case NotificationType.INFO:
        this.style = 'snackinfo';
        this.icon = 'info';
        this.title = 'Info';
        return 'info';
    }
  }
}
