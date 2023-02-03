import { Action } from '@ngrx/store';
import { Subrole } from './subrole.interface';

export const SEARCH = '[Subrole] Search';
export const SEARCH_COMPLETE = '[Subrole] Search Complete';
export const ADD_ITEM = '[Subrole] ADD_ITEM';
export const UPDATE_ITEM = '[Subrole] UPDATE_ITEM';
export const ADD_UPDATE_ITEM_SUCCESS = '[Subrole] ADD_UPDATE_ITEM_SUCCESS';
export const LOAD_ITEM = '[Subrole] Load item';
export const LOAD_ITEMS = '[Subrole] Load items';
export const LOAD_ITEMS_SUCCESS = '[Subrole] LOAD_ITEMS_SUCCESS';
export const LOAD_ITEM_SUCCESS = '[Subrole] LOAD_ITEM_SUCCESS';
export const SELECT = '[Subrole] SELECT_ITEM';
export const SELECTED = '[Subrole] SELECTED_ITEM';
export const SUBROLE_CANCELLED = '[Subrole] SUBROLE_CANCELLED';

export const SEARCH_SUBROLE = '[Subrole] SEARCH_SUBROLE';
export const SEARCH_SUBROLE_SUCCESS = '[Subrole] SEARCH_SUBROLE_SUCCESS';

export const SUBROLE_CATEGORY = '[Subrole] SUBROLE_CATEGORY';
export const SUBROLE_CATEGORY_SUCCESS = '[Subrole] SUBROLE_CATEGORY_SUCCESS';

export class SearchAction implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;
  constructor(public payload: Subrole[]) {}
}

export class AddItemAction implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: Subrole) {}
}

export class UpdateItemAction implements Action {
  readonly type = UPDATE_ITEM;
  constructor(public payload: any) {}
}

export class AddUpdateItemSuccessAction implements Action {
  readonly type = ADD_UPDATE_ITEM_SUCCESS;
  constructor(public payload: Subrole) {}
}

export class LoadItemAction implements Action {
  readonly type = LOAD_ITEM;
  constructor(public payload: string) {}
}

export class LoadItemSuccessAction implements Action {
  readonly type = LOAD_ITEM_SUCCESS;
  constructor(public payload: Subrole) {}
}

export class LoadItemsAction implements Action {
  readonly type = LOAD_ITEMS;
  constructor(public payload: '') {}
}

export class LoadItemsSuccessAction implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;

  constructor(public payload: Subrole[]) {}
}

export class SubroleCancelled implements Action {
  readonly type = SUBROLE_CANCELLED;
}

export class SelectAction implements Action {
  readonly type = SELECT;
  constructor(public payload: string) {}
}

export class SelectedAction implements Action {
  readonly type = SELECTED;
  constructor(public payload: Subrole) {}
}

export class SearchSubroleAction implements Action {
  readonly type = SEARCH_SUBROLE;
  constructor(public query: string) {}
}

export class SearchSubroleSuccessAction implements Action {
  readonly type = SEARCH_SUBROLE_SUCCESS;

  constructor(public payload: any) {}
}

export class SubroleCategoryAction implements Action {
  readonly type = SUBROLE_CATEGORY;
  constructor(public payload: any) {}
}

export class SubroleCategorySuccessAction implements Action {
  readonly type = SUBROLE_CATEGORY_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions =
  | SearchAction
  | SearchCompleteAction
  | LoadItemAction
  | LoadItemsAction
  | LoadItemsSuccessAction
  | LoadItemSuccessAction
  | AddItemAction
  | AddUpdateItemSuccessAction
  | UpdateItemAction
  | SelectAction
  | SelectedAction
  | SubroleCancelled
  | SearchSubroleAction
  | SearchSubroleSuccessAction
  | SubroleCategoryAction
  | SubroleCategorySuccessAction;
