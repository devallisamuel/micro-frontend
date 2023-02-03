import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '..';
import { getMenus } from '../layout';


const getState = createFeatureSelector<GeneralState>('General');
export const getNotificationState = createSelector(
  getState,
  (state: GeneralState) => state.notification
);

// export const loading = createSelector(getNotificationState, getLoadingStatus);
// export const loaded = createSelector(getNotificationState, getLoadedStatus);
// export const saving = createSelector(getNotificationState, getSavingStatus);
// export const saved = createSelector(getNotificationState, getSavedStatus);
export const appNotLoading = createSelector(getNotificationState, (state) => {
  return state.loadingCount > 0 ? false : true;
});
// export const unauthorised = createSelector(getNotificationState, getUnauthorised);
// export const message = createSelector(getNotificationState, getMessage);
export const dispacthedActions = createSelector(
  getState,
  (state: GeneralState) => state.notification.actions
);
// export const appLoading = createSelector(getNotificationState, (state) => {
//   return (state.loadingCount > 0) ? true : false;
// });
export const loadingActions = createSelector(
  getState,
  (state: GeneralState) => state.notification.loadingActions
);
// export const info = createSelector(getNotificationState, (state) => state.info);

// Layout
export const getLayoutState = createSelector(
  getState,
  (state: GeneralState) => state.layout
);
// export const Tiles = createSelector(getLayoutState, getTiles);
// export const Sections = createSelector(getLayoutState, getSections);
export const Menus = createSelector(getLayoutState, getMenus);
// export const AGrid = createSelector(getLayoutState, getAgtheme);
// export const colour = createSelector(getLayoutState, getColour);
// export const theme = createSelector(getLayoutState, getTheme);
// export const textColour = createSelector(getLayoutState, getTextColour);
// export const pixel = createSelector(getLayoutState, getPixel);
// export const cardcontent = createSelector(getLayoutState, getCcontent);
// export const btnClass = createSelector(getLayoutState, getBtn);
// export const btnFloatingClass = createSelector(getLayoutState, getBtnFloating);
// export const iconColor = createSelector(getLayoutState, getIconColor);
// export const btnSmallClass = createSelector(getLayoutState, getSmallBtn);
// export const Cpanelclass = createSelector(getLayoutState, getCpane);
// export const tabClass = createSelector(getLayoutState, getTab);
// export const cheaderClass = createSelector(getLayoutState, getCheader);
// export const styleClass = createSelector(getLayoutState, getStyle);
// export const detailCard = createSelector(getLayoutState, getDetailcard);
// export const backgroundColour = createSelector(getLayoutState, getBackgroundColour);
// export const navColour = createSelector(getLayoutState, getNavColour);
// export const agClass = createSelector(theme, AGrid, (t, a) => {
//   return a + '-' + t;
// });
// export const btnColourClass = createSelector(colour, btnClass, (c, b) => {
//   return c + ' ' + b;
// });
// export const Cardpanelclass = createSelector(Cpanelclass, colour, (b, c) => {
//   return b + ' ' + c;
// });

// export const btnSmallColourClass = createSelector(colour, btnSmallClass, (c, b) => {
//   return c + ' ' + b;
// });

// export const btnSmallligthen3ColourClass = createSelector(colour, btnSmallClass, (c, b) => {
//   return c + ' lighten 3 ' + b;
// });

// export const detailcardClass = createSelector(colour, detailCard, (c, b) => {
//   return b + ' ' + c;
// });
// export const tabcolourClass = createSelector(colour, tabClass, (c, b) => {
//   return b + ' ' + c;
// });
// export const cardheaderClass = createSelector(colour, cheaderClass, (c, b) => {
//   return b + ' ' + c;
// });
// export const iconColorColourClass = createSelector(colour, iconColor, textColour, (c, b, d) => {
//   return c + '-' + d + ' ' + b;
// });
// export const textColorColourClass = createSelector(colour, textColour, (c, d) => {
//   return c + '-' + d;
// });
// export const Ccontentclass = createSelector(colour, cardcontent, (c, d) => {
//   return d + ' ' + c;
// });
// export const borderColourClass = createSelector(colour, styleClass, (c, b) => {
//   const ret: Object = { 'border-color': c };
//   return ret;
//   // '{\'' + 'border-color'  + '\'' + ':' + '\'' + c  + '\'}';
// });
// export const borderDetailClass = createSelector(colour, styleClass, pixel, (c, b, d) => {
//   const ret: Object = { 'border-top': c + ' ' + d };
//   return ret;
//   // '{\'' + 'border-color'  +  '\'' + ':' + '\'' + c  + '\'}';
// });

// export const btnFloatingColourClass = createSelector(colour, btnFloatingClass, (c, b) => {
//   return c + ' ' + b;
// });

// export const navColourClass = createSelector(colour, navColour, (c, n) => {
//   return c + ' ' + n;
// });

// export const editBackgroundClass = createSelector(colour, (c) => {
//   return c + '  lighten-5  card oryx-card-radius ';
// });

export const nurse = createSelector(Menus, (menus) => {
  return menus.filter((m) => m.roles.filter((e) => e.name === 'administrator'));
});
