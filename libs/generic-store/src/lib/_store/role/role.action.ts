import { Action } from '@ngrx/store';
import { Role } from './role.interface';

export const SEARCH = '[Role] Search';
export const SEARCH_COMPLETE = '[Role] Search Complete';
export const ADD_ITEM = '[Role] ADD_ITEM';
export const UPDATE_ITEM = '[Role] UPDATE_ITEM';
export const DELETE_ITEM = '[Role] DELETE_ITEM';
export const ADD_UPDATE_ITEM_SUCCESS = '[Role] ADD_UPDATE_ITEM_SUCCESS';
export const DELETE_ITEM_SUCCESS = '[Role] DELETE_ITEM_SUCCESS';
export const LOAD_ITEM = '[Role] Load item';
export const LOAD_ITEMS = '[Role] Load items';
export const LOAD_ITEMS_SUCCESS = '[Role] LOAD_ITEMS_SUCCESS';
export const LOAD_ITEM_SUCCESS = '[Role] LOAD_ITEM_SUCCESS';
export const SELECT = '[Role] Select Item';

export class SearchAction implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;
  constructor(public payload: Role[]) {}
}

export class AddItemAction implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: Role) {}
}

export class UpdateItemAction implements Action {
  readonly type = UPDATE_ITEM;
  constructor(public payload: Role) {}
}

export class DeleteItemAction implements Action {
  readonly type = DELETE_ITEM;
  constructor(public payload: string) {}
}

export class AddUpdateItemSuccessAction implements Action {
  readonly type = ADD_UPDATE_ITEM_SUCCESS;
  constructor(public payload: Role) {}
}

export class LoadItemAction implements Action {
  readonly type = LOAD_ITEM;
  constructor(public payload: string) {}
}

export class DeleteItemSuccessAction implements Action {
  readonly type = DELETE_ITEM_SUCCESS;
  constructor(public payload: string) {}
}

export class LoadItemsAction implements Action {
  readonly type = LOAD_ITEMS;
  constructor(public payload: string) {}
}

export class LoadItemsSuccessAction implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadItemSuccessAction implements Action {
  readonly type = LOAD_ITEM_SUCCESS;
  constructor(public payload: any) {}
}

export class SelectItemAction implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export type Actions =
  | SearchAction
  | SearchCompleteAction
  | LoadItemAction
  | LoadItemsAction
  | LoadItemsSuccessAction
  | DeleteItemAction
  | AddItemAction
  | AddUpdateItemSuccessAction
  | DeleteItemSuccessAction
  | UpdateItemAction
  | LoadItemSuccessAction
  | SelectItemAction;
