import { Injectable, OnDestroy } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LayoutService } from './layout.service';
import * as AllActions from './layout.action';
import { Observable, from } from 'rxjs';
import {
  mergeMap,
  catchError,
  withLatestFrom,
  takeWhile,
} from 'rxjs/operators';
import { State } from '@chm-core/_store/token';
import { dispacthedActions, loadingActions } from '../general';
import { NotificationActions } from '../notification';

@Injectable()
export class LayoutEffects implements OnDestroy {
  @Effect() LoadLayouts$: Observable<Action> = this.actions$.pipe(
    ofType<AllActions.LoadMenuAction>(AllActions.LOAD_MENU),
    withLatestFrom(
      this.store.select(dispacthedActions),
      this.store.select(loadingActions)
    ),
    takeWhile(
      ([action, dispathed, loading]) =>
        dispathed.indexOf('Menus') === -1 && loading.indexOf('Menus') === -1
    ),
    mergeMap(() =>
      this.LayoutService.getMenu().pipe(
        mergeMap((response) => {
          return from([
            new AllActions.LoadMenuActionSuccess(response),
            new NotificationActions.SetLoaded('Menus'),
          ]);
        }),
        catchError((err) => {
          return from([new NotificationActions.SetLoadingError('Menus')]);
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private LayoutService: LayoutService,
    private store: Store<State>
  ) {}
  ngOnDestroy() {}
}
