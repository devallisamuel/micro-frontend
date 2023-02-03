import { Injectable, OnDestroy } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoleService } from './role.service';
import * as AllActions from './role.action';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { NotificationActions } from '../notification';

@Injectable()
export class RoleEffects implements OnDestroy {
  LoadRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AllActions.LoadItemsAction>(AllActions.LOAD_ITEMS),
      mergeMap(() =>
        this.RoleService.getRoles().pipe(
          mergeMap((response) => {
            return from([
              new AllActions.LoadItemsSuccessAction(response),
              new NotificationActions.SetLoaded(' Loaded successfully'),
            ]);
          }),
          catchError((err) => {
            return from([
              //
              new NotificationActions.SetLoadingError(err.error),
            ]);
          })
        )
      )
    )
  );

  AddUpdateItemSucces$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AllActions.AddUpdateItemSuccessAction>(
        AllActions.ADD_UPDATE_ITEM_SUCCESS
      ),
      map(() => new NotificationActions.SetSaved(' saved successfully'))
    )
  );
  addRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AllActions.AddItemAction>(AllActions.ADD_ITEM),
      mergeMap((action) =>
        this.RoleService.addRole(action.payload).pipe(
          map(
            (response) => new AllActions.AddUpdateItemSuccessAction(response)
          ),
          catchError((err) => {
            return from([
              //
              new NotificationActions.SetSavingError(err.error),
            ]);
          })
        )
      )
    )
  );

  updateRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AllActions.UpdateItemAction>(AllActions.UPDATE_ITEM),
      mergeMap((action) =>
        this.RoleService.updateRole(action.payload).pipe(
          map(
            (response) => new AllActions.AddUpdateItemSuccessAction(response)
          ),
          catchError((err) => {
            return from([
              //
              new NotificationActions.SetSavingError(err.error),
            ]);
          })
        )
      )
    )
  );

  delete$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<AllActions.DeleteItemAction>(AllActions.DELETE_ITEM),
      mergeMap((action) =>
        this.RoleService.deleteItem(action.payload).pipe(
          map((reponse) => new AllActions.DeleteItemSuccessAction(reponse)),
          catchError((err) => {
            return from([
              //
              new NotificationActions.SetSavingError(err.error),
            ]);
          })
        )
      )
    )
  );

  deleteSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllActions.DELETE_ITEM_SUCCESS),
      map(() => new NotificationActions.SetDeleted('Role deleted successfully'))
    )
  );

  constructor(private actions$: Actions, private RoleService: RoleService) {}
  ngOnDestroy() {}
}
