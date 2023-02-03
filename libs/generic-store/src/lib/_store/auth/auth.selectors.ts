import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TerminalMgrState } from '..';

export const getState = createFeatureSelector<TerminalMgrState>('CHM');

export const getAuthState = createSelector(
  getState,
  (state: TerminalMgrState) => state.auth
);

export const selectIsAuthenticated = createSelector(
  getAuthState,
  (state) => state.isLoggedIn
);

export const selectuserInfo = createSelector(
  getAuthState,
  (state) => state.profile
);
