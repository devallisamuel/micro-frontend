import { normalize } from 'normalizr';

import * as _ from 'lodash';
import * as AllActions from './user.action';
import {
    arrayOfUser, UserEntity,
    UserSchema, initUser
} from './user.model';
import { createSelector } from '@ngrx/store';
export interface UserState {
    ids: string[];
    entities: UserEntity;
    lastUpdate: Date;
    selectedId: string | null;
}
const initialState: UserState = {
    ids: [],
    entities: {},
    lastUpdate: new Date(),
    selectedId: null
};

export function UserReducer(state: UserState = initialState,
    action: AllActions.Actions) {
    switch (action.type) {
        case AllActions.ADD_UPDATE_ITEM_SUCCESS:
            if (action.payload === null) {
                return state;
            }
            const updItems: any = normalize(action.payload, UserSchema);
            return _.assign({}, state, {
                ids: [...state.ids, ...updItems.result],
                entities: _.merge({}, state.entities, updItems.entities.User),
                lastUpdate: new Date(),
                selectedId: updItems.result
            });
        case AllActions.LOAD_ITEMS_SUCCESS:
            if (action.payload === null) {
                return state;
            }
            const items: any = normalize(action.payload, arrayOfUser);
            return _.assign({}, state, {
                ids: items.result,
                entities: _.merge({}, state.entities, items.entities.User),
                lastUpdate: new Date(),
                selectedId: state.selectedId
            });
        case AllActions.SELECT:
            return _.assign({}, state, { selectedId: action.payload });
        case AllActions.DELETE_ITEM_SUCCESS:
            if (action.payload === null) {
                return state;
            }
            return _.assign({}, state, {
                ids: state.ids.filter(id => {
                    return id !== state.selectedId;
                }),
                selectedId: null
            });
        default:
            return state;

    }
}
export const getUserEntities = (state: UserState) => state.entities;
export const getUserIds = (state: UserState) => state.ids;
export const getSelectedUserId = (state: UserState) => state.selectedId;

export const getSelectedUser =
createSelector(getUserEntities, getSelectedUserId, (entities, selectedId) => {
    if (selectedId === null) {
        return initUser;
    }
    return entities[selectedId];
});
