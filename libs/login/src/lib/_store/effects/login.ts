
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginActions } from '../actions';
import { LoginService } from '../services/login.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { ErrorActions, NotificationActions } from '../../../general/actions';
import { from } from 'rxjs';

@Injectable()
export class LoginEffects {

  // @Effect()
  // LoginSuccess$ = this.actions$.pipe(
  //   ofType<LoginActions.GetUserPemissionAction>(LoginActions.GET_USER_PERMISSION),
  //   mergeMap(action => this.loginService.getUserPermissions(action.payload.id).pipe(
  //     mergeMap(response => {
  //       return from([new LoginActions.GetUserPemissionSuccessAction(response),
  //       new NotificationActions.SetLoaded('Permissions Loaded successfully')]);
  //     }),
  //     catchError(err => {
  //       return from([new ErrorActions.ErrorAddAction(err),
  //       new NotificationActions.SetLoadingError(err.message)]);
  //     }))));

  constructor(
    private actions$: Actions,

    private loginService: LoginService,
    // private employeeService: EmployeeService

  ) { }

}



