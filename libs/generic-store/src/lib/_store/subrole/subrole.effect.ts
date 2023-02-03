import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OnDestroy } from '@angular/core';

import { SubroleService } from './subrole.service';

import * as SubroleActions from './subrole.action';
import { Observable, of, from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { SubroleCancelled } from './subrole.action';
import { NotificationActions } from '../notification';
import { GenericStoreState } from '..';

@Injectable()
export class SubroleEffects implements OnDestroy {
  LoadSubroles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SubroleActions.LOAD_ITEMS),
      mergeMap(() =>
        this.subroleService.getSubroles().pipe(
          mergeMap((subroles) => {
            return from([
              new SubroleActions.LoadItemsSuccessAction(subroles),
              new NotificationActions.SetLoaded(
                'Subroles Info Loaded successfully'
              ),
            ]);
          }),
          catchError((err) => {
            this.store.dispatch(new SubroleCancelled());
            return from([new NotificationActions.SetLoadingError(err.message)]);
          })
        )
      )
    )
  );

  LoadSubrole$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<SubroleActions.LoadItemAction>(SubroleActions.LOAD_ITEM),
      mergeMap((action) =>
        this.subroleService.getSubrole(action.payload).pipe(
          mergeMap((subroles) => {
            return from([
              new SubroleActions.LoadItemSuccessAction(subroles),
              new NotificationActions.SetLoaded(
                'PersonInfo Items Loaded Sucessfully'
              ),
            ]);
          }),
          catchError((err) => {
            this.store.dispatch(new SubroleCancelled());
            return from([new NotificationActions.SetLoadingError(err.message)]);
          })
        )
      )
    )
  );

  AddUpdateItemSucces$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SubroleActions.ADD_UPDATE_ITEM_SUCCESS),
      mergeMap(() => {
        return from([new NotificationActions.SetSaved('Subrole(s) saved')]);
      })
    )
  );

  addSubroles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<SubroleActions.AddItemAction>(SubroleActions.ADD_ITEM),
      mergeMap((action) =>
        this.subroleService.addSubrole(action.payload).pipe(
          map(
            (subroles) =>
              new SubroleActions.AddUpdateItemSuccessAction(subroles)
          ),
          catchError((err) => {
            this.store.dispatch(new SubroleCancelled());
            return from([new NotificationActions.SetSavingError(err.message)]);
          })
        )
      )
    )
  );

  updateSubrole$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<SubroleActions.UpdateItemAction>(SubroleActions.UPDATE_ITEM),
      mergeMap((action) =>
        this.subroleService.updateSubrole(action.payload).pipe(
          map(
            (subroles) =>
              new SubroleActions.AddUpdateItemSuccessAction(subroles)
          ),
          catchError((err) => {
            this.store.dispatch(new SubroleCancelled());
            return from([new NotificationActions.SetSavingError(err.message)]);
          })
        )
      )
    )
  );

  SearchSubrole$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<SubroleActions.SearchSubroleAction>(SubroleActions.SEARCH_SUBROLE),
      mergeMap((action) =>
        this.subroleService.searchSubrole(action.query).pipe(
          mergeMap((subroles) => {
            return from([
              new SubroleActions.SearchSubroleSuccessAction(subroles),
            ]);
          }),
          catchError((err) => {
            this.store.dispatch(new SubroleCancelled());
            return from([new NotificationActions.SetLoadingError(err.error)]);
          })
        )
      )
    )
  );

  SubroleCategory$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<SubroleActions.SubroleCategoryAction>(
        SubroleActions.SUBROLE_CATEGORY
      ),
      mergeMap((action) =>
        this.subroleService.subroleCategory().pipe(
          mergeMap((subroleCat) => {
            return from([
              new SubroleActions.SubroleCategorySuccessAction(subroleCat),
            ]);
          }),
          catchError((err) => {
            this.store.dispatch(new SubroleCancelled());
            return from([new NotificationActions.SetLoadingError(err.error)]);
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<GenericStoreState>,
    private subroleService: SubroleService
  ) {}

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
