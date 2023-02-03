import { Action } from '@ngrx/store';
import { HomeDashboardItems } from '../models';

export const INIT_DASHBOARD = '[Dashboard] Initialisation';
export const LOAD_DASHBOARD = '[Dashboard] Load Dashboards';
export const LOAD_DASHBOARD_SUCCESS = '[Dashboard] Load Dashboards Success';


export class LoadDashboard implements Action {
  readonly type = LOAD_DASHBOARD;
  constructor() { }
}

export class LoadDashboardSuccess implements Action {
  readonly type = LOAD_DASHBOARD_SUCCESS;
  constructor(public payload: HomeDashboardItems[]) { }
}

export class InitDashboard implements Action {
  readonly type = INIT_DASHBOARD;
  constructor() { }
}


export type Actions
  = LoadDashboard
  | LoadDashboardSuccess
  | InitDashboard;
