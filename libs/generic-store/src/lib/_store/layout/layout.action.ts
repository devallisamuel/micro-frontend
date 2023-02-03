import { Action } from '@ngrx/store';
import { Tile, Section, MenuInput } from './layout.interface';

export const CHANGE_COLOUR = '[layout] Change Colour';
export const SET_TILE = '[Layout] Set Tile';
export const SET_SECTION = '[Layout] Set Section';
export const LOAD_MENU = '[Layout] Load menus';
export const LOAD_MENU_SUCCESS = '[Layout] Load menus success';

export class ChangeColourAction implements Action {
  readonly type = CHANGE_COLOUR;
  constructor(public payload: string) {}
}

export class SetTileAction implements Action {
  readonly type = SET_TILE;
  constructor(public payload: Tile) {}
}

export class LoadMenuActionSuccess implements Action {
  readonly type = LOAD_MENU_SUCCESS;
  constructor(public payload: MenuInput) {}
}

export class LoadMenuAction implements Action {
  readonly type = LOAD_MENU;
  constructor(public payload = '') {}
}

export class SetSectionAction implements Action {
  readonly type = SET_SECTION;
  constructor(public payload: Section) {}
}

export type Actions =
  | ChangeColourAction
  | SetTileAction
  | LoadMenuAction
  | LoadMenuActionSuccess
  | SetSectionAction;
