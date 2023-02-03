import { Injectable, OnDestroy } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import * as AllActions from './user.action';
import { Observable ,  of ,  from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ErrorActions, NotificationActions } from '../../../../general';

@Injectable()
export class UserEffects implements OnDestroy {
   LoadUsers$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.LoadItemsAction>(AllActions.LOAD_ITEMS),
    mergeMap(() => this.UserService.getUsers().pipe(
      mergeMap(response => {
        return from([new AllActions.LoadItemsSuccessAction(response),
        new NotificationActions.SetLoaded('Users Loaded successfully')]);
      }),
      catchError(err => {
        return from([new ErrorActions.ErrorAddAction(err),
        new NotificationActions.SetLoadingError(err.message)]);
      })))));
   AddUpdateItemSucces$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.AddUpdateItemSuccessAction>(AllActions.ADD_UPDATE_ITEM_SUCCESS),
    map(() => new NotificationActions.SetSaved('User saved successfully'))));
   addUsers$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.AddItemAction>(AllActions.ADD_ITEM),
    mergeMap(action => this.UserService.addUser(action.payload).pipe(
      map(response => new AllActions.AddUpdateItemSuccessAction(response)),
      catchError(err => {
        return from([new ErrorActions.ErrorAddAction(err),
        new NotificationActions.SetSavingError(err.message)]);
      })))));
   updateUsers$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.UpdateItemAction>(AllActions.UPDATE_ITEM),
    mergeMap(action => this.UserService.updateUser(action.payload).pipe(
      map(response => new AllActions.AddUpdateItemSuccessAction(response)),
      catchError(err => {
        return from([new ErrorActions.ErrorAddAction(err),
        new NotificationActions.SetSavingError(err.message)]);
      })))));

   delete$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.DeleteItemAction>(AllActions.DELETE_ITEM),
    mergeMap(action => this.UserService.deleteItem(action.payload).pipe(
      map(reponse => new AllActions.DeleteItemSuccessAction(reponse)),
      catchError(err => of(new ErrorActions.ErrorAddAction(err)))))));

   deleteSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AllActions.DELETE_ITEM_SUCCESS),
    map(() => new NotificationActions.SetDeleted('User deleted successfully'))));

   changePassword$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.PasswordChange>(AllActions.PASSWORDCHANGE),
    mergeMap(action => this.UserService.changePassword(action.payload).pipe(
      map(reponse => new AllActions.PasswordChangeSuccessAction(reponse)),
      catchError(err => of(new ErrorActions.ErrorAddAction(err)))))));

   changePasswordSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AllActions.PASSWORDCHANGE_SUCCESS),
    map(() => new NotificationActions.SetSaved('Password changed successfully'))));

     UserChange$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<AllActions.UserChange>(AllActions. USERCHANGE),
    mergeMap(action => this.UserService.changeUserName(action.payload).pipe(
      map(reponse => new AllActions.AddUpdateItemSuccessAction(reponse)),
      catchError(err => of(new ErrorActions.ErrorAddAction(err)))))));

   UserChangeSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AllActions.USERCHANGE_SUCCESS),
    map(() => new NotificationActions.SetSaved('User chansged successfully'))));
  constructor(
    private actions$: Actions,
    private UserService: UserService
  ) { }
  ngOnDestroy() { }
}
