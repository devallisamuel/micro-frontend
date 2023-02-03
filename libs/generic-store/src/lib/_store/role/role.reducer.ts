// import { normalize } from 'normalizr';

import * as _ from 'lodash';
import * as AllActions from './role.action';
import {
  PermissionEnum,
  SecurableEnum,
  Permission,
  SecurableItem,
} from './role.interface';
import { RoleEntity, initRole, SecurableEntity } from './role.model';
import { createSelector } from '@ngrx/store';
export interface RoleState {
  ids: string[];
  entities: RoleEntity;
  lastUpdate: Date;
  selectedId: string | null;
  permissions: Permission[];
  securables: SecurableItem[];
  securableEntities: SecurableEntity;
  securableIds: string[];
}
const initialState: RoleState = {
  ids: [],
  entities: {},
  lastUpdate: new Date(),
  selectedId: null,
  permissions: Pemissions(),
  securables: Securables(),
  securableEntities: {},
  securableIds: [],
};

export function RoleReducer(
  state: RoleState = initialState,
  action: AllActions.Actions
) {
  switch (action.type) {
    case AllActions.ADD_UPDATE_ITEM_SUCCESS:
      if (action.payload === null) {
        return state;
      }
      // const updRole: any = normalize(action.payload, RoleSchema);
      // return _.assign({}, state, {
      //     ids: [...state.ids, ...updRole.result],
      //     entities: _.merge({}, state.entities, updRole.entities.Role),
      //     lastUpdate: new Date(),
      //     selectedId: updRole.result
      // });
      break;

    case AllActions.LOAD_ITEMS_SUCCESS:
      if (action.payload === null) {
        return state;
      }
      // const role: any = normalize(action.payload.roles, arrayOfRole);
      // const secItems: any = normalize(action.payload.securables, arrayOfSecurable);
      // return _.assign({}, state, {
      //     ids: role.result,
      //     entities: _.merge({}, state.entities, role.entities.Role),
      //     lastUpdate: new Date(),
      //     selectedId: state.selectedId,
      //     securableEntities:
      //         _.merge({}, state.securableEntities, secItems.entities.Securable),
      //     securableIds: secItems.result
      // }
      break;

    case AllActions.SELECT:
      return _.assign({}, state, { selectedId: action.payload });
    case AllActions.DELETE_ITEM_SUCCESS:
      if (action.payload === null) {
        return state;
      }
      return _.assign({}, state, {
        ids: state.ids.filter((id) => {
          return id !== state.selectedId;
        }),
        selectedId: null,
      });
    default:
      return state;
  }
}
export const getRoleEntities = (state: RoleState) => state.entities;
export const getRoleIds = (state: RoleState) => state.ids;
export const getSelectedRoleId = (state: RoleState) => state.selectedId;
export const getPermissions = (state: RoleState) => state.permissions;
export const getSecurables = (state: RoleState) => state.securables;
export const getSecurablesEntities = (state: RoleState) =>
  state.securableEntities;
export const getSecurableIds = (state: RoleState) => state.securableIds;

export const getSelectedRole = createSelector(
  getRoleEntities,
  getSelectedRoleId,
  (entities, selectedId) => {
    if (selectedId === null) {
      return initRole;
    }
    return entities[selectedId];
  }
);

function Pemissions() {
  const ret: Permission[] = [];
  for (const enumMember in PermissionEnum) {
    if (Object.prototype.hasOwnProperty.call(PermissionEnum, enumMember)) {
      const isValueProperty = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) {
        ret.push({
          permission: parseInt(enumMember, 10),
          name: PermissionEnum[enumMember],
        });
      }
    }
  }
  return ret;
}

function Securables() {
  const ret: SecurableItem[] = [];
  for (const enumMember in SecurableEnum) {
    if (Object.prototype.hasOwnProperty.call(SecurableEnum, enumMember)) {
      const isValueProperty = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) {
        ret.push({
          securable: parseInt(enumMember, 10),
          name: SecurableEnum[enumMember],
        });
      }
    }
  }
  return ret;
}
