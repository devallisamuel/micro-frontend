import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  getRoleIds,
  getRoleEntities,
  getPermissions,
  getSelectedRoleId,
  getSelectedRole,
  getSecurables,
  getSecurableIds,
  getSecurablesEntities,
} from './role.reducer';
// import { IOption} from '../../../..';
import { initRole } from '.';
import { UserMgtState } from '..';

const getState = createFeatureSelector('UserMgt');
export const getRoleState = createSelector(
  getState,
  (state: UserMgtState) => state.role
);
export const RoleEntities = createSelector(getRoleState, getRoleEntities);
export const RoleIds = createSelector(getRoleState, getRoleIds);
export const getRoleCollection = createSelector(
  RoleEntities,
  RoleIds,
  (entities, ids) => {
    if (ids.length === 0) {
      return [initRole];
    }
    return ids.map((id) => entities[id]);
  }
);
export const selectedRoleId = createSelector(getRoleState, getSelectedRoleId);
export const selectedRole = createSelector(getRoleState, getSelectedRole);
export const permissions = createSelector(getRoleState, getPermissions);
export const securables = createSelector(getRoleState, getSecurables);
export const SecurableEntities = createSelector(
  getRoleState,
  getSecurablesEntities
);
export const SecurableIds = createSelector(getRoleState, getSecurableIds);
export const getSecurableCollection = createSelector(
  SecurableEntities,
  SecurableIds,
  (entities, ids) => {
    return ids.map((id) => entities[id]);
  }
);
// export const getSecurableLookup = createSelector(SecurableEntities, SecurableIds,
//     (entities, ids) => {
//         return ids.map(id => {
//             const ret: IOption = { id: entities[id].id, name: entities[id].name };
//             return ret;
//         });
//     });
