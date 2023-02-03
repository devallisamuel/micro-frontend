import * as _ from 'lodash';
import * as AllActions from './layout.action';
import * as fromLayout from './layout.interface';
import { initLayout } from './layout.model';

export interface LayoutState {
  layout: fromLayout.Layout;
  selectedColour: string;
  selectedTheme: string;
  tiles: fromLayout.Tile[];
  sections: fromLayout.Section[];
  menus: fromLayout.Menu[];
}
export const initialLState: LayoutState = {
  layout: initLayout,
  selectedColour: 'green',
  selectedTheme: 'material',
  tiles: [],
  sections: [],
  menus: [],
};

export function LayoutReducer(
  state: LayoutState = initialLState,
  action: AllActions.Actions
) {
  switch (action.type) {
    case AllActions.CHANGE_COLOUR:
      return _.assign({}, state, {
        selectedColour: action.payload,
      });
    case AllActions.LOAD_MENU_SUCCESS:
      return _.assign({}, state, {
        menus: action.payload.menus,
      });
    default:
      return state;
  }
}
export const getColour = (state: LayoutState) => state.selectedColour;
export const getTheme = (state: LayoutState) => state.selectedTheme;
export const getPixel = (state: LayoutState) => state.layout.pixel;
export const getCcontent = (state: LayoutState) => state.layout.cardContent;
export const getTextColour = (state: LayoutState) => state.layout.textColour;
export const getBtn = (state: LayoutState) => state.layout.button;
export const getSmallBtn = (state: LayoutState) => state.layout.buttonSmall;
export const getTab = (state: LayoutState) => state.layout.tab;
export const getBackgroundColour = (state: LayoutState) =>
  state.layout.backgroundColour;
export const getIconColor = (state: LayoutState) => state.layout.iconColor;
export const getStyle = (state: LayoutState) => state.layout.style;
export const getNavColour = (state: LayoutState) => state.layout.navColour;
export const getCheader = (state: LayoutState) => state.layout.cardheader;
export const getBtnFloating = (state: LayoutState) => state.layout.btnFloating;
export const getDetailcard = (state: LayoutState) => state.layout.detailcard;
export const getTiles = (state: LayoutState) => state.tiles;
export const getSections = (state: LayoutState) => state.sections;
export const getMenus = (state: LayoutState) => state.menus;
export const getAgtheme = (state: LayoutState) => state.layout.AGtheme;
export const getCpane = (state: LayoutState) => state.layout.cpanel;
