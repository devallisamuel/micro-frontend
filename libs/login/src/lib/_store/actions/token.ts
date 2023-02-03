import { Action } from '@ngrx/store';
import { UserModel } from '../models';


export const SET_TOKEN = '[Token] Setting';
export const SET_URL = '[Token] Set Url';
export const RESET_URL = '[Token] Reset Url';
export const INIT_TOKEN = '[Token] Initialisation';
export const GET_URL = '[Token] Return Url';
export const GET_URL_SUCCESS = '[Token] Get Url Success';

export class SetTokenAction implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: UserModel.Token) { }
}

export class SetUrlAction implements Action {
  readonly type = SET_URL;
  constructor(public payload: string) { }
}

export class ResetUrlAction implements Action {
  readonly type = RESET_URL;
}

export class InitTokenAction implements Action {
  readonly type = INIT_TOKEN;
}

export class GetUrlAction implements Action {
  readonly type = GET_URL;
  constructor() { }
}

export class GetUrlSuccessAction implements Action {
  readonly type = GET_URL_SUCCESS;
  constructor(public payload: string) { }
}

export type AllActions =
  SetTokenAction | SetUrlAction |
  GetUrlAction | GetUrlAction | GetUrlSuccessAction |
  ResetUrlAction | InitTokenAction;
