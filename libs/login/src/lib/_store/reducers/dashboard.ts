import { HomeDashboardItems, initHomeDashBoardItems } from '../models';
import { DashboardActions } from '../actions';

type Action = DashboardActions.Actions;

export function DashboardReducer
    (state: HomeDashboardItems[] = initHomeDashBoardItems, action: Action) {
    switch (action.type) {
        case DashboardActions.INIT_DASHBOARD:
            return initHomeDashBoardItems;
        case DashboardActions.LOAD_DASHBOARD:
            return state;
        case DashboardActions.LOAD_DASHBOARD_SUCCESS:
            return state;
        // tslint:disable-next-line:no-switch-case-fall-through
        default:
            return state;
    }
}
