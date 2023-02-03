import * as NotificationActions from './notification.action';
import * as _ from 'lodash';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initStoreStatus, StoreStatus } from '../../utilities';
import { GenericStoreState } from '..';


export function notificationReducer(
  state: StoreStatus = initStoreStatus,
  action: NotificationActions.Actions
) {
  switch (action.type) {
    case NotificationActions.SET_LOADING:
      if (state.loading) {
        return _.assign({}, state, {
          message: action.payload,
          loaded: false,
          loadingCount: state.loadingCount + 1,
          loadingActions: [...state.loadingActions, action.payload],
        });
      }
      return _.assign({}, state, {
        loading: true,
        message: action.payload,
        loaded: false,
        loadingCount: 1,
        loadingActions: [...state.loadingActions, action.payload],
      });

    case NotificationActions.SET_LOADED:
      if (state.loadingCount > 1) {
        return _.assign({}, initStoreStatus, {
          message: action.payload,
          loadingCount: state.loadingCount - 1,
          actions: [...state.actions, action.payload],
        });
      }
      return _.assign({}, initStoreStatus, {
        loaded: true,
        message: action.payload,
        loading: false,
        loadingCount: 0,
        actions: [...state.actions, action.payload],
        loadingActions: [],
      });
    case NotificationActions.SET_LOADING_ERROR:
      return _.assign({}, initStoreStatus, {
        loadingError: true,
        message: action.payload,
      });
    case NotificationActions.SET_SAVING:
      return _.assign({}, initStoreStatus, {
        saving: true,
        message: action.payload,
        saved: false,
      });
    case NotificationActions.SET_SAVED:
      return _.assign({}, initStoreStatus, {
        saved: true,
        message: action.payload,
        saving: false,
      });
    case NotificationActions.SET_SAVING_ERROR:
      return _.assign({}, initStoreStatus, {
        savingError: true,
        message: action.payload,
      });
    case NotificationActions.SET_DELETED:
      return _.assign({}, initStoreStatus, {
        deleted: true,
        message: action.payload,
      });
    case NotificationActions.SET_UNAUTHORISED:
      return _.assign({}, initStoreStatus, {
        unauthorised: true,
        message: action.payload,
      });
    case NotificationActions.SET_INFO:
      return _.assign({}, initStoreStatus, {
        info: action.payload,
      });
    case NotificationActions.CLEAR_ALL:
      return initStoreStatus;
    default:
      return state;
  }
}

export const getLoadingStatus = (state: StoreStatus) => state.loading;
export const getLoadedStatus = (state: StoreStatus) => state.loaded;
export const getLoadingErrorStatus = (state: StoreStatus) => state.loadingError;

export const getSavingStatus = (state: StoreStatus) => state.saving;
export const getSavedStatus = (state: StoreStatus) => state.saved;
export const getSavingErrorStatus = (state: StoreStatus) => state.savingError;
export const getDeleted = (state: StoreStatus) => state.deleted;
export const getUnauthorised = (state: StoreStatus) => state.unauthorised;

export const getMessage = (state: StoreStatus) => state.message;


const getState = createFeatureSelector<GenericStoreState>('InfusyncStoreState');
export const getNotificationState = createSelector(
  getState,
  (state: GenericStoreState) => state.notification
);

