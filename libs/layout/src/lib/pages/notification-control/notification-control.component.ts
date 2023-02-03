import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { GeneralState } from '@hmo-core/_store';
import { getNotificationState } from '@hmo-core/_store/general';

import { StoreStatus } from '../../../utilities/util';
import { MySnackbarService } from '../../../_services/my-snackbar.service';

@Component({
  selector: 'app-notification-control',
  templateUrl: 'notification-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationControlComponent implements OnInit {
  constructor(
    private store: Store<GeneralState>,
    private snackBar: MySnackbarService,
    public cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.select(getNotificationState).subscribe((s) => this.create(s));
  }

  create(status: StoreStatus) {
    if (status.loaded === true) {
    }

    if (status.saved === true) {
      this.snackBar.openSnackBar(status.message, 'x', 'SnackSuccess');
    }

    if (status.loadingError === true) {
      this.snackBar.openSnackBar(status.message, 'x', 'SnackError');
    }

    if (status.savingError === true) {
      this.snackBar.openSnackBar(status.message, 'x', 'SnackError');
    }

    if (status.deleted === true) {
      this.snackBar.openSnackBar(status.message, 'X', 'SnackSuccess');
    }

    if (status.unauthorised === true) {
      this.snackBar.openSnackBar(status.message, 'x', 'SnackError');
    }
  }
}
