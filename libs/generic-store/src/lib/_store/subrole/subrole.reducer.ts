import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AllActions from './subrole.action';
import { Subrole } from './subrole.interface';

import { initSubrole } from './subrole.model';

import * as _ from 'lodash';

export interface SubroleState extends EntityState<Subrole> {
  lastUpdate: Date;
  selectedId: string | null;
  selectedSubrole: Subrole;
  companySubroles: any;
  subroleLoading: boolean;
  searchedSubrole: any;
  subroleCategoryLoading: boolean;
  subroleCategory: any;
}
export const subroleAdapter: EntityAdapter<Subrole> =
  createEntityAdapter<Subrole>();

export const initSubroleState: SubroleState = subroleAdapter.getInitialState({
  lastUpdate: new Date(),
  selectedId: null,
  selectedSubrole: null,
  companySubroles: null,
  subroleLoading: false,
  searchedSubrole: null,
  subroleCategoryLoading: false,
  subroleCategory: null,
});

export function SubroleReducer(
  state: SubroleState = initSubroleState,
  action: AllActions.Actions
) {
  switch (action.type) {
    case AllActions.ADD_ITEM:
    case AllActions.UPDATE_ITEM:
    case AllActions.LOAD_ITEM:
    case AllActions.LOAD_ITEMS:
    case AllActions.SEARCH_SUBROLE:
      return { ...state, subroleLoading: true };

    case AllActions.SUBROLE_CATEGORY:
      return { ...state, subroleCategoryLoading: true };

    case AllActions.SUBROLE_CANCELLED:
      return { ...state, subroleLoading: false };

    case AllActions.ADD_UPDATE_ITEM_SUCCESS:
      if (action.payload === null) {
        return { ...state, subroleLoading: false };
      }
      if (state.entities[action.payload.id]) {
        return subroleAdapter.updateOne(
          { id: action.payload.id, changes: action.payload },
          _.assign(
            {},
            { ...state, subroleLoading: false },
            {
              lastUpdate: new Date(),
              selectedId: action.payload.id,
              selectedSubrole: action.payload,
            }
          )
        );
      } else {
        return subroleAdapter.addOne(
          action.payload,
          _.assign(
            {},
            { ...state, subroleLoading: false },
            {
              lastUpdate: new Date(),
              selectedId: action.payload.id,
              selectedSubrole: action.payload,
            }
          )
        );
      }
    case AllActions.LOAD_ITEM_SUCCESS:
      return subroleAdapter.addMany(
        action.payload ? [action.payload] : [initSubrole],
        _.assign(
          {},
          { ...state, subroleLoading: false },
          {
            lastUpdate: new Date(),
            selectedId: action.payload ? action.payload.id : null,
            selectedSubrole: action.payload ? action.payload : initSubrole,
          }
        )
      );

    case AllActions.LOAD_ITEMS_SUCCESS:
      if (action.payload === null) {
        return { ...state, subroleLoading: false };
      }
      return subroleAdapter.addMany(
        [...action.payload],
        _.assign(
          {},
          { ...state, subroleLoading: false },
          { lastUpdate: new Date() }
        )
      );
    case AllActions.SELECT:
      return _.assign({}, state, { selectedId: action.payload });

    case AllActions.SEARCH_SUBROLE_SUCCESS:
      if (action.payload === null) {
        return {
          ...state,
          subroleLoading: false,
          searchedSubrole: action.payload,
        };
      }
      return subroleAdapter.addMany(
        [...action.payload],
        _.assign(
          {},
          { ...state, subroleLoading: false },
          {
            lastUpdate: new Date(),
            searchedSubrole: action.payload,
          }
        )
      );

    case AllActions.SUBROLE_CATEGORY_SUCCESS:
      if (action.payload === null) {
        return { ...state, subroleCategoryLoading: false };
      }
      return subroleAdapter.addMany(
        [...action.payload],
        _.assign(
          {},
          { ...state, subroleCategoryLoading: false },
          {
            lastUpdate: new Date(),
            subroleCategory: action.payload,
          }
        )
      );

    default:
      return state;
  }
}

export const getSubroleSelectedId = (state: SubroleState) => state.selectedId;
