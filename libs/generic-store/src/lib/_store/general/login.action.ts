import { Action } from '@ngrx/store';
import { User } from '@chm-core/_interfaces/user.interface';

export const LOGIN = '[login] Start';
export const LOGIN_SUCCESS = '[login] Complete';
export const LOGOUT = '[logout] Complete';
export const SELECT_OPERATOR = '[login] Napims select operator';
export const SELECT_DISPLAY = '[login] Select display';
export const GET_USER_PERMISSION = '[login] Get user permissions';
export const GET_USER_PERMISSION_SUCCESS =
  '[login] Get user permissions success';

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload = '') {}
}

export class LogOutAction implements Action {
  readonly type = LOGOUT;
  constructor(public payload: User) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class SelectOperatorAction implements Action {
  readonly type = SELECT_OPERATOR;
  constructor(public payload: string) {}
}

export class SelectDisplay implements Action {
  readonly type = SELECT_DISPLAY;
  constructor(public payload: string) {}
}

export class GetUserPemissionAction implements Action {
  readonly type = GET_USER_PERMISSION;
  constructor(public payload: User) {}
}

export type Actions =
  | LoginAction
  | LogOutAction
  | LoginSuccessAction
  | SelectOperatorAction
  | SelectDisplay
  | GetUserPemissionAction;
