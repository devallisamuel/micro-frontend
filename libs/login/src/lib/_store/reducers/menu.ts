/*import { Menu, initMenu } from '../models';
import { MenuActions } from '../actions';
import * as _ from 'lodash';

type Action = MenuActions.Actions;

export interface MenuState {
    Menus: Menu[],
    SelectedModule: string;
    SelectedApplication: string;


}


export const initMenuState = {
    Menus: initMenu,
    SelectedModule: '',
    SelectedApplication: ''
}

export function MenuReducer(state: MenuState = initMenuState, action: Action) {
    switch (action.type) {
        case MenuActions.SELECT_MODULE:
            return _.assign({}, state, { SelectedModule: action.payload});
        case MenuActions.LOAD_MENU:
            return _.assign({},
                state,
                { Menus: [...state.Menus, ...action.payload  ]});

                 case  MenuActions.LOAD_APPLICATION:
            return _.assign({}, state, {SelectedApplication: action.payload});
        case MenuActions.LOAD_MENU:
            return _.assign({},
                state,
                { Menus: [...state.Menus, ...action.payload ]});
        // tslint:disable-next-line:no-switch-case-fall-through
        default:
            return state;

        };

    };


export const getMenus = (state: MenuState) => state.Menus;
export const getSelectedModule = (state: MenuState) => state.SelectedModule;
export const getSelectedApplication = (state: MenuState) => state.SelectedApplication;
*/
