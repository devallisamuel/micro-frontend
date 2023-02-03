import { ActionReducerMap, combineReducers, MetaReducer } from '@ngrx/store';
import { AuthEffects, authReducer, AuthService, AuthState } from './auth';
import { RoleEffects, RoleReducer, RoleService, RoleState } from './role';
import { UserEffects, UserReducer, UserService, UserState } from './user';
import { LayoutState } from './layout';
import { SubroleEffects, SubroleReducer, SubroleService, SubroleState } from './subrole';
import { notificationReducer } from './notification';
import { StoreStatus } from '../utilities';

export * from './general';
export * from './auth';
export * from './role';
export * from './user';


const environment = false;

export interface GeneralState {
  notification: StoreStatus;
  layout: LayoutState;
}
export const generalReducer: ActionReducerMap<GeneralState> = {
  notification: notificationReducer,
  layout: LayoutReducer,
};

export interface GenericStoreState {
  auth: AuthState;
  general: GeneralState;
  role: RoleState;
  user: UserState;
  subrole: SubroleState;
  notification: StoreStatus
}

export const GenericStoreReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
  role: RoleReducer,
  user: UserReducer,
  subrole: SubroleReducer,
  notification: notificationReducer,
});

export const GenericStoreServices = [
  AuthService,
  UserService,
  RoleService,
  SubroleService
]

export const GenericStoreEffects = [
  UserEffects,
  RoleEffects,
  AuthEffects,
  SubroleEffects
]


export const metaReducers: MetaReducer<GenericStoreState>[] = environment
  ? [storeFreeze]
  : [];
