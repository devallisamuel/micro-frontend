import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OnboardingService } from '../../../_services';
import { HMOState } from '../../../_store';
import { appNotLoading } from '../../../_store/general';

@Component({
  selector: 'app-hmo-modal',
  template: `
    <mat-dialog-content style="max-height: 70vh;">
      <img
        src="assets/images/infusync-hmo-welcome.png"
        class="img-fluid"
        alt="Infusync HMO Welcome"
      />
      <h4>Welcome to Infusync HMO</h4>
      <p>Manage Companies, Enrollees, Plans, and Hospitals in one place</p>

      <ng-template #loading>
        <div class="spinner">
          <app-info-loader></app-info-loader>
        </div>
      </ng-template>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        type="submit"
        mat-raised-button
        color="primary"
        class="shaded-button"
        style="margin: 0 auto"
        [mat-dialog-close]
        *ngIf="appNotLoading$ | async; else loading"
        [disabled]="close"
      >
        Get Started
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./hmo-onboarding.component.scss'],
})
export class HmoDialogComponent {
  checkStatus: Subscription;
  close;
  appNotLoading$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private onboardingService: OnboardingService,
    private store: Store<HMOState>
  ) {
    this.checkStatus = this.onboardingService.closeModal.subscribe((result) => {
      this.close = result;
    });

    this.appNotLoading$ = this.store.select(appNotLoading);
  }
}
