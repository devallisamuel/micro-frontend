import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '/core';

export * from './login';
export * from './token';
import { LoginReducer } from './login';
import { TokenReducer } from './token';
import {
    User, Token,
    initToken, initUser
} from '../models';

export interface LoginState {
    user: User;
    token: Token;
}

export interface State extends fromRoot.State {
    login: LoginState;
}

export const reducers = {
    user: LoginReducer,
    token: TokenReducer,
};

export const initLoginState: LoginState = {
    user: initUser,
    token: initToken,
};

export const getLoginState = createFeatureSelector<LoginState>('login');
export const getToken = createSelector(getLoginState, (state: LoginState) => state.token);
export const getAuthenticated =
    createSelector(getLoginState, (state: LoginState) => state.token.authenticated);
export const getUser = createSelector(getLoginState, (state: LoginState) => state.user);
export const getName = createSelector(getLoginState, (state: LoginState) => state.user.given_name);
export const getEmail = createSelector(getLoginState, (state: LoginState) => state.user.email);
export const getDept = createSelector(getLoginState, (state: LoginState) => state.user.dept);
export const getLevel = createSelector(getLoginState, (state: LoginState) => state.user.showLevel);
export const getDisplay = createSelector(getLoginState, (state: LoginState) => state.user.display);
export const getUserName = createSelector(getLoginState, (state: LoginState) => state.user.sub);
export const getUserId = createSelector(getLoginState, (state: LoginState) => state.user.id);
export const getSub = createSelector(getLoginState, (state: LoginState) => state.user.sub);
export const getCompanyId = createSelector(getLoginState,
    (state: LoginState) => state.user.companyId);
export const getTenantId = createSelector(getLoginState,
        (state: LoginState) => state.user.tenantId);
export const getEnrolleeId = createSelector(getLoginState,
        (state: LoginState) => state.user.enrolleeId);
export const getEnrolleeGroupId = createSelector(getLoginState,
    (state: LoginState) => state.user.enrolleeGroupId);
export const getUserRole = createSelector(getLoginState, (state: LoginState) => state.user.role);
export const isUserAdmin = createSelector(getLoginState, (state: LoginState) => state.user.admin);
export const getUserPermissions =
    createSelector(getLoginState, (state: LoginState) => state.user.permissions);
export const tokenDate = createSelector(getLoginState, (state: LoginState) => state.user.tokenDate);
