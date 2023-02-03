import { Action } from '@ngrx/store';
import { User } from './user.interface';

export const SEARCH = '[User] Search';
export const SEARCH_COMPLETE = '[User] Search Complete';
export const ADD_ITEM = '[User] ADD_ITEM';
export const UPDATE_ITEM = '[User] UPDATE_ITEM';
export const DELETE_ITEM = '[User] DELETE_ITEM';
export const ADD_UPDATE_ITEM_SUCCESS = '[User] ADD_UPDATE_ITEM_SUCCESS';
export const DELETE_ITEM_SUCCESS = '[User] DELETE_ITEM_SUCCESS';
export const LOAD_ITEM = '[User] Load item';
export const LOAD_ITEMS = '[User] Load items';
export const LOAD_ITEMS_SUCCESS = '[User] LOAD_ITEMS_SUCCESS';
export const LOAD_ITEM_SUCCESS = '[User] LOAD_ITEM_SUCCESS';
export const SELECT = '[User] Select Item';
export const USERCHANGE = '[User] Username';
export const USERCHANGE_SUCCESS = '[User] Username Complete';
export const PASSWORDCHANGE = '[Password] Password';
export const PASSWORDCHANGE_SUCCESS = '[User] password Complete';

export class SearchAction implements Action {
    readonly type = SEARCH;
    constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
    readonly type = SEARCH_COMPLETE;
    constructor(public payload: User[]) { }
}

export class AddItemAction implements Action {
    readonly type = ADD_ITEM;
    constructor(public payload: User) { }
}

export class UpdateItemAction implements Action {
    readonly type = UPDATE_ITEM;
    constructor(public payload: User) { }
}

export class DeleteItemAction implements Action {
    readonly type = DELETE_ITEM;
    constructor(public payload: string) { }
}

export class AddUpdateItemSuccessAction implements Action {
    readonly type = ADD_UPDATE_ITEM_SUCCESS;
    constructor(public payload: User) { }
}

export class LoadItemAction implements Action {
    readonly type = LOAD_ITEM;
    constructor(public payload: string) { }
}

export class DeleteItemSuccessAction implements Action {
    readonly type = DELETE_ITEM_SUCCESS;
    constructor(public payload: string) { }
}

export class LoadItemsAction implements Action {
    readonly type = LOAD_ITEMS;
    constructor(public payload: string) { }
}

export class LoadItemsSuccessAction implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;
    constructor(public payload: User[]) { }
}

export class LoadItemSuccessAction implements Action {
    readonly type = LOAD_ITEM_SUCCESS;
    constructor(public payload: any) { }
}

export class SelectItemAction implements Action {
    readonly type = SELECT;
    constructor(public payload: string) { }
}
export class UserChange implements Action {
    readonly type = USERCHANGE;
    constructor(public payload: User) { }
}
export class UserChangeSuccessAction implements Action {
    readonly type = USERCHANGE_SUCCESS;
    constructor(public payload: any) { }
}
export class PasswordChange implements Action {
    readonly type = PASSWORDCHANGE;
    constructor(public payload: any) { }
}
export class PasswordChangeSuccessAction implements Action {
    readonly type = PASSWORDCHANGE_SUCCESS;
    constructor(public payload: any) { }
}

export type Actions
    = SearchAction
    | SearchCompleteAction | LoadItemAction | LoadItemsAction
    | LoadItemsSuccessAction | DeleteItemAction | AddItemAction
    | AddUpdateItemSuccessAction | DeleteItemSuccessAction | UpdateItemAction
    | LoadItemSuccessAction | SelectItemAction
    | UserChange | UserChangeSuccessAction | PasswordChange | PasswordChangeSuccessAction;
