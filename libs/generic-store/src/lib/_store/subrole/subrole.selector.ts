import { createSelector, createFeatureSelector } from '@ngrx/store';
import { initSubrole } from './subrole.model';
import { subroleAdapter } from './subrole.reducer';
import * as _ from 'lodash';
import { InfusyncStoreState } from '..';
import { Subrole } from './subrole.interface';

const getState = createFeatureSelector<InfusyncStoreState>('InfusyncStoreState');
export const getSubroleState = createSelector(
  getState,
  (state: InfusyncStoreState) => state.subrole
);
export const {
  selectIds: SubroleIds,
  selectEntities: SubroleEntities,
  selectAll: getSubroleCollection,
  selectTotal: subroleUnitCount,
} = subroleAdapter.getSelectors(getSubroleState);

export const selectedSubroleId = createSelector(
  getSubroleState,
  (state) => state.selectedSubrole
);
export const selectedSubrole = createSelector(
  SubroleEntities,
  selectedSubroleId,
  (entities, id) => {
    let ret: Subrole;
    if (id && entities) {
      ret = id;
    } else {
      ret = initSubrole;
    }
    return ret;
  }
);

export const selectSubrole = (subroleId: string) =>
  createSelector(
    getSubroleState,
    (allSubroles) => allSubroles.entities[subroleId]
  );

export const activeSubroles = createSelector(
  getSubroleCollection,
  (allSubroles) => {
    return allSubroles.filter((subrole) => subrole.status === 'Active');
  }
);
export const inactiveSubroles = createSelector(
  getSubroleCollection,
  (allSubroles) => {
    return allSubroles.filter((subrole) => subrole.status === 'Inactive');
  }
);

export const selectSubroleLoading = createSelector(
  getSubroleState,
  (subroleState) => subroleState.subroleLoading
);

export const getSearchedSubrole = createSelector(
  getSubroleState,
  (subroleState) => subroleState.searchedSubrole
);

export const getSubroleCategory = createSelector(
  getSubroleState,
  (subroleState) => subroleState.subroleCategory
);

export const selectSubroleCategoryLoading = createSelector(
  getSubroleState,
  (subroleState) => subroleState.subroleCategoryLoading
);
