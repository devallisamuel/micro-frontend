
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserMgtState } from '..';
import {
    getUserIds, getUserEntities, getSelectedUserId
} from './user.reducer';
// import { IOption } from '../../../..';

const getState = createFeatureSelector('UserMgt');
export const getUserState = createSelector(getState, (state: UserMgtState) => state.user);
export const UserEntities = createSelector(getUserState, getUserEntities);
export const UserIds = createSelector(getUserState, getUserIds);
export const getUserCollection = createSelector(UserEntities, UserIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const selectedUserId = createSelector(getUserState, getSelectedUserId);
// export const getUserLookup = createSelector(UserEntities, UserIds,
//     (entities, ids) => {
//         return ids.map(id => {
//             const ret: IOption = { id: entities[id].id, name: entities[id].name };
//             return ret;
//         });
//     });
